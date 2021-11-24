import S from '@sanity/desk-tool/structure-builder'
import {JsonPreview, DocumentPreview} from './DocumentPreview'

export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    S.view.component(JsonPreview).title('JSON'),
    S.view.component(DocumentPreview).title('Preview'),
  ])
}

export default () =>
  S.list()
    .title('Content')
    .items([S.documentTypeListItem('ContentDoc')])
