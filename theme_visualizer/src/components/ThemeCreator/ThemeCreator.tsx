import { useEffect, useState } from "react";
import { FieldError, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorSymbol from "../ErrorSymbol/ErrorSymbol";
import "./ThemeCreator.css";
import hexInverseBw from "../HexInverseBw";
import ExportForm from "../ExportForm/ExportForm";
import errorMsg from "../errorMsg";
import CloseIcon from "../CloseIcon";

const ThemeCreator = () => {
  const schema = z.object({
    name: z
      .string()
      .min(1, { message: "First Name cannot be empty" })
      .refine((name) => !fields.has(name), {
        message: "Field already exists",
      }),
    value: z
      .string({ required_error: "Color cannot be empty" })
      .min(1, { message: "First Name cannot be empty" }),
  });
  const [fields, setFields] = useState<Map<string, string>>(new Map());
  const [exportIsActive, setExportIsActive] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const removeField = (key: string) => {
    setFields((oldFields) => {
      let newFields = new Map(oldFields);
      newFields.delete(key);
      return newFields;
    });
  };

  const updateFields = (key: string, value: string) => {
    const updatedFields = new Map(fields);
    updatedFields.set(key, value);
    setFields(updatedFields);
  };

  const onSubmit = (data: FieldValues) => {
    const updatedFields = fields;
    updatedFields.set(data.name, data.value);

    setFields(updatedFields);
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <div className="ThemeCreator">
      <form className="FieldForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputAndError">
          <div
            className={`input-container ${
              errors.name?.message !== undefined ? "invalid" : ""
            }`}
          >
            <input placeholder="Field Name" {...register("name")} />
            <ErrorSymbol />
          </div>
          {errorMsg(errors.name as FieldError)}
        </div>

        <div className="inputAndError">
          <div
            className={`input-container ${
              errors.value?.message !== undefined ? "invalid" : ""
            }`}
          >
            <input type="color" placeholder="Color" {...register("value")} />
            <ErrorSymbol />
          </div>
          {errorMsg(errors.value as FieldError)}
        </div>

        <input type="submit" value="Add" />
      </form>

      {exportIsActive ? (
        <div>
          <CloseIcon close={() => setExportIsActive(false)} />
          <ExportForm fields={fields} close={() => setExportIsActive(false)} />
        </div>
      ) : (
        <button
          className="exportButton"
          onClick={() => setExportIsActive(true)}
        >
          Export
        </button>
      )}

      <ul className="colorFields">
        {[...fields.keys()].map((key) => {
          return (
            <li className="cField" key={`field-${key}`}>
              <h1>{key}</h1>
              <label htmlFor={`colorChanger-${key}`}>
                <div
                  className="colorFieldValue"
                  style={{ backgroundColor: fields.get(key) }}
                >
                  <h1 style={{ color: hexInverseBw(fields.get(key) || "") }}>
                    {fields.get(key)}
                  </h1>
                </div>
              </label>
              <CloseIcon close={() => removeField(key)} />
              <input
                id={`colorChanger-${key}`}
                name={`colorChanger-${key}`}
                value={fields.get(key)}
                onChange={(e) => updateFields(key, e.target.value)}
                type="color"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ThemeCreator;
