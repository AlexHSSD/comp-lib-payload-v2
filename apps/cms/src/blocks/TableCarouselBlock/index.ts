import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const TableCarouselBlock: Block = {
  slug: 'tableCarouselBlock',
  labels: {
    singular: 'TableCarouselBlock',
    plural: 'TableCarouselBlock',
    },
  fields: [
    blockFields({
      name: 'tableCarouselBlockFields',
      fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
        },
        richText(),
        {
          name: 'testBenefits',
          type: 'relationship',
          relationTo: 'tests',
          hasMany: true,
          required: true,
        },
      ],
    }),
  ],
}
