import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { FormikContext, useFormik } from "formik";
import useTitle from "../../../hooks/useTitle";
import useCallApi from "../../../hooks/useCallApi";
import usePagination from "../../../hooks/usePagination";
import { Class, classInitial } from "../../../commons/models";
import {
  DetailContainer,
  UpdateFormModal,
  DeleteScreen,
  Typography,
  Pagination,
} from "../../../commons/components";
import { BackButton } from "../../../commons/components/button";
import { ComponentLoader, Loader } from "../../../commons/components/loader";
import { DeleteFormModal } from "../../../commons/components/dialogs";
import { isResponseSuccessfully } from "../../../utils/utils";
import { createValidationSchema } from "../validation-schema";
import { ClassroomFormikProps } from "../types";
import * as Constants from "../constants";
import UpdateClassroomForm from "./update-form";
import MembersList from "./members-list";
import { createValidateSubmission } from "./validate-submission";
import { Card } from "./card";

const Detail: React.FC = () => {
  const { classroomId } = useParams();
  const [data, setData] = useState<Class>(classInitial);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [eventId, setEventId] = useState<Constants.EventId>(
    Constants.EventId.None
  );

  const { setTitle } = useTitle();
  const { callApi, response, isLoading, error } =
    useCallApi<Class>(classInitial);
  const { paginationRange } = usePagination({
    limit,
    grossCnt: response.grossCnt || 0,
  });

  useEffect(() => {
    setTitle(data.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.name]);

  /** Call API at init display */
  useEffect(() => {
    setEventId(Constants.EventId.Init);
    callApi(`class/${classroomId}?page=${page}&limit=${limit}`, {
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

  /** Get assigned list  */
  const assigned = useMemo(() => {
    return data.assigned && data.assigned.length > 0 ? data.assigned : [];
  }, [data.assigned]);

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

    callApi(`class/${classroomId}?page=${page}&limit=${limit}`, {
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
    validateOnBlur: false,
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
    setEventId(Constants.EventId.Update);
    try {
      formikBag.submitForm();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikBag]);

  /** Handle delete button */
  const handleDelete = useCallback(() => {
    callApi(`class/${classroomId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer 123456`,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Handle delete button */
  const handleUnassign = useCallback((studentId: string) => {
    const data = {
      studentId: studentId,
    };

    callApi(`assign/${classroomId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer 123456`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaging = useCallback((page: number) => {
    setEventId(Constants.EventId.Paging);
    callApi(`class/${classroomId}?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer 123213213213`,
      },
    });
    setPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    isLoading &&
    (eventId === Constants.EventId.Init || eventId === Constants.EventId.Update)
  ) {
    return (
      <DetailContainer>
        <Loader />
      </DetailContainer>
    );
  }

  if (JSON.stringify(response.data) === "{}") {
    return (
      <DetailContainer>
        <DeleteScreen path="/classroom" />
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
      <BackButton path="/classroom" />
      <div className="flex justify-between">
        <div>
          <Card classroom={data} />
          <div className="flex justify-start p-4">
            <FormikContext.Provider value={formikBag}>
              <div className="mr-4">
                <UpdateFormModal
                  type="update"
                  title="Update"
                  handleSubmit={handleSubmit}
                >
                  <UpdateClassroomForm />
                </UpdateFormModal>
              </div>
              <div>
                <DeleteFormModal title="Confirm" handleSubmit={handleDelete}>
                  <Typography
                    text={`Delete this classroom?`}
                    type="name"
                    size="normal"
                  />
                </DeleteFormModal>
              </div>
            </FormikContext.Provider>
          </div>
        </div>
        <div className="w-3/4 p-4">
          {isLoading && eventId === Constants.EventId.Paging ? (
            <div className="relative h-32">
              <ComponentLoader />
            </div>
          ) : (
            <>
              <MembersList
                handleUnassign={handleUnassign}
                members={members}
                assigned={assigned}
              />
            </>
          )}
          <div>
            <Pagination
              paginationRange={paginationRange}
              currentPage={page}
              handlePaging={handlePaging}
            />
          </div>
        </div>
      </div>
    </DetailContainer>
  );
};

export default Detail;
