import Link from "next/link";
import Image from "next/image";
import { Page } from "payload-types";
import { twMerge } from "tailwind-merge";
import { RichText } from "@/components/RichText";
import { buttonClasses } from "@/components/Button/buttonClasses";
import { CMSLink } from "@/components/Link";

type PageProps = Extract<Page["layout"][0], { blockType: "contentBlock" }>;
type Props = Extract<
  PageProps["contentBlockFields"]["leftLayout"][0],
  { blockType: "standardBlock" }
>;

const fontSize = {
  small: "text-small",
  normal: "text-base",
  large: "text-lg",
};

const StandardBlock: React.FC<Props> = ({
  standardBlockFields: { richText, title, textPosition, textSize, links },
}) => (
  <div
    className={`flex flex-col items-start w-full p-5 z-20 relative xl:p-24 max-w-2xl mx-auto order-2 md:order-none ${
      textPosition === "center"
        ? "text-center"
        : "text-center lg:text-left mx-auto"
    }`}
  >
    {title && (
      <h2
        className={`mb-4 ${
          textPosition === "center"
            ? "text-center"
            : "text-center mx-auto md:text-left md:mx-0"
        }`}
      >
        {title}
      </h2>
    )}
    <div className="mx-auto space-y-4 md:mx-0">
      <RichText
        content={richText}
        className={`${fontSize[textSize ?? "small"]} ${
          textPosition === "center" ? "text-center" : "text-center md:text-left"
        }`}
      />
      {links && links.length > 0 && (
        <div className={`flex flex-wrap gap-4 justify-center md:justify-start`}>
          {links.map(({ link }, index) => {
            return <CMSLink {...link} key={index} />;
          })}
        </div>
      )}
    </div>
  </div>
);

export default StandardBlock;
