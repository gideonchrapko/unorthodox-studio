import S from '@sanity/desk-tool/structure-builder'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export default () =>
S.list()
.title('Base')
.items([
  // S.listItem(),
  orderableDocumentListDeskItem({
    type: 'uxProject',
    title: 'uxProjects',
    id: 'orderable-en-uxProject',
  }),
  orderableDocumentListDeskItem({
    type: 'visualProject',
    title: 'visualProjects',
    id: 'orderable-en-visualProject',
  }),
  // orderableDocumentListDeskItem({type: 'soundProject'}),
  // orderableDocumentListDeskItem({type: 'fashionProject'}),
])