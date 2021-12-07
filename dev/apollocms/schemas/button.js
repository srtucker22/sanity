import React from 'react'
import {Button as NativeBaseButton} from 'native-base'

export const Button = ({value}) => {
  return <NativeBaseButton variant={value.variant}>{value.title}</NativeBaseButton>
}

export default {
  name: 'button',
  type: 'object',
  title: 'button',
  fieldsets: [
    {
      name: 'options',
      title: 'Options',
      options: {
        collapsible: true, // Makes the whole fieldset collapsible
        collapsed: true, // Defines if the fieldset should be collapsed by default or not
      },
    },
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'link',
      type: 'url',
      fieldset: 'options',
    },
    {
      name: 'variant',
      type: 'string',
      options: {
        list: ['outline', 'ghost', 'solid', 'link', 'unstyled'],
      },
      fieldset: 'options',
    },
    {
      title: 'Field Title',
      name: 'fieldTitle',
      description: 'The title for the template field for configuring this button.',
      type: 'string',
      fieldset: 'options',
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
