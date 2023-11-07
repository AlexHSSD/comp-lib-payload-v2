import type { Block } from 'payload/types'
import { blockFields } from '../../../fields/blockFields'
import linkGroup from '../../../fields/linkGroup'
import richText from '../../../fields/lexicalRichText'
import { defaultFeatures } from '../../../fields/lexicalRichText/defaultFeatures'
import {
  lexicalEditor
} from '@payloadcms/richtext-lexical'

export const StandardBlock: Block = {
  slug: 'standardBlock',
  fields: [
    blockFields({
      name: 'standardBlockFields',
      fields: [
        {
          name: 'textPosition',
          label: 'Text Position',
          type: 'select',
          defaultValue: 'center',
          admin: {
            width: '50%',
          },
          options: [
            {
              value: 'center',
              label: 'Text Center',
            },
            {
              value: 'left',
              label: 'Text Left',
            },
          ],
        },
        {
          name: 'textSize',
          label: 'Font Size',
          type: 'select',
          defaultValue: 'small',
          admin: {
            width: '50%',
          },
          options: [
            {
              value: 'small',
              label: 'Small',
            },
            {
              value: 'normal',
              label: 'Normal',
            },
            {
              value: 'large',
              label: 'Large',
            }
          ],
        },
        {
          name: 'title',
          label: 'Title (optional)',
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
