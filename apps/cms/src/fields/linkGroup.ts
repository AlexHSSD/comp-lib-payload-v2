import type { ArrayField, Field } from 'payload/types'

import deepMerge from '../utilities/deepMerge'
import link from './link'

type LinkGroupType = (options?: {
  disableLabel?: Boolean
  overrides?: Partial<ArrayField>
}) => Field

const linkGroup: LinkGroupType = ({ disableLabel = false, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        enableAppearance: true,
        disableLabel
      }),
    ],
  }

  return deepMerge(generatedLinkGroup, overrides)
}

export default linkGroup