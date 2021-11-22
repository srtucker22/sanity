import {BaseEditor} from 'slate'
import {ReactEditor} from '@sanity/slate-react'
import {PortableTextBlock, PortableTextSlateEditor, TextBlock as PTTextBlock, TextSpan} from '..'

interface Element extends PTTextBlock {
  _type: string
  _key: string
  __inline: boolean
  value: PortableTextBlock
}

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & PortableTextSlateEditor
    Element: Element
    Text: TextSpan
  }
}
