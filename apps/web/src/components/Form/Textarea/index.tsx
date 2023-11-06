import React from "react";
import { TextField } from "@payloadcms/plugin-form-builder/types";
import { UseFormRegister, FieldValues, FieldErrorsImpl } from "react-hook-form";
import Error from "../Error";

import classes from "./index.module.scss";

export const Textarea: React.FC<
  TextField & {
    placeholder?: string;
    register: UseFormRegister<FieldValues & any>;
    rows?: number;
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
  }
> = ({
  name,
  label,
  width,
  rows = 3,
  register,
  required: requiredFromProps,
  errors,
  placeholder,
}) => {
  return (
    <div className="relative">
      <label htmlFor="name" className="block px-2 mb-2 text-xs">
        {label}
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-2 py-4 mb-2 text-sm bg-opacity-50 appearance-none resize-none leading-wider bg-grey-100 ${
          requiredFromProps && errors[name]
            ? "border-red-400"
            : "border-grey-400"
        }`}
        {...register(name, { required: requiredFromProps })}
      />
      {requiredFromProps && errors[name] && <Error showError={true} />}
    </div>
  );
};
