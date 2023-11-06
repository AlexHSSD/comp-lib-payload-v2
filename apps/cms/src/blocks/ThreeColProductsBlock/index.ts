import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import linkGroup from '../../fields/linkGroup'

export const ThreeColProductBlock: Block = {
  slug: 'threeColProductBlock',
  labels: {
    singular: 'ThreeColProductBlock',
    plural: 'ThreeColProductBlocks',
    },
  fields: [
    blockFields({
      name: 'threeColProductBlockFields',
      fields: [
        {
          name: 'enableIntro',
          type: 'checkbox',
          label: "Enable Text Intro)"
        },
        {
          name: 'intro',
          type: 'text',
          admin: {
            condition: (_, { enableIntro }) => Boolean(enableIntro),
          },
        },
        {
          name: 'text',
          type: 'textarea',
          admin: {
            condition: (_, { enableIntro }) => Boolean(enableIntro),
          },
        },
        {
          name: 'enableBgIcons',
          label: 'Enable Background Icon',
          type: 'checkbox'
        },
        {
          name: 'bgIcon',
          type: 'upload',
          required: false,
          relationTo: 'media',
          admin: {
            condition: (_, { enableBgIcons }) => Boolean(enableBgIcons),
          },
        },
        {
            name: 'products',
            type: 'array',
            label: 'Products',
            minRows: 3,
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

