interface Args {
  disableLabel?: true;
  enableAppearance?: true;
}

export const LINK_FIELDS = ({
  enableAppearance,
  disableLabel,
}: Args = {}): string => `{
  ${!disableLabel ? "label" : ""}
  ${enableAppearance ? "appearance" : ""}
  type
  newTab
  url
  reference {
    relationTo
    value {
      ...on Page {
        breadcrumbs {
          url
        }
        slug
      }
      ...on Test {
        breadcrumbs {
          url
        }
        slug
      }
      ...on Blog {
        breadcrumbs {
          url
        }
        slug
      }
    }
  }
}`;

export const LINK_GROUP = ({
  enableAppearance,
  disableLabel,
}: Args = {}): string => `
  links {
    link ${LINK_FIELDS({ enableAppearance, disableLabel })}
  }
`;
