import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'

export const AccreditationBlock: Block = {
  slug: 'accreditationBlock',
  labels: {
    singular: 'AccreditationBlock',
    plural: 'AccreditationBlock',
    },
  fields: [
    blockFields({
      name: 'accreditationBlockFields',
      fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
        },
        {
            name: 'accreditations',
            type: 'array',
            label: 'Accreditations',
            minRows: 4,
            maxRows: 16,
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
            ],
          },
      ],
    }),
  ],
}
