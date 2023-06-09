import { Class } from "../../../commons/models";
import { ClassroomFormikProps } from "../types";

type Errors = {
  name: string;
  description?: string;
  languages: string;
  image: string;
};

export const createValidateSubmission = (
  values: ClassroomFormikProps,
  response: Class
) => {
  const errors = {} as Errors;

  if (
    values.name !== response.name ||
    values.description !== response.description ||
    values.languages !== response.languages.toString() ||
    values.image !== response.image
  ) {
    return errors;
  }

  if (values.name === response.name) {
    errors.name = "Please use other value";
  }

  if (values.description === response.description) {
    errors.description = "Please use other value";
  }

  if (values.languages === response.languages.toString()) {
    errors.languages = "Please use other value";
  }

  if (values.image === response.image) {
    errors.image = "Please use other value";
  }

  return errors;
};
