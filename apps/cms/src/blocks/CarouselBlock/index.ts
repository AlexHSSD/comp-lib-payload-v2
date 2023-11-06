import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const CarouselBlock: Block = {
  slug: 'carouselBlock',
  labels: {
    singular: 'CarouselBlock',
    plural: 'CarouselBlock',
    },
  fields: [
    blockFields({
      name: 'carouselBlockFields',
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
          name: 'icon',
          type: 'upload',
          required: false,
          relationTo: 'media',
        },
        {
          name: 'logo',
          type: 'upload',
          required: false,
          relationTo: 'media',
        },
        {
          name: 'image',
          type: 'upload',
          required: false,
          relationTo: 'media',
        },
        {
          name: 'style',
          type: 'select',
          defaultValue: 'left',
          options: [
            {
              value: 'top',
              label: 'Top'
            },
            {
              value: 'left',
              label: 'Left',
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
        }),
        {
            name: 'products',
            type: 'array',
            label: 'Products',
            minRows: 3,
            maxRows: 3,
            fields: [
                {
                name: 'media',
                type: 'upload',
                required: true,
                relationTo: 'media',
                },
            ],
          },
      ],
    }),
  ],
}
