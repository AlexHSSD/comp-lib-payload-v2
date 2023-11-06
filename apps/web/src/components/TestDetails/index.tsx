import { Media as MediaType } from "payload-types";
import { RichText } from "../RichText";
import { Media } from "../Media";
import Link from "next/link";

type TestDetailsProps = {
  title: string;
  subheading: string;
  richText?: {
    [k: string]: unknown;
  }[];
  featuredImage: string | MediaType;
};
const TestDetails: React.FC<TestDetailsProps> = ({
  title,
  subheading,
  richText,
  featuredImage,
}) => (
  <>
    <section className="" id="Test Details">
      <div className={`relative pt-24 pb-4`}>
        <div className="container">
          <h1 className="font-bold text-center text-white md:text-left">
            {title}
          </h1>
        </div>
      </div>
    </section>

    <section className="py-4">
      <div className="container">
        <nav className="w-full rounded-md">
          <ol className="flex justify-center list-reset lg:justify-start">
            <li className="flex items-center">
              <Link
                href="/tests"
                className="transition duration-150 ease-in-out text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
              >
                Tests
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
      <div className="container">
        <div className="relative flex flex-wrap items-center justify-center md:items-stretch">
          <div
            className={`flex flex-col relative w-full lg:w-hero z-20 lg:pb-0 text-left mt-12 lg:mt-24`}
          >
            <div className="container">
              <h2 className={`mb-4 text-center mx-auto lg:text-left lg:mx-0`}>
                {subheading}
              </h2>
              <div className="mx-auto lg:mx-0">
                <RichText
                  content={richText}
                  className={`mt-4 mb-8 text-base text-center lg:text-left space-y-4`}
                />
              </div>
            </div>
          </div>

          <div className="relative z-20 w-full lg:w-hero lg:pb-0 -order-1 lg:order-none">
            <div className="relative z-10 w-full h-full">
              {featuredImage && typeof featuredImage !== "string" && (
                <Media
                  resource={featuredImage}
                  sizes="100vh"
                  priority={true}
                  imgClassName="mx-auto mb-2 max-w-1/2 md:p-10"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`absolute hidden lg:block aspect-square h-full top-0 bg-brandLightGrey rounded-b-[99px] right-0 translate-x-1/4`}
      ></div>
    </section>
  </>
);

export default TestDetails;
