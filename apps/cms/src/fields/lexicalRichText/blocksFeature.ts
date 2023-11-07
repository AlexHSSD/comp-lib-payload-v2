
import type { FeatureProvider } from '@payloadcms/richtext-lexical'

import {
  BlocksFeature,
} from '@payloadcms/richtext-lexical'

import { RichTextBlock } from '../../blocks/RichTextBlock'
import { ContentBlock } from '../../blocks/ContentBlock'
import { FullPageBlock } from '../../blocks/FullPageBlock'

export const blocksFeature: FeatureProvider[] = [
  BlocksFeature({
    blocks: [
      RichTextBlock,
      ContentBlock,
      FullPageBlock
    ],
  })
]
