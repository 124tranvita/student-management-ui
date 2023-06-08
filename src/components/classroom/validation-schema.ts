import * as Yup from "yup";
import { ValidationMesg } from "../../commons/constants";

export const createValidationSchema = () => {
  return Yup.object().shape({
    /** Class Name */
    name: Yup.string()
      .min(3, `${ValidationMesg.minLength} 3 characters`)
      .max(12, `${ValidationMesg.maxLength} 12 character`)
      .required(ValidationMesg.required),
    /** Class Description */
    description: Yup.string()
      .min(3, `${ValidationMesg.minLength} 3 characters`)
      .max(128, `${ValidationMesg.maxLength} 64 character`),
    /** Class language */
    languages: Yup.string().required(ValidationMesg.required),
    /** Class avatar */
    image: Yup.string().required(ValidationMesg.required),
  });
};
