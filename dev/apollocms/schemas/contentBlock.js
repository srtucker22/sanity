import React from 'react'
import BlockContent from '@sanity/block-content-to-react'
import {Break} from './break'
import {Button} from 'native-base'

const serializers = {
  types: {
    break: Break,
    button: ({node}) => {
      return <Button variant={node.variant}>{node.title}</Button>
    },
    // reference: Reference, // TODO:
  },
}

export const ContentBlock = (props) => {
  // TODO: need to get refs via client ~ essentially you need one doc preview to rule them all
  return (
    <BlockContent blocks={props.value?.content?.filter((val) => !!val)} serializers={serializers} />
  )
}

export default {
  name: 'contentBlock',
  type: 'object',
  title: 'Content Block',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'description',
      type: 'string',
    },
    {
      name: 'content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image'},
        {type: 'break'},
        {type: 'button'},
        {type: 'contentBlock'},
        {type: 'reference', to: [{type: 'ContentDoc'}]},
      ],
    },
  ],
  preview: {
    component: ContentBlock,
    select: {
      title: 'title',
      description: 'description',
      content: 'content',
    },
    prepare(value) {
      return value // required to get all the elements in content!
    },
  },
}
