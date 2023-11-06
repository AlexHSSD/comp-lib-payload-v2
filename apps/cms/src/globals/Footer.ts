import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'
import { revalidateTag } from '../utilities/revalidateTag'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [],
    afterRead: [],
    afterChange: [
      ({ req: { payload }, doc }) => {
        revalidateTag({
          payload,
          collection: 'globals',
        })
      },
    ]
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,
      label: 'Bottom Nav Items',
      fields: [
        link(),
      ],
    }
  ],
}