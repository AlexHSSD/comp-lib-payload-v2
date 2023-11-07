import path from 'path';
import { buildConfig } from 'payload/config'

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import Users from './collections/Users'

import { Footer } from './globals/Footer'
import { Header } from './globals/Header'

import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { revalidateTag } from './utilities/revalidateTag';


export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  ...(process.env.PAYLOAD_PUBLIC_SITE_URL
    ? {
        cors: [process.env.PAYLOAD_PUBLIC_SITE_URL].filter(Boolean),
        csrf: [process.env.PAYLOAD_PUBLIC_SITE_URL].filter(Boolean)
      }
    : {}),
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    // Add your own meta data here
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1280,
          height: 1024,
        },
      ]
    },
  },
  editor: lexicalEditor({}),
  collections: [Users, Pages, Media],
  globals: [
    Footer, Header,
    // Your globals here
  ],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, './payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, '../generated-schema.graphql'),
  },
});
