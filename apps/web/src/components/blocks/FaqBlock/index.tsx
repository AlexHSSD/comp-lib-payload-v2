"use client";
import React, { useState } from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";

export type FaqBlockProps = Extract<
  Page["layout"][0],
  { blockType: "faqBlock" }
>;

export const FaqBlock: React.FC<FaqBlockProps & blockNum> = ({
  blockNum,
  faqBlockFields: { title, questions },
  blockName = "FAQBlock",
}) => {
  return (
    <div className="container my-12 mx-auto md:my-24">
      <div className="flex flex-row flex-wrap items-center justify-start py-8 px-0 m-0">
        <h2 className="m-0 p-8 text-center">{title}</h2>
      </div>

      <div className="grid grid-cols-1 gap-2 md:gap-8">
        {/* Loop through each question */}
        {questions.map((question, key) => (
          <Question key={key} {...question} />
        ))}
      </div>
    </div>
  );
};

type QuestionProps = {
  question?: string;
  richText?: {
    [k: string]: unknown;
  }[];
};

const Question: React.FC<QuestionProps> = ({ question, richText }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid grid-cols-1 bg-grey-100 items-center justify-between last:mb-0">
      <h3
        className="text-five justify-between cursor-pointer w-full text-white bg-brandGrey flex items-center gap-16 p-8 font-bold"
        onClick={() => setOpen(!open)}
      >
        {question}
        <span
          className={`block transition-transform ${open ? "rotate-90" : ""}`}
        >
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
              fill="#fff"
            />
          </svg>
        </span>
      </h3>

      <div className={`p-8 ${open ? "block" : "hidden"}`}>
        {richText && (
          <RichText content={richText} className={"space-y-4 p-10"} />
        )}
      </div>
    </div>
  );
};
