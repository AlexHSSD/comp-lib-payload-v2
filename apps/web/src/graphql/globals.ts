import { LINK_FIELDS, LINK_GROUP } from "./link";
import { MEDIA } from "./media";

export const GLOBALS = `
  query {
    Header {
      navItems {
        link ${LINK_FIELDS()}
        subNavItems {
          link ${LINK_FIELDS()}
        }
      }
    }

    Footer {
      navItems {
        link ${LINK_FIELDS()}
      }
    }
  }
`;
