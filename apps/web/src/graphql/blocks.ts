import { FORM_FIELDS } from "./form";
import { LINK_FIELDS, LINK_GROUP } from "./link";
import { MEDIA, MEDIA_FIELDS } from "./media";

export const RICHTEXTBLOCK = `
  ... on RichTextBlock {
    blockType
    richTextBlockFields {
      align
      backgroundColor
      richText
      enableLink
      ${LINK_GROUP({ enableAppearance: true })}
    }
  }
`;

export const HEROBLOCK = `
... on HeroBlock {
  blockType
  heroBlockFields {
    slides {
      title
      richText
      color
      ${MEDIA}
      ${LINK_GROUP({ enableAppearance: true })}
    }
  }
}
`;

export const HEADERBANNERBLOCK = `
... on HeaderBannerBlock {
  blockType
  headerBannerBlockFields {
    headerBanner
    color
    title
  }
}
`;

export const HEROFULLWIDTHBLOCK = `
...on HeroFullWidthBlock {
  blockType
  heroFullWidthBlockFields {
    heroBanner
    layout
    color
    enableMedia
    ${MEDIA}
    enableIcon
    icon {
      ${MEDIA_FIELDS}
    }
    enableOverlayIcon
    overlayicon {
      ${MEDIA_FIELDS}
    }
    title
    text
    enableLink
    ${LINK_GROUP({ enableAppearance: true })}
  }
}
`;

export const CARD_CAROUSEL_BLOCK = `
 ... on CardCarouselBlock {
  blockType
  cardCarouselBlockFields {
    title
    richText
    cards {
      color
      title
      richText
      ${LINK_GROUP({ enableAppearance: true })}
      ${MEDIA}
    }
  }
 }
`;

export const OURTEAMBLOCK = `
... on OurTeamBlock {
  blockType
  ourTeamBlockFields {
    title
    richText
    member {
      name
      linkedin
      job
      ${MEDIA}
    }
  }
}
`;

export const CAROUSEL_BLOCK = `
...on CarouselBlock {
  blockType
  carouselBlockFields {
    background
    style
    icon {
      ${MEDIA_FIELDS}
    }
    logo {
      ${MEDIA_FIELDS}
    }
    image {
      ${MEDIA_FIELDS}
    }
    title
    richText
    enableLink
    ${LINK_GROUP({ enableAppearance: true })}
    products {
      ${MEDIA}
    }
  }
}
`;

export const SLIDERSPLITBLOCK = `
... on SliderSplitBlock {
  blockType
  sliderSplitBlockFields {
    title
    richText
    slides {
      title
      richText
      ${LINK_GROUP({ enableAppearance: true })}
      ${MEDIA}
    }
    enablePaginationButtons
  }
}
`;

export const GALLERYBLOCK = `
  ...on GalleryBlock {
    blockType
    galleryBlockFields {
      images {
        ${MEDIA}
      }
    }
  }
`;

export const DUSKTESTIMONIALSBLOCK = `
... on DuskTestimonialsBlock {
  blockType
  duskTestimonialsBlockFields {
    testimonials {
      testimonial
      name
    }
  }
}
`;

export const QUOTEBLOCK = `
... on QuoteBlock {
  blockType
  blockName
  quoteBlockFields {
    author
    byline
    richText
    color
    ${MEDIA}
  }
}
`;

export const STANDARDBLOCK = `
... on StandardBlock {
  blockType
  blockName
  standardBlockFields {
    title
    richText
    textPosition
    textSize
    ${LINK_GROUP({ enableAppearance: true })}
  }
}
`;

export const MEDIABLOCK = `
... on MediaBlock {
  blockType
  blockName
  mediaBlockFields {
    ${MEDIA}
    shadow
    shadowPosition
  }
}
`;

export const CONTENTBLOCK = `
  ... on ContentBlock {
    blockType
    contentBlockFields {
      background
      enableIcon
      icon {
        ${MEDIA_FIELDS}
      }
      divider
      leftLayout {
        ${QUOTEBLOCK}
        ${STANDARDBLOCK}
        ${MEDIABLOCK}
      }
      rightLayout {
        ${QUOTEBLOCK}
        ${STANDARDBLOCK}
        ${MEDIABLOCK}
      }
    }
  }
`;

export const FAQBLOCK = `
... on FaqBlock {
  blockType
  faqBlockFields {
    title
    questions {
      question
      richText
    }
  }
}
`;

export const FULLPAGE_BLOCK = `
...on FullPageBlock {
  blockType
  fullPageBlockFields {
    width
    background
    enableBgImage
    bgImage {
      ${MEDIA_FIELDS}
    }
    divider
    enableIcon
    icon {
      ${MEDIA_FIELDS}
    }
    title
    richText
    enableLink
    ${LINK_GROUP({ enableAppearance: true })}
  }
}
`;

export const CUSTOMPRODUCT_BLOCK = `
...on CustomProductBlock {
  blockType
  customProductBlockFields {
    title
    elements {
      name
      richText
    }
    enableLink
    ${LINK_GROUP({ enableAppearance: true })}
  }
}
`;

export const THREECOLPRODUCT_BLOCK = `
  ... on ThreeColProductBlock {
    blockType
    threeColProductBlockFields {
      enableIntro
      intro
      text
      enableBgIcons
      bgIcon {
        ${MEDIA_FIELDS}
      }
      enableLink
      ${LINK_GROUP({ enableAppearance: true })}
      products {
        id
        title
        ${MEDIA}
      }
    }
  }
`;

export const FOURBLOCK = `
  ... on FourBlock {
    blockType
    fourBlockFields {
      title
      richText
      blocks {
        color
        title
        richText
        ${MEDIA}
      }
    }
  }
`;

export const TIMELINEBLOCK = `
... on TimelineBlock {
  blockType
  timelineBlockFields {
    title
    richText
    dates {
      year
      richText
    }
  }
}
`;

export const ACCREDITATIONBLOCK = `
... on 	AccreditationBlock {
  blockType
  accreditationBlockFields {
    title
    accreditations {
      title
      ${MEDIA}
    }
  }
}
`;

export const BREADCRUMBSBLOCK = `
  ... on BreadcrumbsBlock {
    blockType
    breadcrumbsBlockFields {
      title
    }
  }
`;

export const CONTACTBLOCK = `
...on ContactBlock {
  blockType
  formFields {
    title
    introContent
    form ${FORM_FIELDS}
  }
  contactFields {
    introContent
    contactMethods {
      icon {
        ${MEDIA_FIELDS}
      }
      link ${LINK_FIELDS()}
    }
  }
}
`;

export const NEWSLETTERBLOCK = `
... on NewsletterBlock {
  blockType
  newsletterBlockFields {
    title
    richText
  }
}
`;

export const TESTIMONIALBLOCK = `
... on 	TestimonialBlock {
  blockType
  testimonialBlockFields {
    background
    title
    richText
    testimonials {
      background
      title
      job
      richText
      color
    }
  }
}
`;

export const VIDEOBLOCK = `
... on 	VideoBlock {
  blockType
  videoBlockFields {
    background
    title
    richText
    embed
  }
}
`;

export const TABLECAROUSELBLOCK = `
... on TableCarouselBlock {
  blockType
  tableCarouselBlockFields {
    title
    richText
    testBenefits {
      slug
      title
      color
      benefits {
        name
        enabled
      }
    }
  }
}
`;

export const GETINTOUCHBLOCK = `
... on GetInTouchBlock {
  blockType
  getInTouchBlockFields {
    title
    richText
    ${LINK_GROUP({ enableAppearance: true })}
  }
}
`;

export const COMPARISON_BLOCK = `
 ... on ComparisonBlock {
  blockType
  comparisonBlockFields {
    title
    richText
    tableHeading
    columns {
      title
      color
      rows {
        name
        dataType
        enabled
        text
      }
    }
  }
 }
`;

export const ARCHIVE_BLOCK = `
  ... on ArchiveBlock {
    blockType
    archiveBlockFields {
      title
      background
      richText
      populateBy
      relationTo
      limit
      displayType
      selectedDocs {
        relationTo
        value {
          ...on Test {
            id
            slug
            title
            richText
            shortDescription
            color
            breadcrumbs {
              url
            }
            ${MEDIA}
          }
        }
      }
    }
  }
`;

export const BLOG_ARCHIVE_BLOCK = `
  ... on BlogArchiveBlock {
    blockType
    blogArchiveBlockFields {
      title
      background
      richText
      populateBy
      relationTo
      limit
      displayType
      selectedDocs {
        relationTo
        value {
          ...on Blog {
            id
            slug
            title
            richText
            shortDescription
            color
            breadcrumbs {
              url
            }
            ${MEDIA}
          }
        }
      }
    }
  }
`;

export const TESTBLOCK = `
  ... on TestBlock {
    blockType
    testBlockFields {
      title
      richText
      background
      tests {
        name
        richText
        ${MEDIA}
        enableLink
        ${LINK_GROUP({ enableAppearance: true })}
      }
    }
  }
`;

export const CMX_CAROUSEL_BLOCK = `
...on CmxCarouselBlock {
  blockType
  cmxCarouselBlockFields {
    background
    style
    icon {
      ${MEDIA_FIELDS}
    }
    logo {
      ${MEDIA_FIELDS}
    }
    image {
      ${MEDIA_FIELDS}
    }
    title
    richText
    enableLink
    ${LINK_GROUP({ enableAppearance: true })}
    products {
      ${MEDIA}
    }
  }
}
`;

export const PRIVATELABELLING_BLOCK = `
...on PrivateLabelingBlock {
  blockType
  privateLabelingBlockFields {
    background
    style
    icon {
      ${MEDIA_FIELDS}
    }
    logo {
      ${MEDIA_FIELDS}
    }
    image {
      ${MEDIA_FIELDS}
    }
    title
    richText
    enableLink
    ${LINK_GROUP({ enableAppearance: true })}
    products {
      ${MEDIA}
    }
  }
}
`;
