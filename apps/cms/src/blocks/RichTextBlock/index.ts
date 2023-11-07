import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'
import linkGroup from '../../fields/linkGroup';
import { backgroundColor } from '../../fields/backgroundColor';
import { alignmentOptions } from '../../fields/alignmentOptions';
import richText from '../../fields/lexicalRichText'
import { defaultFeatures } from '../../fields/lexicalRichText/defaultFeatures'
import {
  lexicalEditor
} from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'richTextBlock',
  labels: {
    singular: 'RichText Block',
    plural: 'RichText Blocks',
    },
  fields: [
    blockFields({
      name: 'richTextBlockFields',
      fields: [
        {
          type: 'row',
          fields: [
            alignmentOptions({
              overrides: {
                admin: {
                  width: '50%',
                }
              }
            }),
            backgroundColor({
              overrides: {
                admin: {
                  width: '50%',
                }
              }
            })
          ]
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
        },
        {
          name: 'enableLink',
          type: 'checkbox',
          label: "Enable CTA button(s)"
        },
        linkGroup({
          overrides: {
            maxRows: 2,
            admin: {
              condition: (data, siblingData, { user }) => {
                if (siblingData.enableLink) {
                  return true;
                } else {
                  return false;
                }
              }
            }
          }
        })
      ],
    }),
  ],
}