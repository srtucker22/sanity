import keyBy from 'lodash/keyBy'
import React, {useEffect, useMemo, useState} from 'react'
import BlockContent from '@sanity/block-content-to-react'
import {Break} from './schemas/break';
import {Box, Button, HamburgerIcon, Menu, Pressable} from 'native-base'
import client from 'part:@sanity/base/client'

const Reference = ({node}) => {
  const {document} = node
  if (document) {
    return <DocumentPreview key={document._id} document={{displayed: document}} />
  }
  return null
}

const serializers = {
  types: {
    break: Break,
    button: ({node}) => {
      return <Button variant={node.variant}>{node.title}</Button>
    },
    reference: Reference,
  },
}

export const JsonPreview = ({document}) => (
  <>
    <h1>JSON Data for "{document.displayed.title}"</h1>
    <pre>{JSON.stringify(document.displayed, null, 2)}</pre>
  </>
)

export const DocumentPreview = ({document}) => {
  const [refsData, setRefsData] = useState()
  useEffect(() => {
    async function fetchRefs(refs) {
      const data = await client.fetch(`*[_id in $ids]`, {
        ids: refs?.map((ref) => ref._ref),
      })
      setRefsData(keyBy(data, '_id'))
    }

    const refs = document?.displayed?.content?.filter((block) => block._type === 'reference')
    if (refs?.length) {
      fetchRefs(refs)
    }
  }, [document])

  const blocks = useMemo(
    () =>
      document.displayed.content?.map((block) =>
        block._type === 'reference' ? {...block, document: refsData?.[block._ref]} : block
      ),
    [document, refsData]
  )
  if (document.displayed._type === 'ContentDoc') {
    return <BlockContent blocks={blocks} serializers={serializers} />
  }

  return JsonPreview({document})
}

export const DocumentPreviewWithViewport = ({document}) => {
  return (
    <div>
      <Box flexDirection="row">
        <Menu
          w="190"
          trigger={(triggerProps) => {
            return (
              <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                <HamburgerIcon />
              </Pressable>
            )
          }}
          style={{zIndex: 1}}
        >
          <Menu.Item>Arial</Menu.Item>
          <Menu.Item>Nunito Sans</Menu.Item>
          <Menu.Item>Roboto</Menu.Item>
          <Menu.Item>Poppins</Menu.Item>
        </Menu>
      </Box>
      <DocumentPreview document={document} />
    </div>
  )
}
