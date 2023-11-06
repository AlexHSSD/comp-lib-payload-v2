import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'

export const TestimonialBlock: Block = {
  slug: 'testimonialBlock',
  labels: {
    singular: 'TestimonialBlock',
    plural: 'TestimonialBlock',
    },
  fields: [
    blockFields({
      name: 'testimonialBlockFields',
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
            name: 'title',
            label: 'Title',
            type: 'text',
        },
        richText(),
        {
            name: 'testimonials',
            type: 'array',
            label: 'Testimonials',
            minRows: 1,
            maxRows: 9,
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
                  name: 'color',
                  type: 'select',
                  defaultValue: 'red',
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
                    name: 'title',
                    label: 'Title',
                    type: 'text',
                },
                {
                  name: 'job',
                  label: 'Job Title',
                  type: 'text',
              },
                richText(),
            ],
          },
      ],
    }),
  ],
}
