import React from "react";
import ReactSelect from "react-select";
import { StateField } from "@payloadcms/plugin-form-builder/types";
import {
  Controller,
  Control,
  FieldValues,
  FieldErrorsImpl,
} from "react-hook-form";
import { stateOptions } from "./options";
import Error from "../Error";

import classes from "./index.module.scss";

export const State: React.FC<
  StateField & {
    control: Control<FieldValues, any>;
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any;
      }>
    >;
  }
> = ({ name, label, width, control, required, errors }) => {
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
            options={stateOptions}
            value={stateOptions.find((t) => t.value === value)}
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
