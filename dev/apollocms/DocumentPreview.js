import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import {Button} from 'native-base'

const serializers = {
  types: {
    button: ({node}) => {
      return <Button variant={node.variant}>{node.title}</Button>
    },
  },
}

export const JsonPreview = ({document}) => (
  <>
    <h1>JSON Data for "{document.displayed.title}"</h1>
    <pre>{JSON.stringify(document.displayed, null, 2)}</pre>
  </>
)

export const DocumentPreview = ({document}) => {
  if (document.displayed._type === 'ContentDoc') {
    return <BlockContent blocks={document.displayed.content} serializers={serializers} />
  }

  return JsonPreview({document})
}
