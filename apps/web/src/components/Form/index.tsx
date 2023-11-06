"use client";
import React, { useState, useCallback } from "react";
import { buildInitialFormState } from "./buildInitialFormState";
import { fields } from "./fields";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form } from "payload-types";
import { RichText } from "@/components/RichText";
import { buttonClasses } from "../Button/buttonClasses";

export type Value = unknown;

export interface Property {
  [key: string]: Value;
}

export interface Data {
  [key: string]: Value | Property | Property[];
}
const RenderForm = (props) => {
  const {
    form: formFromProps,
    form: {
      id: formID,
      submitButtonLabel,
      confirmationType,
      redirect,
      confirmationMessage,
    },
  } = props;

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = formMethods;

  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>();
  const [error, setError] = useState<
    { status?: string; message: string } | undefined
  >();
  const router = useRouter();

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: NodeJS.Timer;

      const submitForm = async () => {
        setError(undefined);

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }));

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true);
        }, 1000);

        try {
          const req = await fetch(
            `${process.env.NEXT_PUBLIC_CMS_URL}/api/form-submissions`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                form: formID,
                submissionData: dataToSend,
              }),
            }
          );

          const res = await req.json();

          clearTimeout(loadingTimerID);

          if (req.status >= 400) {
            setIsLoading(false);
            setError({
              status: res.status,
              message: res.errors?.[0]?.message || "Internal Server Error",
            });

            return;
          }

          setIsLoading(false);
          setHasSubmitted(true);

          if (confirmationType === "redirect" && redirect) {
            const { url } = redirect;

            const redirectUrl = url;

            if (redirectUrl) router.push(redirectUrl);
          }
        } catch (err) {
          console.warn(err);
          setIsLoading(false);
          setError({
            message: "Something went wrong.",
          });
        }
      };

      submitForm();
    },
    [router, formID, redirect, confirmationType]
  );

  return (
    <>
      <div
        className={["w-full relative", hasSubmitted && "md:h-full"]
          .filter(Boolean)
          .join(" ")}
      >
        {!isLoading && hasSubmitted && confirmationType === "message" && (
          <div className="absolute h-full p-4 top-2">
            <RichText className="space-y-4" content={confirmationMessage} />
          </div>
        )}
        {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
        {error && (
          <div>{`${error.status || "500"}: ${error.message || ""}`}</div>
        )}
        <form
          id={formID}
          onSubmit={!hasSubmitted && handleSubmit(onSubmit)}
          className={`relative z-10 flex flex-wrap w-full ${
            !hasSubmitted ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {formFromProps &&
            formFromProps.fields &&
            formFromProps.fields.map((field, index) => {
              const Field: React.FC<any> = fields?.[field.blockType];
              if (Field) {
                return (
                  <div
                    key={index}
                    className="px-2 mt-2"
                    style={{
                      width: field.width ? `${field.width}%` : "100%",
                    }}
                  >
                    <Field
                      form={formFromProps}
                      {...field}
                      {...formMethods}
                      register={register}
                      errors={errors}
                      control={control}
                    />
                  </div>
                );
              }
              return null;
            })}
          <button
            className={buttonClasses("none", ["mt-2"])}
            type="submit"
            value={submitButtonLabel}
            form={formID}
          >
            {submitButtonLabel || "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export const CMSForm: React.FC<{
  form?: string | Form;
}> = (props) => {
  const { form } = props;

  if (!form || typeof form === "string") return null;

  return <RenderForm form={form} />;
};
