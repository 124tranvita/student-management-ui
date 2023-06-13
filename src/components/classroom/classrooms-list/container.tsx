import { useCallback, useEffect, useState } from "react";
import { FormikContext, useFormik } from "formik";
import {
  FixedContainer,
  DetailContainer,
  FlexContainer,
} from "../../../commons/components";
import { AddFormModal } from "../../../commons/components/dialogs";
import { Class } from "../../../commons/models";
import { Loader } from "../../../commons/components/loader";
import { BackButton } from "../../../commons/components/button";
import useCallApi from "../../../hooks/useCallApi";
import useTitle from "../../../hooks/useTitle";
import { isResponseSuccessfully } from "../../../utils/utils";
import { ClassroomFormikInitial, ClassroomFormikProps } from "../types";
import { createValidationSchema } from "../validation-schema";
import AddClassroomForm from "./add-form";
import { Card } from "./card";

const refreshToken = "dasdasdasdasdas";

const Class: React.FC = () => {
  const { setTitle } = useTitle();
  const [data, setData] = useState<Class[]>([]);
  const { callApi, response, isLoading, error } = useCallApi<Class[]>([]);

  useEffect(() => {
    setTitle("Classrooms");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    callApi("class", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isResponseSuccessfully(response)) {
      setData(data.concat(response.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const onSubmit = useCallback(async (values: ClassroomFormikProps) => {
    const newClassroom = {
      name: values.name,
      description: values.description,
      languages: values.languages.replace(/' '/g, "").split(","),
      image: values.image,
      mentor: "6476add03231ac3a821cd889",
    };

    callApi("class", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClassroom),
    });

    formikBag.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formikBag = useFormik({
    initialValues: ClassroomFormikInitial,
    validateOnBlur: false,
    validationSchema: createValidationSchema,
    onSubmit,
  });

  const handleSubmit = useCallback(() => {
    try {
      formikBag.submitForm();
    } catch (error) {
      console.log(error);
    }
  }, [formikBag]);

  if (isLoading) {
    return (
      <DetailContainer>
        <Loader />
      </DetailContainer>
    );
  }

  if (error) {
    return (
      <>
        <div>Error...</div>
      </>
    );
  }

  return (
    <DetailContainer>
      <BackButton path="/" />
      <FlexContainer>
        <FormikContext.Provider value={formikBag}>
          <FixedContainer variant="bottom-right">
            <AddFormModal
              title="Add classroom"
              type="add"
              handleSubmit={handleSubmit}
            >
              <AddClassroomForm />
            </AddFormModal>
          </FixedContainer>
        </FormikContext.Provider>
        {data &&
          data.length > 0 &&
          data.map((classroom, index) => (
            <Card key={index} classroom={classroom} />
          ))}
      </FlexContainer>
    </DetailContainer>
  );
};

export default Class;
