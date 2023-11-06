import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const CardCarouselBlock: Block = {
  slug: 'cardCarouselBlock',
  labels: {
    singular: 'Card Carousel',
    plural: 'Card Carousels',
    },
  fields: [
    blockFields({
      name: 'cardCarouselBlockFields',
      fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
        },
        richText(),
        {
            name: 'cards',
            type: 'array',
            label: 'Cards',
            minRows: 1,
            maxRows: 9,
            fields: [
              {
                name: 'color',
                type: 'select',
                defaultValue: 'red',
                label: 'Color',
                options: [
                  {
                    value: 'red',
                    label: 'red',
                  },
                  {
                    value: 'green',
                    label: 'green',
                  },
                ],
              },
              {
                  name: 'title',
                  label: 'Title',
                  type: 'text',
              },
              richText(),
              {
                  name: 'media',
                  type: 'upload',
                  required: true,
                  relationTo: 'media',
              },
              linkGroup({
                overrides: {
                  maxRows: 2,
                }
              })
            ],
          },
      ],
    }),
  ],
}
