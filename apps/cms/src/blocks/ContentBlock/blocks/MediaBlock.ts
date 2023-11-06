import type { Block } from 'payload/types'
import { blockFields } from '../../../fields/blockFields'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: 'Media Block',
    plural: 'Media Blocks',
    },
  fields: [
    blockFields({
      name: 'mediaBlockFields',
      fields: [
        {
          name: 'media',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
        {
          name: 'shadow',
          type: 'select',
          defaultValue: 'select',
          label: 'Shadow',
          options: [
            {
              value: 'select',
              label: 'select'
            },
            {
              value: 'yes',
              label: 'yes'
            },
            {
              value: 'no',
              label: 'no',
            },
          ],
        },
        {
          name: 'shadowPosition',
          type: 'select',
          defaultValue: 'select',
          label: 'Shadow Position',
          options: [
            {
              value: 'select',
              label: 'select'
            },
            {
              value: 'left',
              label: 'left'
            },
            {
              value: 'right',
              label: 'right',
            },
          ],
        },
      ],
    }),
  ],
}
