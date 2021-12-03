import React from 'react'
import PropTypes from 'prop-types'
import {Button} from '@sanity/ui'
import {CodeIcon} from '@sanity/icons'
// import styles from './BlockActions.css'

export default class BlockActions extends React.Component {
  static propTypes = {
    block: PropTypes.shape({
      _key: PropTypes.string,
      _type: PropTypes.string,
    }).isRequired,
    insert: PropTypes.func.isRequired,
  }

  handleClick = () => {
    const {insert, block} = this.props
    insert({
      _type: 'block',
      style: 'normal',
      children: [
        {
          _type: 'span',
          text: 'Let us JSON that: ',
        },
        {
          _type: 'span',
          text: JSON.stringify(block),
        },
      ],
    })
  }

  render() {
    return (
      <Button
        icon={CodeIcon}
        fontSize={1}
        padding={2}
        onClick={this.handleClick}
        title="JSON stringify this block"
        mode="bleed"
      />
    )
  }
}

// TODO: tag a block as having a template wizard input
// TODO: split the blockeditor into a custom wizard
// TODO: convert a text block to a defined block of content ~ this would be a portable editor within a portable editor?!
