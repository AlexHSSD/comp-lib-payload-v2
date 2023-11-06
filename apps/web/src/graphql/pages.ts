import {
  ACCREDITATIONBLOCK,
  ARCHIVE_BLOCK,
  BREADCRUMBSBLOCK,
  CARD_CAROUSEL_BLOCK,
  CAROUSEL_BLOCK,
  CONTACTBLOCK,
  CONTENTBLOCK,
  CUSTOMPRODUCT_BLOCK,
  DUSKTESTIMONIALSBLOCK,
  FAQBLOCK,
  FOURBLOCK,
  FULLPAGE_BLOCK,
  GALLERYBLOCK,
  GETINTOUCHBLOCK,
  HEADERBANNERBLOCK,
  HEROBLOCK,
  HEROFULLWIDTHBLOCK,
  NEWSLETTERBLOCK,
  OURTEAMBLOCK,
  RICHTEXTBLOCK,
  SLIDERSPLITBLOCK,
  TABLECAROUSELBLOCK,
  TESTBLOCK,
  TESTIMONIALBLOCK,
  THREECOLPRODUCT_BLOCK,
  TIMELINEBLOCK,
  VIDEOBLOCK,
  BLOG_ARCHIVE_BLOCK,
  CMX_CAROUSEL_BLOCK,
  PRIVATELABELLING_BLOCK,
} from "./blocks";
import { LINK_FIELDS } from "./link";
import { MEDIA } from "./media";
import { META } from "./meta";

export const PAGES = `
  query Pages {
    Pages(limit: 300) {
      docs {
        slug
        breadcrumbs {
          url
          label
        }
      }
    }
  }
`;

export const PAGE = `
  query Page($slug: String ) {
    Pages(where: { AND: [{ slug: { equals: $slug }}] }) {
      docs {
        id
        title
        slug
        layout {
          ${RICHTEXTBLOCK}
          ${HEROBLOCK}
          ${HEADERBANNERBLOCK}
          ${HEROFULLWIDTHBLOCK}
          ${CARD_CAROUSEL_BLOCK}
          ${OURTEAMBLOCK}
          ${SLIDERSPLITBLOCK}
          ${GALLERYBLOCK}
          ${DUSKTESTIMONIALSBLOCK}
          ${CONTENTBLOCK}
          ${FAQBLOCK}
          ${FULLPAGE_BLOCK}
          ${CAROUSEL_BLOCK}
          ${CUSTOMPRODUCT_BLOCK}
          ${THREECOLPRODUCT_BLOCK}
          ${FOURBLOCK}
          ${TIMELINEBLOCK}
          ${ACCREDITATIONBLOCK}
          ${BREADCRUMBSBLOCK}
          ${CONTACTBLOCK}
          ${NEWSLETTERBLOCK}
          ${TESTIMONIALBLOCK}
          ${VIDEOBLOCK}
          ${TABLECAROUSELBLOCK}
          ${GETINTOUCHBLOCK}
          ${ARCHIVE_BLOCK}
          ${TESTBLOCK}
          ${BLOG_ARCHIVE_BLOCK}
          ${CMX_CAROUSEL_BLOCK}
          ${PRIVATELABELLING_BLOCK}
        }
        ${META}
        breadcrumbs {
          url
          label
        }
      }
    }
  }
`;
