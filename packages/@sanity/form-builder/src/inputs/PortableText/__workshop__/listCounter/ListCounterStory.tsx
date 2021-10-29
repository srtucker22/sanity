import {Box, Container, Flex, Stack, Text} from '@sanity/ui'
import React from 'react'
import styled, {css} from 'styled-components'

interface BlockType {
  level: number
  listItem?: 'bullet' | 'number'
}

const items: BlockType[] = [
  {level: 0},
  {level: 0, listItem: 'number'},
  {level: 0, listItem: 'number'},
  {level: 0, listItem: 'bullet'},
  {level: 0, listItem: 'bullet'},
  {level: 0, listItem: 'number'},
  {level: 1, listItem: 'number'},
  {level: 0, listItem: 'number'},
  {level: 1, listItem: 'number'},
  {level: 0},
  {level: 0},
  {level: 0, listItem: 'bullet'},
  {level: 1, listItem: 'number'},
  {level: 1, listItem: 'number'},
  {level: 0, listItem: 'bullet'},
  {level: 0, listItem: 'number'},
  {level: 1, listItem: 'number'},
  {level: 2, listItem: 'number'},
  {level: 3, listItem: 'number'},
  {level: 4, listItem: 'number'},
  {level: 5, listItem: 'number'},
  {level: 4, listItem: 'number'},
  {level: 3, listItem: 'number'},
  {level: 2, listItem: 'number'},
  {level: 1, listItem: 'number'},
  {level: 0, listItem: 'number'},
  {level: 0, listItem: 'bullet'},
]

const levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const BULLET_MARKERS = ['●', '○', '■']
const NUMBER_FORMATS = ['number', 'lower-alpha', 'lower-roman']

const EditableWrapper = styled(Stack)`
  counter-reset: ${levels.map((l) => `list-level-${l}`).join(' ')};

  ${levels.map((l) => {
    return css`
      & > [data-level='${l}'][data-list-item='number'] {
        counter-increment: list-level-${l};
      }
    `
  })}

  & > [data-list-item='number'] + *:not([data-list-item='number']) {
    counter-reset: ${levels.map((l) => `list-level-${l}`).join(' ')};
  }

  ${levels.slice(1).map((l) => {
    return css`
      & > [data-level='${l}'] + [data-level='${l - 1}'] {
        counter-reset: list-level-${l};
      }
    `
  })}

  & > [data-list-item='bullet'] {
    counter-reset: ${levels.map((l) => `list-level-${l}`).join(' ')};
  }
`

export function ListCounterStory() {
  return (
    <Flex padding={4} paddingLeft={6}>
      <Container width={1}>
        <EditableWrapper space={3}>
          {items.map((item, itemIndex) => (
            <Block index={itemIndex} key={itemIndex} value={item} />
          ))}
        </EditableWrapper>
      </Container>
    </Flex>
  )
}

const BlockRoot = styled.div<{$level: number}>((props) => {
  const {$level} = props

  return css`
    padding-left: ${$level * 32}px;

    &[data-list-item] {
      padding-left: ${32 + $level * 32}px;
    }

    &[data-list-item] > div > [data-prefix]:before {
      position: absolute;
      margin-left: -1.5rem;
      width: 1rem;
      text-align: right;
      box-sizing: border-box;
    }

    &[data-list-item='number'] > div > [data-prefix]:before {
      content: ${`counter(list-level-${$level})`} '.';
      content: ${`counter(list-level-${$level}, ${NUMBER_FORMATS[$level % NUMBER_FORMATS.length]})`}
        '.';
    }

    &[data-list-item='bullet'] > div > [data-prefix]:before {
      content: '${BULLET_MARKERS[$level % BULLET_MARKERS.length]}';
      font-size: 0.5em;
      line-height: 21px;
      padding-right: 3px;
    }
  `
})

function Block(props: {index: number; value: BlockType}) {
  const {index, value} = props

  return (
    <BlockRoot
      $level={value.level || 0}
      data-level={value.level || 0}
      data-list-item={value.listItem}
    >
      <Flex>
        <Text data-prefix="" />
        <Box flex={1}>
          <Text data-text="">
            Block <code>#{index}</code>
            {value.level !== undefined && (
              <>
                , Level <code>#{value.level}</code>
              </>
            )}
          </Text>
        </Box>
      </Flex>
    </BlockRoot>
  )
}
