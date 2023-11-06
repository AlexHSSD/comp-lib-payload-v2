import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const TestBlock: Block = {
  slug: 'testBlock',
  labels: {
    singular: 'TestBlock',
    plural: 'TestBlock',
    },
  fields: [
    blockFields({
      name: 'testBlockFields',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        richText(),
        {
          name: 'background',
          type: 'select',
          defaultValue: 'grey',
          options: [
            {
              value: 'grey',
              label: 'Grey',
            },
            {
              value: 'blue',
              label: 'Blue',
            },
          ],
        },
        {
            name: 'tests',
            type: 'array',
            label: 'Tests',
            minRows: 3,
            maxRows: 18,
            fields: [
                {
                    name: 'name',
                    label: 'Name',
                    type: 'text',
                },
                richText(),
                {
                    name: 'media',
                    type: 'upload',
                    required: true,
                    relationTo: 'media',
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
          },
      ],
    }),
  ],
}
