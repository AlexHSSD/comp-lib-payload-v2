"use client";
import React from "react";
import Link from "next/link";

import { Page, Test, Blog } from "payload-types";
import { buttonClasses } from "../Button/buttonClasses";

type PageReference = {
  value: string | Page;
  relationTo: "pages";
};

type TestReference = {
  value: string | Test;
  relationTo: "tests";
};

type BlogReference = {
  value: string | Blog;
  relationTo: "blogs";
};

export type LinkType = "reference" | "custom";
export type Reference = PageReference;

export type CMSLinkType = {
  type?: LinkType;
  url?: string;
  newTab?: boolean;
  reference?: Reference;
  label?: string;
  appearance?: string;
  children?: React.ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
};

type GenerateSlugType = {
  type?: LinkType;
  url?: string;
  reference?: Reference;
};
const generateHref = (args: GenerateSlugType): string => {
  const { reference, url, type } = args;

  if ((type === "custom" || type === undefined) && url) {
    return url;
  }

  if (
    type === "reference" &&
    reference?.value &&
    typeof reference.value !== "string"
  ) {
    if (reference.relationTo === "pages") {
      const value = reference.value as Page;
      const breadcrumbs = value?.breadcrumbs;
      const hasBreadcrumbs =
        breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;
      if (hasBreadcrumbs) {
        return breadcrumbs[breadcrumbs.length - 1]?.url as string;
      } else {
        return `/${reference.value.slug}`;
      }
    }

    if (reference.relationTo === "tests") {
      const value = reference.value as Test;
      const breadcrumbs = value?.breadcrumbs;
      const hasBreadcrumbs =
        breadcrumbs &&
        Array.isArray(breadcrumbs) &&
        breadcrumbs.length > 0 &&
        breadcrumbs.filter((b) => b.url).length > 0;
      if (hasBreadcrumbs) {
        return `/${reference.relationTo}/${
          breadcrumbs[breadcrumbs.length - 1]?.url
        }` as string;
      }
    }

    if (reference.relationTo === "blogs") {
      const value = reference.value as Blog;
      const breadcrumbs = value?.breadcrumbs;
      const hasBreadcrumbs =
        breadcrumbs &&
        Array.isArray(breadcrumbs) &&
        breadcrumbs.length > 0 &&
        breadcrumbs.filter((b) => b.url).length > 0;
      if (hasBreadcrumbs) {
        return `/${reference.relationTo}/${
          breadcrumbs[breadcrumbs.length - 1]?.url
        }` as string;
      }
    }

    return `/${reference.relationTo}/${reference.value.slug}`;
  }

  return "";
};

export const CMSLink: React.FC<CMSLinkType> = ({
  type,
  url,
  newTab,
  reference,
  label,
  appearance,
  children,
  onMouseEnter,
  onMouseLeave,
  className = "",
  onClick,
}) => {
  let href = generateHref({ type, url, reference });
  const hrefIsLocal = ["tel:", "mailto:", "/", "#"].some((prefix) =>
    href.startsWith(prefix)
  );

  if (!hrefIsLocal) {
    try {
      const objectURL = new URL(href);
      if (objectURL.origin === process.env.NEXT_PUBLIC_CMS_URL) {
        href = objectURL.href.replace(process.env.NEXT_PUBLIC_CMS_URL, "");
      }
    } catch (e) {
      console.error(`Failed to format url: ${href}`, e); // eslint-disable-line no-console
    }
  }

  const newTabProps = newTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  if (href.indexOf("/") === 0) {
    return (
      <Link
        href={href !== "/home" ? href : "/"}
        {...newTabProps}
        className={
          appearance ? buttonClasses(appearance, [className]) : className
        }
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        prefetch={false}
        onClick={onClick}
      >
        {label && label}
        {children && <>{children}</>}
      </Link>
    );
  }

  if (href.indexOf("#") === 0) {
    // let's make a function that receive the specific element_id as string and scroll into that element_id
    const scrolltoHash = function (
      e: React.MouseEvent<HTMLElement>,
      element_id: string
    ) {
      const element = document.getElementById(element_id);
      if (element) {
        element?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        e.preventDefault();
      }
    };

    return (
      <a
        href={href}
        onClick={(e) => scrolltoHash(e, href.substring(1))}
        target="_self"
        className={className}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {label && label}
        {children && <>{children}</>}
      </a>
    );
  }
  return (
    <Link
      href={url}
      {...newTabProps}
      className={
        appearance ? buttonClasses(appearance, [className]) : className
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      prefetch={false}
    >
      {label && label}
      {children && <>{children}</>}
    </Link>
  );
};
