import { FieldError } from "react-hook-form";

const errorMsg = (error: FieldError) => (
  <p className="error-msg">{error?.message as string}</p>
);

export default errorMsg;
