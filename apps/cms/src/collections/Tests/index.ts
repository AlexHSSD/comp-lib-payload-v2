import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import { slugField } from '../../fields/slug'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'

import createParentField from '@payloadcms/plugin-nested-docs/dist/fields/parent';
import createBreadcrumbsField from '@payloadcms/plugin-nested-docs/dist/fields/breadcrumbs';
import richText from '../../fields/richText'

import { ContentBlock } from '../../blocks/ContentBlock'
import { FaqBlock } from '../../blocks/FaqBlock'
import { VideoBlock } from '../../blocks/VideoBlock'
import { NewsletterBlock } from '../../blocks/NewsletterBlock'
import { SliderSplitBlock } from '../../blocks/SliderSplitBlock'
import { TestimonialBlock } from '../../blocks/TestimonialBlock'
import { AccreditationBlock } from '../../blocks/AccreditationBlock'

import { revalidateTag } from '../../utilities/revalidateTag'
import { GetInTouchBlock } from '../../blocks/GetInTouchBlock'
import { ProductBlock } from '../../blocks/ProductBlock'
import { ArchiveBlock } from '../../blocks/ArchiveBlock'
import { ComparisonBlock } from '../../blocks/ComparisonBlock'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'

export const Tests: CollectionConfig = {
  slug: 'tests',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeChange: [populatePublishedDate],
    afterRead: [populateArchiveBlock],
    afterChange: [
      ({ req: { payload }, doc }) => {
        revalidateTag({
          payload,
          collection: 'tests',
        })
      },
    ],
    afterDelete: [
      ({ req: { payload }, doc }) => {
        revalidateTag({
          payload,
          collection: 'tests',
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
            {
              name: 'benefits',
              type: 'array',
              required: true,
              minRows: 3,
              fields: [
                {
                  name: 'name',
                  required: true,
                  type: 'text',
                  label: 'Name',
                  maxLength: 100,
                },
                {
                  type: 'checkbox',
                  name: 'enabled',
                  label: 'Has benefit?',
                  defaultValue: false,
                }
              ]
            }
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
                ContentBlock,
                // CtaButtonBlock,
                FaqBlock,
                VideoBlock,
                NewsletterBlock,
                SliderSplitBlock,
                TestimonialBlock,
                AccreditationBlock,
                GetInTouchBlock,
                ProductBlock,
                ArchiveBlock,
                ComparisonBlock
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
      "tests",

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
      "tests",

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