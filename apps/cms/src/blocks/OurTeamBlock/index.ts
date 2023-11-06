import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const OurTeamBlock: Block = {
  slug: 'ourTeamBlock',
  labels: {
    singular: 'OurTeamBlock',
    plural: 'OurTeamBlock',
    },
  fields: [
    blockFields({
      name: 'ourTeamBlockFields',
      fields: [
        {
            name: 'title',
            label: 'Title',
            type: 'text',
        },
        richText(),
        {
            name: 'member',
            type: 'array',
            label: 'Member',
            minRows: 6,
            maxRows: 16,
            fields: [
                {
                    name: 'name',
                    label: 'Name',
                    type: 'text',
                },
                {
                  name: 'linkedin',
                  label: 'LinkedIn',
                  type: 'text',
              },
                {
                  name: 'job',
                  label: 'Job title',
                  type: 'text',
              },
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
