import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const FaqBlock: Block = {
  slug: 'faqBlock',
  labels: {
    singular: 'FaqBlock',
    plural: 'FaqBlock',
    },
  fields: [
    blockFields({
      name: 'faqBlockFields',
      fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
        },
        {
            name: 'questions',
            type: 'array',
            label: 'Questions',
            minRows: 1,
            maxRows: 9,
            fields: [
                {
                    name: 'question',
                    label: 'Question',
                    type: 'text',
                },
                richText(),
            ],
          },
      ],
    }),
  ],
}
