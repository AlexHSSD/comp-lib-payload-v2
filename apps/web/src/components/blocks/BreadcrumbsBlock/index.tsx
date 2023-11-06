import React from "react";
import { Page } from "payload-types";
import { blockNum } from "@/components/Blocks";
import Link from "next/link";

export type BreadcrumbsBlockProps = Extract<
  Page["layout"][0],
  { blockType: "breadcrumbsBlock" }
>;

type breadcrumbProps = {
  breadcrumbs: Page["breadcrumbs"];
};

export const BreadcrumbsBlock: React.FC<
  BreadcrumbsBlockProps & breadcrumbProps & blockNum
> = (props) => {
  const { blockNum, blockName = "BreadcrumbsBlock", breadcrumbs } = props;
  if (!breadcrumbs) return null;

  const count = breadcrumbs.length - 1;
  return (
    <section id={blockName} className="py-4">
      <div className="container">
        <nav className="w-full rounded-md">
          <ol className="list-reset flex justify-center lg:justify-start">
            {breadcrumbs &&
              breadcrumbs.map((breadcrumb, index) => (
                <React.Fragment key={index}>
                  {index < count ? (
                    <li className="flex items-center" key={index}>
                      <Link
                        href={breadcrumb.url}
                        className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                      >
                        {breadcrumb.label}
                      </Link>
                      <span className="mx-2 text-neutral-500 dark:text-neutral-400">
                        <svg
                          id="Icon_ionic-ios-arrow-dropright"
                          data-name="Icon ionic-ios-arrow-dropright"
                          xmlns="http://www.w3.org/2000/svg"
                          width="9.424"
                          height="16.026"
                          viewBox="0 0 9.424 16.026"
                        >
                          <path
                            id="Path_17599"
                            data-name="Path 17599"
                            d="M14.815,10.378a1.362,1.362,0,0,1,1.92,0l6.708,6.729a1.356,1.356,0,0,1,.042,1.87l-6.609,6.63a1.355,1.355,0,1,1-1.92-1.912l5.618-5.7-5.759-5.7A1.341,1.341,0,0,1,14.815,10.378Z"
                            transform="translate(-14.414 -9.983)"
                            fill="#000"
                          />
                        </svg>
                      </span>
                    </li>
                  ) : (
                    <li className="text-neutral-500 dark:text-neutral-400">
                      {breadcrumb.label}
                    </li>
                  )}
                </React.Fragment>
              ))}
          </ol>
        </nav>
      </div>
    </section>
  );
};
