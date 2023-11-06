import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import { slugField } from '../../fields/slug'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'

import createParentField from '@payloadcms/plugin-nested-docs/dist/fields/parent';
import createBreadcrumbsField from '@payloadcms/plugin-nested-docs/dist/fields/breadcrumbs';
import richText from '../../fields/richText'

import { RichTextBlock } from '../../blocks/RichTextBlock'

import { revalidateTag } from '../../utilities/revalidateTag'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
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
          collection: 'blogs',
        })
      },
    ],
    afterDelete: [
      ({ req: { payload }, doc }) => {
        revalidateTag({
          payload,
          collection: 'blogs',
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
          label: 'Product Details',
          fields: [
            {
              name: 'title',
              type: 'text',
              label: "Title",
              required: true
            },
            {
              name: 'subheading',
              type: 'text',
              label: "Subheading",
              required: true
            },
            richText(),
            {
              name: 'shortDescription',
              label: "Short Description",
              type: 'textarea',
              required: true,
            },
            {
              name: 'media',
              type: 'upload',
              required: true,
              relationTo: 'media',
            },
            {
              name: 'color',
              type: 'select',
              label: 'Color',
              options: [
                {
                  value: 'red',
                  label: 'red',
                },
                {
                  value: 'green',
                  label: 'green',
                },
              ],
            },
          ],
        },
        {
          label: 'Content Blocks',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                RichTextBlock,
              ],
            },
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
    createParentField(
      // First argument is equal to the slug of the collection
      // that the field references
      "blogs",

      // Second argument is equal to field overrides that you specify,
      // which will be merged into the base parent field config
      {
        admin: {
          position: "sidebar",
        },
        // Note: if you override the `filterOptions` of the `parent` field,
        // be sure to continue to prevent the document from referencing itself as the parent like this:
        // filterOptions: ({ id }) => ({ id: {not_equals: id }})`
      }
    ),
    createBreadcrumbsField(
      // First argument is equal to the slug of the collection
      // that the field references
      "blogs",

      // Argument equal to field overrides that you specify,
      // which will be merged into the base `breadcrumbs` field config
      {
        label: "Breadcrumbs",
        admin: {
          position: "sidebar",
        },
      },
    ),
  ],
}