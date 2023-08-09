import { FieldError, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import ErrorSymbol from "../ErrorSymbol/ErrorSymbol";
import errorMsg from "../errorMsg";

const schema = z.object({
  fileName: z.string().min(1, { message: "First Name cannot be empty" }),
  extension: z.string(),
});

interface FileType {
  name: string;
  extension: string;
}

const fileTypes: FileType[] = [
  { name: "JSON", extension: "json" },
  { name: "Text", extension: "txt" },
];

const ExportForm = (props: {
  fields: Map<string, string>;
  close: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    let fileContents = "";
    if (data.extension === "json") {
      fileContents = JSON.stringify(Object.fromEntries(props.fields));
    } else if (data.extension === "txt") {
      let fields = [...props.fields.keys()].map(
        (key) => `${key} : ${props.fields.get(key)}`
      );
      fileContents = fields.join("\n");
    }

    const blob = new Blob([fileContents], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${data.fileName}.${data.extension}`;
    link.href = url;
    link.click();
    props.close();
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <form className="FieldForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="inputAndError">
        <div
          className={`input-container ${
            errors.fileName?.message !== undefined ? "invalid" : ""
          }`}
        >
          <input placeholder="File Name" {...register("fileName")} />
          <ErrorSymbol />
        </div>
        {errorMsg(errors.fileName as FieldError)}
      </div>
      <div className="inputAndError">
        <div
          className={`input-container ${
            errors.extension?.message !== undefined ? "invalid" : ""
          }`}
        >
          <select {...register("extension")}>
            {fileTypes.map((fileType) => (
              <option key={fileType.extension} value={fileType.extension}>
                {fileType.name}
              </option>
            ))}
          </select>
          <ErrorSymbol />
        </div>
        {errorMsg(errors.extension as FieldError)}
      </div>

      <input type="submit" value="Done" />
    </form>
  );
};

export default ExportForm;
