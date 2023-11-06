import type { AfterReadHook } from 'payload/dist/globals/config/types'

import type { Page, Test } from '../payload-types'

export const populateArchiveBlock: AfterReadHook = async ({ doc, req: { payload } }) => {
  // pre-populate the archive block if `populateBy` is `collection`

  const layoutWithArchive = await Promise.all(
    doc.layout.map(async block => {
      if (block.blockType === 'archiveBlock') {
        const archiveBlock = block as Extract<Page['layout'][0], { blockType: 'archiveBlock' }> & {
          populatedDocs: Array<{
            relationTo: 'tests' | 'pages'
            value: string
          }>
        }

        if (archiveBlock.archiveBlockFields.populateBy === 'collection') {
          const res: { totalDocs: number; docs: Test[] } = await payload.find({
            collection: archiveBlock?.archiveBlockFields?.relationTo || 'tests',
            limit: archiveBlock?.archiveBlockFields?.limit || 10,
            sort: '-publishedOn',
          })

          return {
            ...block,
            archiveBlockFields: {
              ...block.archiveBlockFields,
              populatedDocsTotal: res.totalDocs,
              populatedDocs: res.docs.map((thisDoc: Test) => ({
                relationTo: archiveBlock.archiveBlockFields?.relationTo,
                value: thisDoc.id,
              })),
            }
          }
        }
      }
      return block
    }),
  )

  return {
    ...doc,
    layout: layoutWithArchive,
  }
}