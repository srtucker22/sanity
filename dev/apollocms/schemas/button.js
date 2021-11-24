import React from 'react'
import {Button as NativeBaseButton} from 'native-base';

export const Button = ({value}) => {
  return <NativeBaseButton variant={value.variant}>{value.title}</NativeBaseButton>
}

export default {
  name: 'button',
  type: 'object',
  title: 'button',
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'link',
      type: 'url',
    },
    {
      name: 'variant',
      type: 'string',
      options: {
        list: ['outline', 'ghost', 'solid', 'link', 'unstyled'],
      },
    },
  ],
  preview: {
    component: Button,
    select: {
      title: 'title',
      link: 'link',
      variant: 'variant',
    },
  },
}
