import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'

export const TimelineBlock: Block = {
  slug: 'timelineBlock',
  labels: {
    singular: 'TimelineBlock',
    plural: 'TimelineBlock',
    },
  fields: [
    blockFields({
      name: 'timelineBlockFields',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
      },
      richText(),
        {
            name: 'dates',
            type: 'array',
            label: 'Dates',
            minRows: 3,
            maxRows: 24,
            fields: [
                {
                    name: 'year',
                    label: 'Year',
                    type: 'text',
                },
                richText(),
            ],
          },
      ],
    }),
  ],
}
