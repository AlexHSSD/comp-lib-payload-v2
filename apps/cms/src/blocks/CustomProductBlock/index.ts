import type { Block } from 'payload/types'
import linkGroup from '../../fields/linkGroup'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText';

export const CustomProductBlock: Block = {
  slug: 'customProductBlock',
  labels: {
    singular: 'CustomProductBlock',
    plural: 'CustomProductBlocks',
    },
  fields: [
    blockFields({
      name: 'customProductBlockFields',
      fields: [
        {
          name: 'title',
          type: 'text'
        },
        {
          name: 'elements',
          type: 'array',
          label: 'Elements',
          minRows: 3,
          maxRows: 6,
          fields: [
            {
              name: 'name',
              type: 'text',
            },
            richText(),
          ],
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: "Enable CTA button(s)"
        },
        linkGroup({
          overrides: {
            maxRows: 2,
            admin: {
              condition: (data, siblingData, { user }) => {
                if (siblingData.enableLink) {
                  return true;
                } else {
                  return false;
                }
              }
            }
          }
        })
      ],
    }),
  ],
}

