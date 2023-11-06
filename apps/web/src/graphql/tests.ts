import {
  FOURBLOCK,
  RICHTEXTBLOCK,
  VIDEOBLOCK,
  TESTIMONIALBLOCK,
  ACCREDITATIONBLOCK,
  CONTENTBLOCK,
  TIMELINEBLOCK,
  OURTEAMBLOCK,
  NEWSLETTERBLOCK,
  FAQBLOCK,
  HEROBLOCK,
  HEADERBANNERBLOCK,
  SLIDERSPLITBLOCK,
  CONTACTBLOCK,
  TABLECAROUSELBLOCK,
  GETINTOUCHBLOCK,
  ARCHIVE_BLOCK,
  COMPARISON_BLOCK,
} from "./blocks";
import { LINK_FIELDS } from "./link";
import { MEDIA } from "./media";
import { META } from "./meta";

export const TESTS = `
  query Tests {
    Tests(limit: 300) {
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

export const TEST = `
  query Test($slug: String ) {
    Tests(where: { AND: [{ slug: { equals: $slug }}] }) {
      docs {
        id
        title
        subheading
        slug
        richText
        ${MEDIA}
        layout {
          ${FAQBLOCK}
          ${VIDEOBLOCK}
          ${NEWSLETTERBLOCK}
          ${CONTENTBLOCK}
          ${TESTIMONIALBLOCK}
          ${SLIDERSPLITBLOCK}
          ${ACCREDITATIONBLOCK}
          ${GETINTOUCHBLOCK}
          ${ARCHIVE_BLOCK}
          ${COMPARISON_BLOCK}
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
