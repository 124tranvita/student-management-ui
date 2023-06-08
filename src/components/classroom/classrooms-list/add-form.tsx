import { Form } from "formik";
import { FormikTextInput } from "../../../commons/components/formik";

const inputClassname =
  "bg-slate-50 dark:bg-slate-800 appearance-none border-b-1 border-gray-200 mb-3 w-full py-2 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-slate-100 focus:border-indigo-500";

const AddClassroomForm = () => {
  return (
    <Form>
      <FormikTextInput
        label="Class Name"
        name="name"
        type="text"
        className={inputClassname}
      />
      <FormikTextInput
        label="Class Description"
        name="description"
        type="text"
        className={inputClassname}
      />
      <FormikTextInput
        label="Class languages"
        name="languages"
        type="text"
        className={inputClassname}
      />
      <FormikTextInput
        label="Class Avatar"
        name="image"
        type="text"
        className={inputClassname}
      />
    </Form>
  );
};
export default AddClassroomForm;
