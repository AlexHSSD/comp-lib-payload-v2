import { RICHTEXTBLOCK } from "./blocks";
import { LINK_FIELDS } from "./link";
import { MEDIA } from "./media";
import { META } from "./meta";

export const BLOGS = `
  query Blogs {
    Blogs(limit: 300) {
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

export const BLOG = `
  query Blog($slug: String ) {
    Blogs(where: { AND: [{ slug: { equals: $slug }}] }) {
      docs {
        id
        title
        subheading
        slug
        richText
        ${MEDIA}
        layout {
          ${RICHTEXTBLOCK}
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
