import type { Block } from 'payload/types'
import { blockFields } from '../../fields/blockFields'

export const HeaderBannerBlock: Block = {
  slug: 'headerBannerBlock',
  labels: {
    singular: 'Header Banner',
    plural: 'Header Banners',
    },
  fields: [
    blockFields({
      name: 'headerBannerBlockFields',
      fields: [
        {
          name: 'headerBanner',
          type: 'checkbox',
          label: 'White Gradiant Removal'
        },
        {
          name: 'color',
          type: 'select',
          defaultValue: 'green',
          options: [
            {
              value: 'green',
              label: 'Green',
            },
            {
              value: 'black',
              label: 'Black',
            },
          ],
        },
        {
          name: 'title',
          type: 'text'
        },
      ],
    }),
  ],
}
