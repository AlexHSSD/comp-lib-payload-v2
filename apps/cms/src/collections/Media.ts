import path from 'path'
import type { CollectionConfig } from 'payload/types'
import { defaultFeatures } from '../fields/lexicalRichText/defaultFeatures'
import {
  lexicalEditor
} from '@payloadcms/richtext-lexical'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(__dirname, '../../media'),
    resizeOptions: {
      width: 2000,
    }
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      label: 'Caption',
      // Pass the Lexical editor here and override base settings as necessary
      editor: lexicalEditor({
        features: () => [
          ...defaultFeatures,
        ],
      })
    },
  ],
}
