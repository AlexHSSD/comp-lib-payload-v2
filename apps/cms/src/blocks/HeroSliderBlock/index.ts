import type { Block } from 'payload/types'
import linkGroup from '../../fields/linkGroup'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  labels: {
    singular: 'Hero',
    plural: 'Heros',
    },
  fields: [
    blockFields({
      name: 'heroBlockFields',
      fields: [
        {
          name: 'gradiant',
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
          name: 'slides',
          type: 'array',
          label: 'Slides',
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
              {
                name: 'color',
                type: 'select',
                defaultValue: 'grey',
                options: [
                  {
                    value: 'grey',
                    label: 'Grey',
                  },
                  {
                    value: 'green',
                    label: 'Green',
                  },
                  {
                    value: 'red',
                    label: 'Red',
                  },
                ],
              },
              richText(),
              linkGroup({
                overrides: {
                  maxRows: 1,
                }
              })
          ],
        },
      ],
    }),
  ],
}
