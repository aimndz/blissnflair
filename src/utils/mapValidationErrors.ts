import { ValidationError } from "../types/validationError";

export function mapValidationErrors(errors: ValidationError[]): {
  [key: string]: string;
} {
  const fieldErrors: { [key: string]: string } = {};

  errors.forEach((error) => {
    fieldErrors[error.path] = error.msg;
  });

  return fieldErrors;
}
