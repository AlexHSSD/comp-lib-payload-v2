"use client";

import * as React from "react";
import { CMSForm } from "@/components/Form";
import { RichText } from "@/components/RichText";
import { Page } from "payload-types";

export type ContactBlockProps = Extract<
  Page["layout"][0],
  { blockType: "contactBlock" }
>;

export const ContactBlock: React.FC<ContactBlockProps> = (props) => {
  const {
    formFields: { introContent: formIntroContent, form, title },
    contactFields: { introContent: contactIntroContent, contactMethods },
  } = props;

  if (typeof form === "string") return null;

  let functionName = "ContactBlock";

  return (
    <section
      id={functionName}
      className="relative pt-16 pb-8 text-white bg-brandGrey"
    >
      <div className="container max-w-screen-md">
        <div className="flex flex-wrap justify-between">
          <div className="w-full">
            <div className="container w-full max-w-5xl px-4 mb-4 space-y-4">
              {title && <h2 className="text-center ">{title}</h2>}
              {formIntroContent && (
                <RichText
                  content={formIntroContent}
                  className="space-y-0 text-center"
                />
              )}
            </div>
            <CMSForm form={form} />
          </div>
        </div>
      </div>
    </section>
  );
};
