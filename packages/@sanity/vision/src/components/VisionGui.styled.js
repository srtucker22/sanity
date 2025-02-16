import styled, {css, createGlobalStyle} from 'styled-components'
import {Button, Card, Box, Flex, Label, rem} from '@sanity/ui'

export const Root = styled(Card)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .Resizer {
    background: var(--card-border-color);
    opacity: 1;
    z-index: 1;
    box-sizing: border-box;
    background-clip: padding-box;
    border: solid transparent;
  }

  .Resizer:hover {
    border-color: var(--card-shadow-ambient-color);
  }

  .Resizer.horizontal {
    height: 11px;
    margin: -5px 0;
    border-width: 5px 0;
    cursor: row-resize;
    width: 100%;
    z-index: 4;
  }

  .Resizer.vertical {
    width: 11px;
    margin: 0 -5px;
    border-width: 0 5px;
    cursor: col-resize;
  }

  .Resizer.disabled {
    cursor: not-allowed;
  }

  .Resizer.disabled:hover {
    border-color: transparent;
  }

  .CodeMirror {
    font-family: ${({theme}) => theme.sanity.fonts.code.family};
    font-size: ${({theme}) => rem(theme.sanity.fonts.code.sizes[1].fontSize)};
    line-height: inherit;
  }

  .CodeMirror-gutters {
    border-right: 0;
    background-color: var(--card-code-bg-color);
  }

  .CodeMirror-linenumber {
    color: var(--card-code-fg-color);
  }

  .CodeMirror-line,
  pre.CodeMirror-line {
    padding-left: ${({theme}) => rem(theme.sanity.space[3])};
  }
`

export const GlobalCodeMirrorStyle = createGlobalStyle`
  // This is for the autocomplete menu when you do ctrl-space in in the Query editor
  .CodeMirror-hints.CodeMirror-vision {
    z-index: 20;
    font-family: ${({theme}) => theme.sanity.fonts.code.family};
    font-size: ${({theme}) => rem(theme.sanity.fonts.code.sizes[1].fontSize)};
    padding: ${({theme}) => rem(theme.sanity.space[2])};
  }

  .CodeMirror-hint {
    padding: ${({theme}) => `${rem(theme.sanity.space[1])} ${rem(theme.sanity.space[1])}`};
  }

  .CodeMirror-hint-active {
    background-color: var(--card-bg-color);
  }
`

Root.displayName = 'Root'

export const Header = styled(Card)`
  border-bottom: 1px solid var(--card-border-color);
`

export const SplitpaneContainer = styled(Box)`
  position: relative;
`

export const QueryCopyLink = styled.a`
  cursor: pointer;
  margin-right: auto;
`

export const InputBackgroundContainer = styled(Box)`
  position: absolute;
  top: 1rem;
  left: 0;
  padding: 0;
  margin: 0;
  z-index: 10;
  right: 0;

  ${Label} {
    user-select: none;
  }
`

export const InputBackgroundContainerLeft = styled(InputBackgroundContainer)`
  // This is so its aligned with the gutters of CodeMirror
  left: 33px;
`

export const InputContainer = styled(Card)`
  width: 100%;
  height: 100%;
  position: relative;
  flex-direction: column;
`

export const ResultOuterContainer = styled(Flex)`
  height: 100%;
`

export const ResultInnerContainer = styled(Box)`
  position: relative;
`

export const ResultContainer = styled(Card)`
  height: 100%;
  width: 100%;
  position: absolute;
  max-width: 100%;
  background-color: #fff;

  ${({$isInvalid}) =>
    $isInvalid &&
    css`
      &:after {
        background-color: var(--card-bg-color);
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100%;
      }
    `}
`

export const Result = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 20;
`

export const TimingsFooter = styled(Box)`
  border-top: 1px solid var(--card-border-color);
`

export const TimingsCard = styled(Card)`
  position: relative;
`

export const TimingsContainer = styled(Box)`
  width: 100%;
  height: 100%;
`

export const TimingsTextContainer = styled(Flex)`
  height: 100%;
  min-height: ${({theme}) =>
    rem(
      theme.sanity.space[3] * 2 +
        theme.sanity.fonts.text.sizes[2].lineHeight -
        theme.sanity.fonts.text.sizes[2].ascenderHeight -
        theme.sanity.fonts.text.sizes[2].descenderHeight
    )};
`

export const ControlsContainer = styled(Box)`
  border-top: 1px solid var(--card-border-color);
`

export const ButtonFullWidth = styled(Button)`
  width: 100%;
`
