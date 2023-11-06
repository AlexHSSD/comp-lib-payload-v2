
import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const ComparisonBlock: Block = {
  slug: 'comparisonBlock',
  labels: {
    singular: 'Comparison',
    plural: 'Comparisons',
    },
  fields: [
    blockFields({
      name: 'comparisonBlockFields',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        richText(),
        {
          name: 'tableHeading',
          type: 'text',
          label: 'Table Column Heading',
        },
        {
          name: 'columns',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
            },
            {
              name: 'color',
              type: 'select',
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
              name: 'rows',
              type: 'array',
              required: true,
              minRows: 3,
              fields: [
                {
                  name: 'name',
                  required: true,
                  type: 'text',
                  label: 'Name',
                  maxLength: 100,
                },
                {
                  type: 'select',
                  name: 'dataType',
                  label: 'Data Type',
                  defaultValue: 'checkbox',
                  options: [
                    {
                      label: 'Checkbox',
                      value: 'checkbox',
                    },
                    {
                      label: 'Text',
                      value: 'text',
                    }
                  ]
                },
                {
                  type: 'checkbox',
                  name: 'enabled',
                  label: 'Has benefit?',
                  defaultValue: false,
                  admin: {
                    condition: (data, siblingData, { user }) => {
                      if (siblingData.dataType === 'checkbox') {
                        return true;
                      } else {
                        return false;
                      }
                    }
                  }
                },
                {
                  type: 'text',
                  name: 'text',
                  label: 'Text',
                  required: true,
                  admin: {
                    condition: (data, siblingData, { user }) => {
                      if (siblingData.dataType === 'text') {
                        return true;
                      } else {
                        return false;
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      ],
    }),
  ],
}