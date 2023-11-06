"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header as HeaderType } from "payload-types";
import { HeaderItems } from "./HeaderItems";

let navMinBreakpoint = "899";

export const Header: React.FC<{ header: HeaderType }> = ({ header }) => {
  const [compressed, setCompressed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isDesktopWidth, setIsDesktopWidth] = useState(false);

  const headerElRef = useRef(null);

  // Returns if the screen is desktop or mobile
  function isDesktopWidthCheck() {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= Number(navMinBreakpoint.replace("px", ""));
  }

  useEffect(() => {
    // Checks how far the user has scrolled and sets compressed accordingly
    function setCompressedState() {
      setCompressed(window.pageYOffset > 250);
    }

    function checkWindowSize() {
      setIsDesktopWidth(isDesktopWidthCheck());
      setMobileNavOpen(false);
    }
    setCompressedState();
    checkWindowSize();
    // Check/set the compressed header state when the user scrolls
    window.addEventListener("scroll", () => setCompressedState());

    // When the user resizes, close the mobile menu and
    // check if the display size is still desktop
    window.addEventListener("resize", () => checkWindowSize());
    return () => {
      window.removeEventListener("scroll", () => setCompressedState());
      window.removeEventListener("resize", () => checkWindowSize());
    };
  }, []);

  return (
    <header
      className={`fixed z-40 top-0 left-0 w-full font-light text-black shadow-header ${
        compressed ? "bg-white" : "bg-white"
      } transition-all duration-200`}
      ref={headerElRef}
    >
      <div className="container mx-auto my-0 max-w-1400px px-7">
        <div className="flex flex-row flex-wrap items-stretch justify-between w-full">
          <div className="flex flex-1 ">
            <Link href="/" passHref prefetch={false} legacyBehavior>
              <a
                onClick={() => setMobileNavOpen(false)}
                className={`relative z-10 leading-0 ${
                  compressed ? "py-1" : ""
                } lg:hover:opacity-50 transition-opacity`}
              >
                <Image
                  src="/images/svg/logo.svg"
                  width={compressed ? "80" : "100"}
                  height={compressed ? "60" : "80"}
                  alt="Comp Library"
                  className="transition-all p-5"
                />
              </a>
            </Link>{" "}
            {/* Logo */}
          </div>

          <div
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="relative z-10 inline-flex flex-wrap items-center self-center w-6 h-6 ml-auto cursor-pointer nav:hidden"
          >
            {[
              `block w-6 h-[2px] mb-[6px] mt-auto ${
                mobileNavOpen ? "bg-black" : "bg-green-400"
              } ${
                mobileNavOpen ? "delay-300" : "delay-100"
              } transition ease-in-out duration-500`,
              `block w-6 h-[2px] mb-[6px] ${
                mobileNavOpen ? "bg-black" : "bg-green-300"
              } ${
                mobileNavOpen ? "delay-200" : "delay-200"
              } transition ease-in-out duration-500`,
              `block w-6 h-[2px] mb-auto ${
                mobileNavOpen ? "bg-black" : "bg-green-100"
              } ${
                mobileNavOpen ? "delay-100" : "delay-300"
              } transition ease-in-out duration-500`,
            ].map((classes, key) => (
              <span className={classes} key={key} />
            ))}
          </div>

          <nav
            className={`mob:fixed mob:top-0 mob:left-0 mob:w-full mob:h-full mob:pt-40 mob:px-8 mob:mb-12 mob:after:-z-10 mob:after:w-[200%] mob:after:h-[200%] mob:after:top-0 mob:after:left-0  mob:after:fixed mob:after:bg-white nav:flex-[2] transition-opacity ${
              mobileNavOpen || isDesktopWidth
                ? "opacity-100 pointer-events-auto duration-100"
                : "opacity-0 pointer-events-none duration-250"
            }`}
          >
            <div className="mob:overflow-auto mob:fixed mob:top-32 mob:left-10 mob:right-10 mob:bottom-8 mob:min-h-[calc(100%-175px)] nav:flex nav:items-stretch nav:h-full nav:space-x-8">
              <HeaderItems
                navItems={header?.navItems}
                setMobileNavOpen={setMobileNavOpen}
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
