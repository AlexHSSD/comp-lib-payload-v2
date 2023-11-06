import * as React from "react";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLParagraphElement> {
  showError: boolean;
  message?: string | undefined;
}

const Error: React.FC<Props> = (props) => {
  const { showError, message } = props;

  if (showError) {
    return (
      <p className="mb-1 text-sm leading-5 text-red-500">
        {message || "This field is required"}
      </p>
    );
  }

  return null;
};

export default Error;
