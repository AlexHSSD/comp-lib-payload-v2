import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'
import { QuoteBlock } from './blocks/QuoteBlock';
import { StandardBlock } from './blocks/StandardBlock';
import { MediaBlock } from './blocks/MediaBlock';

export const ContentBlock: Block = {
  slug: 'contentBlock',
  labels: {
    singular: 'ContentBlock',
    plural: 'ContentBlock',
    },
  fields: [
    blockFields({
      name: 'contentBlockFields',
      fields: [
        {
          name: 'leftLayout',
          type: 'blocks',
          required: true,
          label: 'Left Blocks',
          maxRows: 1,
          blocks: [
            QuoteBlock,
            StandardBlock,
            MediaBlock,
          ],
        },
        {
          name: 'rightLayout',
          type: 'blocks',
          required: true,
          label: 'Right Blocks',
          maxRows: 1,
          blocks: [
            QuoteBlock,
            StandardBlock,
            MediaBlock,
          ],
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
              value: 'grey',
              label: 'grey',
            },
            {
              value: 'green',
              label: 'green',
            },
          ],
        },
        {
          name: 'enableIcon',
          type: 'checkbox'
        },
        {
          name: 'icon',
          type: 'upload',
          required: false,
          relationTo: 'media',
          admin: {
            condition: (_, { enableIcon }) => Boolean(enableIcon),
          },
        },
        {
          name: 'divider',
          type: 'select',
          defaultValue: 'no',
          options: [
            {
              value: 'no',
              label: 'No',
            },
            {
              value: 'yes',
              label: 'Yes',
            },
          ],
        },
      ],
    }),
  ],
}
