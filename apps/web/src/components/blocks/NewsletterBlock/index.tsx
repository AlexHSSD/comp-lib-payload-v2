"use client";
import React, { useState } from "react";
import { Page } from "payload-types";
import { RichText } from "@/components/RichText";
import { blockNum } from "@/components/Blocks";
import { CMSLink } from "@/components/Link";
import { Media } from "@/components/Media";

export type NewsletterBlockProps = Extract<
  Page["layout"][0],
  { blockType: "newsletterBlock" }
>;

export const NewsletterBlock: React.FC<NewsletterBlockProps & blockNum> = ({
  blockNum,
  newsletterBlockFields: { title, richText },
  blockName = "NewsletterBlock",
}) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [consent, setConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const subscribe = async (e) => {
    e.preventDefault();
    setState("Loading");
    let response;
    try {
      let url = "/api/subscribe/?email=" + email;
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      response = await fetch(url, options);
    } catch (e) {
      console.log("There was an error: ", e);
      setErrorMsg("Error submitting form, please try again later.");
      setState("Error");
    }
    if (response?.ok) {
      setState("Success");
      setEmail("");
    } else {
      console.log(`HTTP Response Code: ${response?.status}`);
      setErrorMsg("Error submitting form, please try again later.");
      setState("Error");
    }
  };

  return (
    <section id={blockName} className="bg-brandTeal text-white px-10 py-16">
      <div className="container">
        <h2 className="text-center mb-4 font-bold">
          {title ? title : "Join our newsletter"}
        </h2>
        <div className="container lg:px-40">
          <RichText
            content={richText}
            className={"text-center lg:px-20 text-sm mb-8"}
          />
        </div>

        <form
          onSubmit={subscribe}
          className="flex flex-row flex-wrap items-center gap-4 max-w-2xl px-4 mx-auto"
        >
          <div className="flex gap-4 flex-wrap justify-center md:flex-nowrap w-full">
            <input
              required
              id="email-input"
              name="email"
              type="email"
              placeholder="Email Address"
              value={email}
              className="bg-white w-full placeholder:text-gray-500 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block pl-4 p-2 !mb-0 rounded-3xl"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className={`px-5 py-1 text-sm disabled:opacity-20 font-bold text-center text-white hover:text-black bg-transparent border-2 rounded-3xl cursor-pointer hover:bg-white focus:ring-4 focus:ring-blue-300 ${
                state === "Error" ? "border-brandRed" : "border-white"
              }`}
              onClick={subscribe}
              disabled={
                ["Loading", "Success", "Error"].includes(state) || !consent
              }
            >
              {state === "Loading" ? "Loading" : "Submit"}
            </button>
          </div>
          <label className="text-xs text-black flex gap-2">
            <input
              className="w-4 h-4 text-blue-600 bg-white border-white border-0 rounded-none focus:ring-white/50 focus:ring-2"
              name="consent"
              type="checkbox"
              onChange={(e) => setConsent(!consent)}
              checked={consent}
            />
            I consent to allow my personal information to be held and processed
          </label>
          <div className="w-full text-small">
            {state === "Error" && (
              <span className="text-white font-bold">{errorMsg}</span>
            )}
            {state === "Success" && <div>Success, you&apos;ve subscribed!</div>}
          </div>
        </form>
      </div>
    </section>
  );
};
