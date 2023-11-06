import type { Block } from 'payload/types'
import linkGroup from '../../fields/linkGroup'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'

export const SliderSplitBlock: Block = {
  slug: 'sliderSplitBlock',
  labels: {
    singular: 'Slider Split',
    plural: 'Slider Split',
    },
  fields: [
    blockFields({
      name: 'sliderSplitBlockFields',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
      },
      richText(),
      {
        name: 'slides',
        type: 'array',
        label: 'Slides',
        minRows: 1,
        maxRows: 9,
        fields: [
            {
            name: 'media',
            type: 'upload',
            required: true,
            relationTo: 'media',
            },
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
      },
      {
        name: 'enablePaginationButtons',
        type: 'checkbox',
        label: 'Enable Pagination buttons?',
        defaultValue: false
      }
      ],
    }),
  ],
}
