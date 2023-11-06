import type { Block } from 'payload/types'
import richText from '../../fields/richText';
import link from '../../fields/link';


export const ContactBlock: Block = {
  slug: 'contactBlock',
  labels: {
    singular: 'Contact Block',
    plural: 'Contact Blocks',
  },
  graphQL: {
    singularName: 'ContactBlock',
  },
  fields: [
    {
      name: 'formFields',
      label: 'Form Fields',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
        },
        richText({
          name: 'introContent',
          label: 'Intro Content',
        }),
        {
          name: 'form',
          type: 'relationship',
          relationTo: 'forms',
          required: true,
        },
      ]
    },
    {
      name: 'contactFields',
      label: 'Contact Fields',
      type: 'group',
      fields: [
        richText({
          name: 'introContent',
          label: 'Intro Content',
        }),
        {
          name: 'contactMethods',
          label: 'Contact Methods',
          type: 'array',
          fields: [
            {
              name: 'icon',
              label: 'Icon',
              type: 'upload',
              relationTo: 'media',
            },
            link()
          ]
        }
      ]
    }
  ],
};