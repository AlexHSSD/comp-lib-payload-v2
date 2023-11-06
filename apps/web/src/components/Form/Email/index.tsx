import React from "react";
import { EmailField } from "@payloadcms/plugin-form-builder/types";
import { UseFormRegister, FieldValues, FieldErrorsImpl } from "react-hook-form";
import Error from "../Error";

export const Email: React.FC<
  EmailField & {
    register: UseFormRegister<FieldValues & any>;
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
  }
> = ({ name, width, label, register, required: requiredFromProps, errors }) => {
  return (
    <div className="relative">
      <label htmlFor="name" className="block px-2 mb-2 text-xs">
        {label}
      </label>
      <input
        type="text"
        placeholder="Email"
        className={`mb-2 w-full px-2 ${
          requiredFromProps && errors[name]
            ? "border-red-400"
            : "border-grey-400"
        }`}
        {...register(name, {
          required: requiredFromProps,
          pattern: /^\S+@\S+$/i,
        })}
      />
      {requiredFromProps && errors[name] && <Error showError={true} />}
    </div>
  );
};
