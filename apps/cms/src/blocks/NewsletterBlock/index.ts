import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const NewsletterBlock: Block = {
  slug: 'newsletterBlock',
  labels: {
    singular: 'NewsletterBlock',
    plural: 'NewsletterBlock',
    },
  fields: [
    blockFields({
      name: 'newsletterBlockFields',
      fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
        },
        richText(),
      ],
    }),
  ],
}
