import React from "react";
import { Page } from "payload-types";
import { buttonClasses } from "@/components/Button/buttonClasses";
import { Media } from "@/components/Media";
import Image from "next/image";
import { CMSLink } from "@/components/Link";

type Props = Extract<Page["layout"][0], { blockType: "threeColProductBlock" }>;

export const ThreeColProductBlock = (props: Props) => {
  const { threeColProductBlockFields } = props;
  if (!threeColProductBlockFields) return null;

  let functionName = "ThreeColProductBlock";

  const { intro, text, products, links, bgIcon } = threeColProductBlockFields;

  return (
    <section id={functionName} className={`relative pt-8 pb-8 my-8 lg:my-16`}>
      <div className="absolute left-0 z-10 w-6/12 transform -translate-y-1/2 top-40 md:w-3/12">
        <span className="pt-[61.6667%] block"></span>
        <Image
          alt="CMX hex overlay"
          src="/images/svg/product-grid-before.svg"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="container">
        <h2 className="mb-8 text-2xl text-center">{intro}</h2>
        <div className="max-w-xl mx-auto my-8 text-center">
          <p>{text}</p>
        </div>
        {products && (
          <div className="grid grid-cols-2 gap-2 mt-8 lg:grid-cols-3 lg:gap-4 lg:mt-16">
            {products.map(({ id, title, media }) => {
              return (
                <div className="col" key={id}>
                  <div className="relative w-full pb-product">
                    {media && typeof media !== "string" && (
                      <Media
                        resource={media}
                        sizes="100vw"
                        priority={true}
                        fill={true}
                        imgClassName="object-cover"
                      />
                    )}
                  </div>
                  <p className="p-2 text-base lg:p-8">{title}</p>
                </div>
              );
            })}
          </div>
        )}
        {links && (
          <div className="flex justify-center mt-12 space-x-4">
            {links.map(({ link }, index) => (
              <CMSLink {...link} key={index} />
            ))}
          </div>
        )}
        <div className="absolute right-0 z-10 w-6/12 transform translate-y-1/2 bottom-40 md:w-3/12">
          <span className="pt-[53%] block"></span>
          <Image
            alt="CMX hex overlay"
            src="/images/svg/product-grid-after.svg"
            fill={true}
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};
