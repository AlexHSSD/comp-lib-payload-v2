import type { Block } from 'payload/types'
import linkGroup from '../../fields/linkGroup'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'

export const FourBlock: Block = {
  slug: 'fourBlock',
  labels: {
    singular: 'Four Block',
    plural: 'Four Blocks',
    },
  fields: [
    blockFields({
      name: 'fourBlockFields',
      fields: [
        {
          name: "title",
          type: "text",
          label: "Title"
        },
        richText(),
        {
            name: 'blocks',
            type: 'array',
            label: 'Blocks',
            minRows: 3,
            maxRows: 4,
            fields: [
              {
                name: 'color',
                type: 'select',
                defaultValue: 'black',
                label: 'Color',
                options: [
                  {
                    value: 'red',
                    label: 'red',
                  },
                  {
                    value: 'green',
                    label: 'green',
                  },
                ],
              },
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
                richText(),
            ],
          },
      ],
    }),
  ],
}
