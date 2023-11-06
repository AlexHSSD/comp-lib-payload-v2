import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'
import { revalidateTag } from '../utilities/revalidateTag'

export const Header: GlobalConfig = {
  slug: 'header',
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
      fields: [
        link(),
        {
          name: 'subNavItems',
          type: 'array',
          maxRows: 8,
          fields: [
            link(),
          ],
        }
      ],
    },
  ],
}