import React from "react";

import { IconProps } from "./types";
import { twMerge } from "tailwind-merge";

export const CheckIcon: React.FC<IconProps> = (props) => {
  const { className, bold } = props;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 14 11"
      className={[
        twMerge([
          "vector-non-scaling w-3 overflow-visible transition-all will-change-transform",
          className,
        ]),
      ]
        .filter(Boolean)
        .join(" ")}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={`${bold ? "stroke-2" : "stroke-1"} fill-none stroke-current`}
        d="M2.24023 5.72L5.04023 9.08L12.3202 1.8"
      />
    </svg>
  );
};
