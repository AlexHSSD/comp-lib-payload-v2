import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const ProductBlock: Block = {
  slug: 'productBlock',
  labels: {
    singular: 'ProductBlock',
    plural: 'ProductBlock',
    },
  fields: [
    blockFields({
      name: 'productBlockFields',
      fields: [
        {
            name: 'products',
            type: 'array',
            label: 'Products',
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
                {
                  name: 'features',
                  type: 'array',
                  label: 'Features',
                  maxRows: 6,
                  fields: [
                      {
                        name: 'feature',
                        label: 'Feature',
                        type: 'textarea',
                    },
                  ]
                },
                {
                    name: 'background',
                    type: 'select',
                    defaultValue: 'none',
                    options: [
                      {
                        value: 'none',
                        label: 'none'
                      },
                      {
                        value: 'green',
                        label: 'green',
                      },
                    ],
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
