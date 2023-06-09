import { Form, useFormikContext } from "formik";
import { FormikTextInput } from "../../../commons/components/formik";
import { ClassroomFormikProps } from "../types";

const inputClassname =
  "bg-slate-50 dark:bg-slate-800 appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-slate-100 focus:border-indigo-500";

const UpdateClassroomForm = () => {
  const formikBag = useFormikContext<ClassroomFormikProps>();
  return (
    <Form>
      <FormikTextInput
        label="Class Name"
        name="name"
        type="text"
        value={formikBag.values.name}
        className={inputClassname}
      />
      <FormikTextInput
        label="Class Description"
        name="description"
        type="text"
        value={formikBag.values.description}
        className={inputClassname}
      />
      <FormikTextInput
        label="Class languages"
        name="languages"
        type="text"
        value={formikBag.values.languages}
        className={inputClassname}
      />
      <FormikTextInput
        label="Class Avatar"
        name="image"
        type="text"
        value={formikBag.values.image}
        className={inputClassname}
      />
    </Form>
  );
};
export default UpdateClassroomForm;
