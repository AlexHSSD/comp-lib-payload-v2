import React from "react";
import { MessageField } from "@payloadcms/plugin-form-builder/types";
import { RichText } from "@/components/RichText";

export const Message: React.FC<MessageField> = ({ message }) => {
  return (
    <div className="w-full">
      <RichText content={message} className="m-0 md:my-3" />
    </div>
  );
};
