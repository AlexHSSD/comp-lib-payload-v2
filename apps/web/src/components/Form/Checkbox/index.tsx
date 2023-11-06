import React, { useState } from "react";
import { CheckboxField } from "@payloadcms/plugin-form-builder/types";
import { UseFormRegister, FieldErrorsImpl, FieldValues } from "react-hook-form";
import { CheckIcon } from "@/components/icons/CheckIcon";
import Error from "../Error";
import { twMerge } from "tailwind-merge";

export const Checkbox: React.FC<
  CheckboxField & {
    register: UseFormRegister<FieldValues & any>;
    setValue: any;
    getValues: any;
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
  }
> = (props) => {
  const {
    name,
    label,
    register,
    setValue,
    getValues,
    required: requiredFromProps,
    errors,
  } = props;
  const [checked, setChecked] = useState(false);
  const isCheckboxChecked = getValues(name);

  return (
    <div className={[twMerge(["relative mb-4"])].filter(Boolean).join(" ")}>
      <div className="flex items-center">
        <input
          type="checkbox"
          className="absolute top-0 left-0 opacity-0"
          {...register(name, { required: requiredFromProps })}
        />
        <button
          type="button"
          className={`relative group outline-none border mr-4 border-solid border-brown border-opacity-20 appearance-none font-normal text-center rounded-btn cursor-pointer text-[0.813rem] justify-center flex items-center w-6 h-6 leading-3 bg-none text-grey-400`}
          onClick={() => {
            setValue(name, !isCheckboxChecked);
            setChecked(!checked);
          }}
        >
          <span className="p-0 leading-[0] relative w-6 h-6 mb-0 text-brown">
            <CheckIcon
              className={`mx-auto ${
                checked ? "opacity-100" : "opacity-0 group-hover:opacity-20"
              }`}
            />
          </span>
        </button>
        <span className="block">{label}</span>
      </div>
      {requiredFromProps && errors[name] && checked === false && (
        <Error showError={true} />
      )}
    </div>
  );
};
