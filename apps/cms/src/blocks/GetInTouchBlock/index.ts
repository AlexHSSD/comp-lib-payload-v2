import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const GetInTouchBlock: Block = {
  slug: 'getInTouchBlock',
  labels: {
    singular: 'GetInTouchBlock',
    plural: 'GetInTouchBlock',
    },
  fields: [
    blockFields({
      name: 'getInTouchBlockFields',
      fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
        },
        richText(),
        linkGroup({
          overrides: {
            maxRows: 1,
          }
        })
      ],
    }),
  ],
}
