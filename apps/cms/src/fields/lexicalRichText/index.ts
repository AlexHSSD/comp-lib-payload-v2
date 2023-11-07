import type { FeatureProvider } from '@payloadcms/richtext-lexical'
import type { RichTextField } from 'payload/types'

import { ParagraphFeature, UploadFeature, lexicalEditor, LinkFeature, } from '@payloadcms/richtext-lexical'

import deepMerge from '../../utilities/deepMerge'
import link from '../link'
import { defaultFeatures } from './defaultFeatures'
import { blocksFeature } from './blocksFeature'

type RichText = (
  enableBlocks?: boolean,
) => RichTextField

const richText: RichText = (
  enableBlocks = false,
) =>
    ({
      name: 'content',
      editor: lexicalEditor({
        features: () => [
          ...defaultFeatures,
          ...(enableBlocks ? blocksFeature : [])
        ],
      }),
      required: true,
      type: 'richText',
    })

export default richText
