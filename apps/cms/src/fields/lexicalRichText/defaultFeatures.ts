import type { FeatureProvider } from '@payloadcms/richtext-lexical'

import {
  lexicalEditor,
  BlockQuoteFeature,
  BoldTextFeature,
  HeadingFeature,
  ItalicTextFeature,
  LinkFeature,
  ParagraphFeature,
  UnderlineTextFeature,
  UploadFeature
} from '@payloadcms/richtext-lexical'

export const defaultFeatures: FeatureProvider[] = [
  ParagraphFeature(),
  BoldTextFeature(),
  ItalicTextFeature(),
  UnderlineTextFeature(),
  BlockQuoteFeature(),
  HeadingFeature({
    enabledHeadingSizes: ['h2', 'h3', 'h4', 'h5', 'h6'],
  }),
  LinkFeature({
    // Example showing how to customize the built-in fields
    // of the Link feature
    fields: [
      {
        name: 'rel',
        label: 'Rel Attribute',
        type: 'select',
        hasMany: true,
        options: ['noopener', 'noreferrer', 'nofollow'],
        admin: {
          description:
            'The rel attribute defines the relationship between a linked resource and the current document. This is a custom link field.',
        },
      },
    ],
  }),
  UploadFeature({
    collections: {
      uploads: {
        // Example showing how to customize the built-in fields
        // of the Upload feature
        fields: [
          {
            name: 'caption',
            type: 'richText',
            editor: lexicalEditor(),
          },
        ],
      },
    },
  }),
]