import type { Block } from 'payload/types'
import { blockFields } from '../../../fields/blockFields'
import linkGroup from '../../../fields/linkGroup'
import richText from '../../../fields/lexicalRichText'
import { defaultFeatures } from '../../../fields/lexicalRichText/defaultFeatures'
import {
  lexicalEditor
} from '@payloadcms/richtext-lexical'

export const QuoteBlock: Block = {
  slug: 'quoteBlock',
  labels: {
    singular: 'Quote Block',
    plural: 'Quote Blocks',
  },
  fields: [
    blockFields({
      name: 'quoteBlockFields',
      fields: [
        {
          name: 'author',
          label: 'Author',
          type: 'text',
        },
        {
            name: 'byline',
            label: 'Byline',
            type: 'text',
          },
          {
            name: 'content',
            type: 'richText',
            label: 'Content',
            // Pass the Lexical editor here and override base settings as necessary
            editor: lexicalEditor({
              features: () => [
                ...defaultFeatures,
              ],
            })
          },          {
          name: 'media',
          type: 'upload',
          required: true,
          relationTo: 'media',
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'black',
          label: 'Color',
          options: [
            {
              value: 'black',
              label: 'black'
            },
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
      ],
    }),
  ],
}
