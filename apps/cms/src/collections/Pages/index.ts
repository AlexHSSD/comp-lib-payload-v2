import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import { slugField } from '../../fields/slug'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'

import { RichTextBlock } from '../../blocks/RichTextBlock'
import { ContentBlock } from '../../blocks/ContentBlock'
import { FullPageBlock } from '../../blocks/FullPageBlock'

import { revalidateTag } from '../../utilities/revalidateTag'

import richText from '../../fields/lexicalRichText'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [populatePublishedDate],
    afterRead: [],
    afterChange: [
      ({ req: { payload }, doc }) => {
        revalidateTag({
          payload,
          collection: 'pages',
        })
      },
    ],
    afterDelete: [
      ({ req: { payload }, doc }) => {
        revalidateTag({
          payload,
          collection: 'pages',
        })
      },
    ]
  },
  access: {
    read: adminsOrPublished,
    update: admins,
    create: admins,
    delete: admins,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            richText( true ),
          ],
        },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
}