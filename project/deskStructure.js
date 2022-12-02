import S from '@sanity/desk-tool/structure-builder'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export default () =>
S.list()
.title('Base')
.items([
  // S.listItem(),
  orderableDocumentListDeskItem({type: 'uxProject'}),
  // orderableDocumentListDeskItem({type: 'visualProject'}),
  // orderableDocumentListDeskItem({type: 'soundProject'}),
  // orderableDocumentListDeskItem({type: 'fashionProject'}),
])