import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import { MessageField } from '../../fields/Message'

export const BreadcrumbsBlock: Block = {
  slug: 'breadcrumbsBlock',
  labels: {
    singular: 'Breadcrumbs',
    plural: 'Breadcrumbs',
  },
  fields: [
    blockFields({
      name: 'breadcrumbsBlockFields',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title (Unused)',
        },
        {
          name: "message", // required
          type: "ui", // required
          admin: {
            components: {
              Field: MessageField,
              Cell: MessageField,
            },
          },
        },
      ],
    }),
  ],
}
