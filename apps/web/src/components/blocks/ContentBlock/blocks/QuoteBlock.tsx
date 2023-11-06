import { Page } from "payload-types";
import { Media } from "@/components/Media";
import { RichText } from "@/components/RichText";

type PageProps = Extract<Page["layout"][0], { blockType: "contentBlock" }>;
type Props = Extract<
  PageProps["contentBlockFields"]["leftLayout"][0],
  { blockType: "quoteBlock" }
>;

const QuoteBlock: React.FC<Props> = ({
  quoteBlockFields: { author, byline, richText, color, media },
}) => {
  return (
    <div className="relative order-2 w-full md:order-none">
      <div className="relative w-full h-full p-6 text-center text-white bg-brandGrey rounded-2xl">
        <div className="absolute top-6 left-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 md:w-8 lg:w-12"
            viewBox="0 0 51.479 43"
          >
            <path
              id="Icon_ionic-md-quote"
              data-name="Icon ionic-md-quote"
              d="M51.707,6.75H41.347l-6.84,12.981V49.75h21.5V19.731H45.647Zm-30.1,0H11.247L4.528,19.731V49.75H25.907V19.731H14.888Z"
              transform="translate(-4.528 -6.75)"
              fill="#7bb69d"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center h-full gap-2 py-12 space-y-2 md:py-8 lg:py-12 not-prose">
          <RichText
            content={richText}
            className={`container text-base space-y-2 sm:text-xs xl:text-base`}
          />
          <h3 className="text-xl md:text-lg lg:text-xl">{author}</h3>
          <p
            className={`text-base md:text-sm lg:text-sm ${
              color === "green" ? "text-brandGreen" : "text-brandRed"
            }`}
          >
            {byline}
          </p>
        </div>
        <div className="absolute rotate-180 bottom-6 right-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 md:w-8 lg:w-12"
            viewBox="0 0 51.479 43"
          >
            <path
              id="Icon_ionic-md-quote"
              data-name="Icon ionic-md-quote"
              d="M51.707,6.75H41.347l-6.84,12.981V49.75h21.5V19.731H45.647Zm-30.1,0H11.247L4.528,19.731V49.75H25.907V19.731H14.888Z"
              transform="translate(-4.528 -6.75)"
              fill="#7bb69d"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default QuoteBlock;
