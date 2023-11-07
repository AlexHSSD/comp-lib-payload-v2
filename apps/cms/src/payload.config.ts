import path from 'path';
import nestedDocs from '@payloadcms/plugin-nested-docs'
import seo from '@payloadcms/plugin-seo'
import redirects from '@payloadcms/plugin-redirects'
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import { buildConfig } from 'payload/config';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { azureBlobStorageAdapter } from '@payloadcms/plugin-cloud-storage/azure';
import formBuilder from "@payloadcms/plugin-form-builder";
import { fields } from "@payloadcms/plugin-form-builder";


import { Icon } from './graphics/Icon';
import { Logo } from './graphics/Logo';

import Users from './collections/Users'

import { Footer } from './globals/Footer'
import { Header } from './globals/Header'

import { Pages } from './collections/Pages'
import { Tests } from './collections/Tests'
import { Media } from './collections/Media'
import { revalidateTag } from './utilities/revalidateTag';

const adapter = azureBlobStorageAdapter({
  connectionString: process.env.AZURE_STORAGE_CONNECTION_STRING as string,
  containerName: process.env.AZURE_STORAGE_CONTAINER_NAME as string,
  allowContainerCreate: process.env.AZURE_STORAGE_ALLOW_CONTAINER_CREATE === 'true',
  baseURL: process.env.AZURE_STORAGE_ACCOUNT_BASEURL as string,
})

const generateTitle: GenerateTitle = () => {
  return 'Component Library'
}


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
    components: {
      graphics: {
        Icon,
        Logo,
      },
    },
    // Add your own meta data here
    meta: {
      favicon: '/assets/favicon.svg', 
      // ogImage: '/assets/ogImage.png',
      titleSuffix: '- Component Library - PayloadCMS',
    },
  },
  collections: [Users, Pages, Tests, Media],
  globals: [
    Footer, Header,
    // Your globals here
  ],
  typescript: {
    outputFile: path.resolve(__dirname, './payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, '../generated-schema.graphql'),
  },
  plugins: [
    nestedDocs({
      collections: ['pages', 'tests'],
      generateLabel: (_, doc) => doc.title as string,
      generateURL: docs => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),
    redirects({
      collections: ['pages' , 'tests'],
    }),
    seo({
      collections: ['pages' , 'tests'],
      generateTitle,
      uploadsCollection: 'media',
      tabbedUI: true,
    }),
    cloudStorage({
      collections: {
        'media': {
          adapter,
          disablePayloadAccessControl: true,
        }
      },
    }),
    formBuilder({
    formOverrides: {
      hooks: {
        afterChange: [
          ({ req: { payload }, doc }) => {
            revalidateTag({
              payload,
              collection: 'pages',
            })
          },
        ]
      },
    },
      fields: {
        payment: false,
        text: {
          ...fields.text,
          fields: [
            // @ts-ignore
            ...fields.text.fields,
            {
              type: 'text',
              name: 'placeholder',
            },
          ]
        },
        textarea: {
          ...fields.textarea,
          fields: [
            // @ts-ignore
            ...fields.textarea.fields,
            {
              type: 'text',
              name: 'placeholder',
            },
          ]
        },
      }
    })
  ]
});
