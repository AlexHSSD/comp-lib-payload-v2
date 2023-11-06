import { Media as MediaType } from "payload-types";
import { RichText } from "../RichText";
import { Media } from "../Media";
import Link from "next/link";

type BlogDetailsProps = {
  title: string;
  subheading: string;
  richText?: {
    [k: string]: unknown;
  }[];
  featuredImage: string | MediaType;
};
const BlogDetails: React.FC<BlogDetailsProps> = ({
  title,
  subheading,
  richText,
  featuredImage,
}) => (
  <>
    <section className="">
      <div className={`relative pt-24 pb-4`}>
        <div className="container"></div>
      </div>
    </section>

    <section id="Blog Details" className="py-4">
      <div className="container">
        <nav className="w-full rounded-md">
          <ol className="flex justify-center list-reset lg:justify-start">
            <li className="flex items-center">
              <Link
                href="/blogs"
                className="transition duration-150 ease-in-out text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Blogs
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-neutral-500 dark:text-neutral-400">
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
                    fill="#000"
                  />
                </svg>
              </span>
            </li>
            <li className="text-neutral-500 dark:text-neutral-400">{title}</li>
          </ol>
        </nav>
      </div>
    </section>

    <section className="relative py-4 overflow-hidden md:py-8">
      <div className="absolute top-0 w-full h-full -z-10">
        <div
          className={`relative w-full h-full before:bg-white before:bg-opacity-50 before:z-10 before:absolute before:w-full before:h-full md:before:hidden`}
        >
          {featuredImage && typeof featuredImage !== "string" && (
            <Media
              resource={featuredImage}
              priority={true}
              sizes="100vw"
              fill={true}
              imgClassName={`absolute bottom-0 object-cover`}
            />
          )}
        </div>
      </div>
      <div className={`min-h-[600px relative py-24 container flex flex-col`}>
        {title && <h1 className={`font-medium md:text-4xl`}>{title}</h1>}
        {subheading && (
          <h3 className={`font-medium md:text-4xl`}>{subheading}</h3>
        )}
        {richText && (
          <RichText
            content={richText}
            className={"mb-4 space-y-4 prose-sm lg:prose-lg"}
          />
        )}
      </div>
    </section>
  </>
);

export default BlogDetails;
