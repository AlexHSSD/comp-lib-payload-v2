import { Page } from "payload-types";
import { Media } from "@/components/Media";

type PageProps = Extract<Page["layout"][0], { blockType: "contentBlock" }>;
type Props = Extract<
  PageProps["contentBlockFields"]["leftLayout"][0],
  { blockType: "mediaBlock" }
>;

const MediaBlock: React.FC<Props> = ({
  mediaBlockFields: { media, shadow, shadowPosition },
}) => {
  return (
    <div className="order-1 w-full md:order-none">
      {shadow === "yes" && (
        <div
          className={`absolute hidden md:block bg-brandLightGrey rounded-b-[99px] h-full top-0 aspect-square ${
            shadowPosition === "right"
              ? "right-0 translate-x-1/2"
              : "left-0 -translate-x-1/2"
          }`}
        ></div>
      )}
      <div className="relative w-full h-full">
        {media && typeof media !== "string" && (
          <Media
            resource={media}
            sizes=""
            imgClassName="rounded-2xl w-full object-cover object-center"
          />
        )}
      </div>
    </div>
  );
};

export default MediaBlock;
