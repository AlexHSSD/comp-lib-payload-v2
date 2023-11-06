import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const ArchiveBlock: Block = {
  slug: 'archiveBlock',
  labels: {
    singular: 'Archive Block',
    plural: 'Archive Blocks',
    },
  fields: [
    blockFields({
      name: 'archiveBlockFields',
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
              value: 'grey',
              label: 'grey',
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
          name: 'displayType',
          type: 'select',
          label: 'Display Type',
          defaultValue: 'carousel',
          options: [
            {
              label: 'Carousel',
              value: 'carousel',
            },
          ],
        },
        {
          name: 'populateBy',
          type: 'select',
          defaultValue: 'selection',
          options: [
            {
              label: 'Collection',
              value: 'collection',
            },
            {
              label: 'Individual Selection',
              value: 'selection',
            },
          ],
          admin: {
            hidden: true
          }
        },
        {
          type: 'select',
          name: 'relationTo',
          label: 'Collections To Show',
          defaultValue: 'tests',
          admin: {
            condition: (_, siblingData) => siblingData.populateBy === 'collection',
          },
          options: [
            {
              label: 'Tests',
              value: 'tests',
            },
          ],
        },
        {
          type: 'number',
          name: 'limit',
          label: 'Limit',
          defaultValue: 10,
          admin: {
            condition: (_, siblingData) => siblingData.populateBy === 'collection',
            step: 1,
          },
        },
        {
          type: 'relationship',
          name: 'populatedDocs',
          label: 'Populated Docs',
          relationTo: ['tests'],
          hasMany: true,
          admin: {
            disabled: true,
            description: 'This field is auto-populated after-read',
            condition: (_, siblingData) => siblingData.populateBy === 'collection',
          },
        },
        {
          type: 'relationship',
          name: 'selectedDocs',
          label: 'Selection',
          relationTo: ['tests'],
          hasMany: true,
          admin: {
            condition: (_, siblingData) => siblingData.populateBy === 'selection',
          },
        },
        {
          type: 'number',
          name: 'populatedDocsTotal',
          label: 'Populated Docs Total',
          admin: {
            step: 1,
            disabled: true,
            description: 'This field is auto-populated after-read',
            condition: (_, siblingData) => siblingData.populateBy === 'collection',
          },
        },
      ],
    }),
  ],
}
