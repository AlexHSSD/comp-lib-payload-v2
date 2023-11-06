import React from "react";
import { Footer as FooterType } from "payload-types";

import { CMSLink } from "../Link";

export const Footer: React.FC<{ footer: FooterType }> = ({ footer }) => {
  const { navItems } = footer;

  return (
    <footer className="relative">
      <div className="container">
        <div className="w-full py-8 text-center text-small md:flex md:flex-wrap md:items-center md:justify-between">
          {navItems && (
            <ul className="flex flex-wrap items-center justify-center space-x-2 md:space-x-4">
              {navItems.map(({ link }, key) => {
                return (
                  <li
                    key={key}
                    className="mb-2 transition-all duration-300 hover:opacity-50 active:scale-95"
                  >
                    <CMSLink {...link} />
                  </li>
                );
              })}
            </ul>
          )}
          <div className="mt-4 md:mt-0">
            Copyright ©&nbsp;{new Date().getFullYear()} SureScreen Diagnostics
            Ltd
          </div>
        </div>
      </div>
    </footer>
  );
};
