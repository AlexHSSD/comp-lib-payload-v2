import React from "react";
import ReactSelect from "react-select";
import { SelectField } from "@payloadcms/plugin-form-builder/types";
import {
  Controller,
  Control,
  FieldValues,
  FieldErrorsImpl,
} from "react-hook-form";
import Error from "../Error";

import classes from "./index.module.scss";

export const Select: React.FC<
  SelectField & {
    control: Control<FieldValues, any>;
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
  }
> = ({ name, label, width, options, control, required, errors }) => {
  return (
    <div className="w-full">
      <label htmlFor="name" className="block px-2 mb-2 text-xs">
        {label}
      </label>
      <Controller
        control={control}
        rules={{ required }}
        name={name}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <ReactSelect
            instanceId={name}
            options={options}
            value={options.find((s) => s.value === value)}
            onChange={(val) => onChange(val.value)}
            className={classes.reactSelect}
            classNamePrefix="rs"
          />
        )}
      />
      {required && errors[name] && <Error showError={true} />}
    </div>
  );
};
