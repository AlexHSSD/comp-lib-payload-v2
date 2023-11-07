import type {
  Footer,
  Header,
  Page,
  Test,
  Blog,
} from "../../../../packages/payload-types/payload-types";
import { GLOBALS } from "@/graphql/globals";
import { PAGE, PAGES } from "@/graphql/pages";
import { TEST, TESTS } from "@/graphql/tests";

const REVALIDATE_TIME = 3600;

export const fetchGlobals = async (): Promise<{
  header: Header;
  footer: Footer;
}> => {
  const { data } = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?globals`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["globals"],
      },
      body: JSON.stringify({
        query: GLOBALS,
      }),
    }
  ).then((res) => res.json());

  return {
    header: data?.Header,
    footer: data?.Footer,
  };
};

export const fetchPages = async (): Promise<
  Array<{ breadcrumbs: Page["breadcrumbs"]; slug: string }>
> => {
  const { data, errors } = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?pages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: PAGES,
      }),
      next: {
        tags: ["pages"],
      },
    }
  ).then((res) => res.json());

  if (errors) {
    console.error(JSON.stringify(errors)); // eslint-disable-line no-console
    throw new Error();
  }

  return data.Pages.docs;
};

export const fetchPage = async (
  incomingSlugSegments?: string[]
): Promise<Page | null> => {
  const slugSegments = incomingSlugSegments || ["home"];
  const slug = slugSegments.at(-1);
  const { data, errors } = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?page=${slug}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["pages"],
      },
      body: JSON.stringify({
        query: PAGE,
        variables: {
          slug,
        },
      }),
    }
  ).then((res) => {
    return res.json();
  });

  if (errors) {
    console.error(JSON.stringify(errors)); // eslint-disable-line no-console
    throw new Error();
  }

  const pagePath = `/${slugSegments.join("/")}`;
  const page = data.Pages?.docs.find(
    ({ slug: pageSlug, breadcrumbs }: Page) => {
      if (!breadcrumbs || !breadcrumbs.length) return pageSlug === slug;
      const { url } = breadcrumbs[breadcrumbs.length - 1];
      return url === pagePath;
    }
  );

  if (page) {
    return page;
  }

  return null;
};

export const fetchTests = async (): Promise<
  Array<{ breadcrumbs: Test["breadcrumbs"]; slug: string }>
> => {
  const { data, errors } = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?tests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: TESTS,
      }),
      next: {
        tags: ["all", "tests"],
      },
    }
  ).then((res) => res.json());

  if (errors) {
    console.error(JSON.stringify(errors)); // eslint-disable-line no-console
    throw new Error();
  }
  return data.Tests.docs;
};

export const fetchTest = async (
  incomingSlugSegments?: string[]
): Promise<Test | null> => {
  const slugSegments = incomingSlugSegments || [""];
  const slug = slugSegments.at(-1);
  if (!slug) {
    return null;
  }
  const { data, errors } = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?test=${slug}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["all", "tests"],
      },
      body: JSON.stringify({
        query: TEST,
        variables: {
          slug,
        },
      }),
    }
  ).then((res) => {
    return res.json();
  });

  if (errors) {
    console.error(JSON.stringify(errors)); // eslint-disable-line no-console
    throw new Error();
  }

  const testPath = `/${slugSegments.join("/")}`;
  const test = data.Tests?.docs.find(
    ({ slug: testSlug, breadcrumbs }: Test) => {
      if (
        !breadcrumbs ||
        !breadcrumbs.length ||
        breadcrumbs.filter((b) => b.url).length > 0
      )
        return testSlug === slug;
      const { url } = breadcrumbs[breadcrumbs.length - 1];
      return url === testPath;
    }
  );

  if (test) {
    return test;
  }

  return null;
};
