import PropTypes from 'prop-types'
import React from 'react'
import {BlockEditor} from 'part:@sanity/form-builder'
import blockTools from '@sanity/block-tools'
import CustomMarkers from './CustomMarkers'
import BlockActions from './BlockActions'

function extractTextFromBlocks(blocks) {
  if (!blocks) {
    return ''
  }
  return blocks
    .filter((val) => val._type === 'block')
    .map((block) => {
      return block.children
        .filter((child) => child._type === 'span')
        .map((span) => span.text)
        .join('')
    })
    .join('')
}

const CustomEditor = (props) => {
  console.log({props})
  const {markers, value} = props
  return (
    <div>
      <BlockEditor
        {...props}
        renderBlockActions={BlockActions}
        renderCustomMarkers={CustomMarkers}
        markers={markers.concat([
          {type: 'customMarkerTest', path: value && value[0] ? [{_key: value[0]._key}] : []},
        ])}
      />
      <p>
        Text length: <strong>{extractTextFromBlocks(props.value).length}</strong> characters
      </p>
    </div>
  )
}

CustomEditor.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  level: PropTypes.number,
  value: PropTypes.arrayOf(PropTypes.any),
  markers: PropTypes.arrayOf(PropTypes.any),
  onChange: PropTypes.func.isRequired,
}

export default CustomEditor
