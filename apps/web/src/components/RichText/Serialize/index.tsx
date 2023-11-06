import React, { Fragment } from "react";
import escapeHTML from "escape-html";

import { CMSLink, Reference } from "@/components/Link";
import { RichTextUpload } from "../Upload";

type Node = {
  type: string;
  value?: {
    url: string;
    alt: string;
  };
  children?: Node[];
  url?: string;
  [key: string]: unknown;
  newTab?: boolean;
};

export type CustomRenderers = {
  [key: string]: (args: {
    node: Node;
    Serialize: SerializeFunction;
    index;
  }) => JSX.Element; // eslint-disable-line
};

type SerializeFunction = React.FC<{
  content?: Node[];
  customRenderers?: CustomRenderers;
}>;

const isText = (value: any): boolean =>
  typeof value === "object" && value !== null && typeof value.text === "string";

export const Serialize: SerializeFunction = ({ content, customRenderers }) => {
  return (
    <Fragment>
      {content?.map((node, i) => {
        if (isText(node)) {
          let text = (
            <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
          );

          if (node.bold) {
            text = <strong key={i}>{text}</strong>;
          }

          if (node.code) {
            text = <code key={i}>{text}</code>;
          }

          if (node.italic) {
            text = <em key={i}>{text}</em>;
          }

          if (node.underline) {
            text = (
              <span className="underline" key={i}>
                {text}
              </span>
            );
          }

          if (node.strikethrough) {
            text = (
              <span style={{ textDecoration: "line-through" }} key={i}>
                {text}
              </span>
            );
          }
          if (node.text === "") {
            return null;
          }
          return <Fragment key={i}>{text}</Fragment>;
        }

        if (!node) {
          return null;
        }

        if (
          customRenderers &&
          customRenderers[node.type] &&
          typeof customRenderers[node.type] === "function"
        ) {
          return customRenderers[node.type]({ node, Serialize, index: i });
        }

        switch (node.type) {
          case "br":
            return <br key={i} />;
          case "h1":
            return (
              <h1 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h1>
            );
          case "h2":
            return (
              <h2 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h2>
            );
          case "h3":
            return (
              <h3 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h3>
            );
          case "h4":
            return (
              <h4 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h4>
            );
          case "h5":
            return (
              <h5 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h5>
            );
          case "h6":
            return (
              <h6 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h6>
            );
          case "quote":
            return (
              <blockquote key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </ol>
            );
          case "li":
            return (
              <li key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </li>
            );
          case "link":
            return (
              <CMSLink
                key={i}
                type={node.linkType === "internal" ? "reference" : "custom"}
                url={node.url}
                reference={node.doc as Reference}
                newTab={node?.newTab}
              >
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </CMSLink>
            );

          case "upload": {
            return <RichTextUpload key={i} node={node} />;
          }

          case "label":
            return (
              <p className="text-lg uppercase lg:text-xl" key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </p>
            );

          case "large-body":
            return (
              <p className="text-lg lg:text-xl" key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </p>
            );

          default:
            return (
              <p key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </p>
            );
        }
      })}
    </Fragment>
  );
};
