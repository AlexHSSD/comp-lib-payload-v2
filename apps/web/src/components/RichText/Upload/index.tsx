import React, { Fragment } from "react";
import { Media as MediaType } from "payload-types";

import { CMSLink, CMSLinkType } from "@/components/Link";
import { Media } from "@/components/Media";

import { twMerge } from "tailwind-merge";

export type RichTextUploadNodeType = {
  fields: {
    link?: CMSLinkType;
    enableLink?: boolean;
    alignment?: String;
    width?: Number;
  };
  value?: MediaType;
  relationTo: string;
};

export type Props = {
  node: any;
  className?: string;
};

export const RichTextUpload: React.FC<Props> = (props) => {
  const {
    node: { fields, value },
    className,
  } = props;

  let Wrap: React.ComponentType<CMSLinkType> | typeof Fragment;

  const styles: React.CSSProperties = {
    width: fields?.width ? `${fields?.width}px` : "",
  };

  let wrapProps: CMSLinkType = {};

  if (fields?.enableLink) {
    Wrap = CMSLink;
    wrapProps = {
      ...fields?.link,
    };
  } else {
    Wrap = Fragment;
  }

  const alignClassOptions = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    none: "",
  };
  const alignClass = alignClassOptions[fields?.alignment || "none"] || "";
  const classes = twMerge(["max-w-full", className, alignClass]);
  return (
    <div style={styles} className={classes}>
      <Wrap {...wrapProps}>
        <Media resource={value as MediaType} />
      </Wrap>
    </div>
  );
};

export default RichTextUpload;
