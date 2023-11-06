import React from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { CMSLink } from "@/components/Link";
import { Classnames } from "react-alice-carousel";
import { Video } from "@/components/Media/Video";
import youtube_parser from "@/utilities/youtube_parser";

export type VideoBlockProps = Extract<
  Page["layout"][0],
  { blockType: "videoBlock" }
>;

export const VideoBlock: React.FC<VideoBlockProps & blockNum> = ({
  blockNum,
  videoBlockFields: { title, embed, richText },
  blockName = "VideoBlock",
}) => {
  const video_id = youtube_parser(embed);
  const url = `https://img.youtube.com/vi/${video_id}/hqdefault.jpg`;

  return (
    <section id={blockName} className="container mb-10">
      <div className="container">
        {title && <h3 className="my-8 text-center">{title}</h3>}
        {richText && (
          <RichText
            content={richText}
            className={"mb-10 text-center lg:px-40"}
          />
        )}
        {embed && (
          <div className="relative aspect-video max-w-screen-lg mx-auto">
            <iframe
              className="before:bg-neutral-100 rounded-2xl aspect-video w-full"
              src={embed}
              srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=${embed} ><img src=${url} alt='${title}'><span>▶</span></a>`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title}
              loading="lazy"
            ></iframe>
          </div>
        )}
      </div>
    </section>
  );
};
