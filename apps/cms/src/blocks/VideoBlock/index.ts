import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  labels: {
    singular: 'VideoBlock',
    plural: 'VideoBlocks',
    },
  fields: [
    blockFields({
      name: 'videoBlockFields',
      fields: [
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
        {
            name: 'title',
            label: 'Title',
            type: 'text',
        },
        richText(),
        {
            name: 'embed',
            label: 'Embed Script',
            type: 'text'
        }
      ],
    }),
  ],
}
