import React from "react";
import { CustomRenderers, Serialize } from "./Serialize";

export const RichText: React.FC<{
  className?: string;
  content: any;
  customRenderers?: CustomRenderers;
}> = ({ className = "space-y-4", content, customRenderers }) => {
  if (!content) {
    return null;
  }

  return (
    <div className={[className].filter(Boolean).join(" ")}>
      <Serialize content={content} customRenderers={customRenderers} />
    </div>
  );
};
