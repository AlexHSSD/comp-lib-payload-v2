import type { Block } from 'payload/types'
import linkGroup from '../../fields/linkGroup'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'

export const FullPageBlock: Block = {
  slug: 'fullPageBlock',
  labels: {
    singular: 'FullPageBlock',
    plural: 'FullPageBlocks',
    },
  fields: [
    blockFields({
      name: 'fullPageBlockFields',
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: 'medium',
          options: [
            {
              value: 'small',
              label: 'small',
            },
            {
              value: 'medium',
              label: 'medium',
            },
            {
              value: 'large',
              label: 'large',
            },
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
          name: 'enableBgImage',
          label: 'Enable Background Image',
          type: 'checkbox'
      },
      {
        name: 'bgImage',
        type: 'upload',
        required: false,
        relationTo: 'media',
        admin: {
          condition: (_, { enableBgImage }) => Boolean(enableBgImage),
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
        {
            name: 'enableIcon',
            type: 'checkbox'
        },
        {
          name: 'icon',
          type: 'upload',
          required: true,
          relationTo: 'media',
          admin: {
            condition: (_, { enableIcon }) => Boolean(enableIcon),
          },
        },
        {
          name: 'title',
          type: 'text'
        },
        richText(),
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
