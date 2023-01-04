import S from '@sanity/desk-tool/structure-builder'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export default () =>
S.list()
.title('Base')
.items([
  orderableDocumentListDeskItem({
    type: 'uxProject',
    title: 'UX Projects',
    id: 'orderable-en-uxProject',
  }),
  orderableDocumentListDeskItem({
    type: 'visualProject',
    title: 'Visual Projects',
    id: 'orderable-en-visualProject',
  }),
  orderableDocumentListDeskItem({
    type: 'soundProject',
    title: 'Sound Projects',
    id: 'orderable-en-soundProject',
  }),
  orderableDocumentListDeskItem({
    type: 'fashionProject',
    title: 'Fashion Projects',
    id: 'orderable-en-fashionProject',
  })
])
// .items(
//   S.documentTypeListItems()
// )