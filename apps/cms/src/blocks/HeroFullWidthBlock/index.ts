import type { Block } from 'payload/types'
import linkGroup from '../../fields/linkGroup'
import { blockFields } from '../../fields/blockFields'

export const HeroFullWidthBlock: Block = {
  slug: 'heroFullWidthBlock',
  labels: {
    singular: 'Hero Full Width',
    plural: 'Hero Full Width',
    },
  fields: [
    blockFields({
      name: 'heroFullWidthBlockFields',
      fields: [
        {
          name: 'heroBanner',
          type: 'checkbox',
          label: 'White Gradiant Removal'
        },
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'left',
          options: [
            {
              value: 'left',
              label: 'Left',
            },
            {
              value: 'center',
              label: 'Center',
            },
            {
              value: 'right',
              label: 'Right',
            }
          ],
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'green',
          options: [
            {
              value: 'green',
              label: 'Green',
            },
            {
              value: 'black',
              label: 'Black',
            },
          ],
        },
        {
          name: 'enableMedia',
          type: 'checkbox',
        },
        {
          name: 'media',
          type: 'upload',
          required: true,
          relationTo: 'media',
          admin: {
            condition: (_, { enableMedia }) => Boolean(enableMedia),
          },
        },
        {
          name: 'enableIcon',
          type: 'checkbox',
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
          name: 'enableOverlayIcon',
          type: 'checkbox',
        },
        {
          name: 'overlayicon',
          type: 'upload',
          required: true,
          relationTo: 'media',
          admin: {
            condition: (_, { enableOverlayIcon }) => Boolean(enableOverlayIcon),
          },
        },
        {
          name: 'title',
          type: 'text'
        },
        {
          name: 'text',
          type: 'textarea'
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
