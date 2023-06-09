import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FormikContext, useFormik } from "formik";
import useTitle from "../../../hooks/useTitle";
import useCallApi from "../../../hooks/useCallApi";
import { Class, classInitial } from "../../../commons/models";
import {
  DetailContainer,
  FormModal,
  DeleteScreen,
} from "../../../commons/components";
import { BackButton, Button } from "../../../commons/components/button";
import { Loader } from "../../../commons/components/loader";
import { isResponseSuccessfully } from "../../../utils/utils";
import { createValidationSchema } from "../validation-schema";
import { ClassroomFormikProps } from "../types";
import UpdateClassroomForm from "./update-form";
import MembersList from "./members-list";
import { Card } from "./card";
import { createValidateSubmission } from "./validate-submission";

const Detail: React.FC = () => {
  const { classroomId } = useParams();
  const [data, setData] = useState<Class>(classInitial);
  const { setTitle } = useTitle();
  const { callApi, response, isLoading, error } =
    useCallApi<Class>(classInitial);

  console.log({ response });

  useEffect(() => {
    setTitle("Classroom");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Call API at init display */
  useEffect(() => {
    callApi(`class/${classroomId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer 123213213213`,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isResponseSuccessfully(response)) {
      setData(response.data);
    }
  }, [response]);

  /** Get members list  */
  const members = useMemo(() => {
    return data.members && data.members.length > 0 ? data.members : [];
  }, [data.members]);

  /** Formik */
  const initialValues = useMemo(() => {
    return {
      name: data.name,
      description: data.description,
      languages: data.languages.toString(),
      image: data.image,
    };
  }, [data]);

  const onSubmit = useCallback((values: ClassroomFormikProps) => {
    const updateData = {
      name: values.name,
      description: values.description,
      languages: values.languages.replace(/' '/g, "").split(","),
      image: values.image,
      mentor: "6476add03231ac3a821cd889",
    };

    callApi(`class/${classroomId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer 123456`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    formikBag.resetForm();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formikBag = useFormik({
    initialValues,
    validate: (values) => createValidateSubmission(values, data),
    validationSchema: createValidationSchema(),
    onSubmit,
  });

  /** Set formik initial values */
  useEffect(() => {
    formikBag.setValues(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues]);

  /** Handle update button */
  const handleSubmit = useCallback(() => {
    try {
      formikBag.submitForm();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikBag]);

  /** Handle delete button */
  const handleDelete = useCallback(() => {
    // TODO: Add delete event
    callApi(`class/${classroomId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer 123456`,
      },
    });

    // navigate(-1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikBag]);

  if (isLoading) {
    return (
      <DetailContainer>
        <Loader />
      </DetailContainer>
    );
  }

  if (JSON.stringify(response.data) === "{}") {
    return (
      <DetailContainer>
        <DeleteScreen />
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
      <BackButton />
      <div className="flex justify-between">
        <div>
          <Card classroom={data} />
          <div className="flex justify-start p-4">
            <FormikContext.Provider value={formikBag}>
              <div className="mr-4">
                <FormModal
                  type="update"
                  title="Update"
                  handleSubmit={handleSubmit}
                >
                  <UpdateClassroomForm />
                </FormModal>
              </div>
              <div>
                <Button
                  onClick={handleDelete}
                  label="Delete"
                  variant="danger"
                />
              </div>
            </FormikContext.Provider>
          </div>
        </div>
        <div className="w-3/4 p-4">
          <MembersList members={members} />
        </div>
      </div>
    </DetailContainer>
  );
};

export default Detail;
