import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import { slugField } from '../../fields/slug'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'

import createParentField from '@payloadcms/plugin-nested-docs/dist/fields/parent';
import createBreadcrumbsField from '@payloadcms/plugin-nested-docs/dist/fields/breadcrumbs';


import { RichTextBlock } from '../../blocks/RichTextBlock'
import { HeroBlock } from '../../blocks/HeroSliderBlock'
import { HeaderBannerBlock } from '../../blocks/HeaderBannerBlock'
import { HeroFullWidthBlock } from '../../blocks/HeroFullWidthBlock'
import { CardCarouselBlock } from '../../blocks/CardCarouselBlock'
import { OurTeamBlock } from '../../blocks/OurTeamBlock'
import { SliderSplitBlock } from '../../blocks/SliderSplitBlock'
import { GalleryBlock } from '../../blocks/GalleryBlock'
import { DuskTestimonialsBlock } from '../../blocks/DuskTestimonialBlock'
import { ContentBlock } from '../../blocks/ContentBlock'
import { FaqBlock } from '../../blocks/FaqBlock'
import { FullPageBlock } from '../../blocks/FullPageBlock'
import { CarouselBlock } from '../../blocks/CarouselBlock'
import { CustomProductBlock } from '../../blocks/CustomProductBlock'
import { ProductBlock } from '../../blocks/ProductBlock'
import { ThreeColProductBlock } from '../../blocks/ThreeColProductsBlock'
import { FourBlock } from '../../blocks/FourBlock'
import { TimelineBlock } from '../../blocks/TimelineBlock'
import { AccreditationBlock } from '../../blocks/AccreditationBlock'
import { BreadcrumbsBlock } from '../../blocks/BreadcrumbsBlock'
import { ContactBlock } from '../../blocks/ContactBlock'
import { NewsletterBlock } from '../../blocks/NewsletterBlock'
import { TestimonialBlock } from '../../blocks/TestimonialBlock'
import { VideoBlock } from '../../blocks/VideoBlock'

import { revalidateTag } from '../../utilities/revalidateTag'
import { TableCarouselBlock } from '../../blocks/TableCarouselBlock'
import { GetInTouchBlock } from '../../blocks/GetInTouchBlock'
import { TestBlock } from '../../blocks/TestBlock'
import { ArchiveBlock } from '../../blocks/ArchiveBlock'
import { BlogArchiveBlock } from '../../blocks/BlogArchiveBlock'
import { CmxCarouselBlock } from '../../blocks/CmxCarouselBlock'
import { PrivateLabelingBlock } from '../../blocks/PrivateLabelingBlock'

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
          label: 'Content Blocks',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                RichTextBlock,
                HeroBlock,
                HeaderBannerBlock,
                HeroFullWidthBlock,
                CardCarouselBlock,
                OurTeamBlock,
                SliderSplitBlock,
                GalleryBlock,
                DuskTestimonialsBlock,
                ContentBlock,
                FaqBlock,
                FullPageBlock,
                CarouselBlock,
                CustomProductBlock,
                ProductBlock,
                ThreeColProductBlock,
                FourBlock,
                TimelineBlock,
                AccreditationBlock,
                BreadcrumbsBlock,
                ContactBlock,
                NewsletterBlock,
                TestimonialBlock,
                VideoBlock,
                TableCarouselBlock,
                GetInTouchBlock,
                TestBlock,
                ArchiveBlock,
                BlogArchiveBlock,
                CmxCarouselBlock,
                PrivateLabelingBlock,
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
      "pages",

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
      "pages",

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