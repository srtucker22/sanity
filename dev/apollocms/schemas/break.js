import React from 'react'
import {Box, Text} from 'native-base'

export const Break = ({node}) => {
  return <Box style={{height: node?.height}} />
}

export const BreakPreview = (props) => {
  return (
    <Text height="100%" alignItems="center" justifyContent="center" display="flex">
      {`<br height="${props.value?.height || 0}"/>`}
    </Text>
  )
}

export default {
  name: 'break',
  type: 'object',
  title: 'break',
  fields: [
    {
      name: 'height',
      type: 'number',
    },
  ],
  preview: {
    component: BreakPreview,
    select: {
      height: 'height',
    },
  },
}
