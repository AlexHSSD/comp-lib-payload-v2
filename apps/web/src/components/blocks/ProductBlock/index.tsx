import React from "react";
import { Page } from "payload-types";
import { buttonClasses } from "@/components/Button/buttonClasses";
import { Media } from "@/components/Media";
import Image from "next/image";

type Props = Extract<Page["layout"][0], { blockType: "productBlock" }>;

export const ProductBlock = (props: Props) => {
  const { productBlockFields } = props;
  if (!productBlockFields) return null;

  let functionName = "ProductBlock";

  const { products, icon } = productBlockFields;

  return (
    <section
      id={functionName}
      className={`relative pb-4 bg-white lg:pt-0 lg:pb-24 text-brown`}
    >
      <div className="container">
        <div className="">
          {products && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                          key={id}
                        />
                      )}
                    </div>
                    <p className="mt-4 mb-0 md:mt-8">{title}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-10 w-8/12 transform translate-y-1/2 md:w-4/12">
        <span className="pt-[65%] block"></span>
        <Image
          alt="CMX hex overlay"
          src="/images/svg/white-labelling-hex-left.svg"
          fill={true}
          className={"object-cover w-full"}
        />
      </div>
    </section>
  );
};
