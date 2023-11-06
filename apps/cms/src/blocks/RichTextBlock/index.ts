import type { Block } from 'payload/types'
import richText from '../../fields/richText'
import { blockFields } from '../../fields/blockFields'
import linkGroup from '../../fields/linkGroup';
import { backgroundColor } from '../../fields/backgroundColor';
import { alignmentOptions } from '../../fields/alignmentOptions';


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
        richText(),
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