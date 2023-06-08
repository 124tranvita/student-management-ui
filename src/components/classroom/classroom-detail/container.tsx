import React, { useEffect } from "react";
import useTitle from "../../../hooks/useTitle";
import { Class, classInitial } from "../../../commons/models";
import useCallApi from "../../../hooks/useCallApi";
import { useParams } from "react-router-dom";
import { DetailContainer, Typography } from "../../../commons/components";
import { Card } from "./card";
import { AvatarImg } from "../../../commons/components/image";
import { Button } from "../../../commons/components/button";

const Detail: React.FC = () => {
  const { setTitle } = useTitle();
  const { classroomId } = useParams();
  const { callApi, response, isLoading, error } =
    useCallApi<Class>(classInitial);

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

  console.log({ classroomId });
  console.log({ response });
  console.log({ mebers: response.members });

  if (isLoading) {
    return (
      <>
        <div>Loading...</div>
      </>
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
      <div className="flex justify-between">
        <Card classroom={response} />
        <div className="w-3/4 p-4">
          <ul>
            <li className="flex justify-between items-center p-2 mb-2 rounded-sm border border-slate-100 hover:shadow-sm hover:cursor-pointer duration-300">
              <div className="flex justify-start items-center">
                <AvatarImg
                  path="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                  width="46"
                  height="46"
                />
                <div className="flex-column">
                  <Typography text="Student 1" type="name" size="normal" />
                  <Typography text="Active" type="muted" size="small" />
                </div>
              </div>

              <div className="flex justify-start items-center ">
                <div className="mr-4">
                  <Button label="Edit" variant="PRIMARY" />
                </div>
                <div>
                  <Button label="Delete" variant="DANGER" />
                </div>
              </div>
            </li>
            <li className="flex justify-start items-center p-2 mb-2 rounded-sm border border-slate-100 hover:shadow-sm hover:cursor-pointer duration-300">
              <AvatarImg
                path="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                width="46"
                height="46"
              />
              <div className="flex-column">
                <Typography text="Student 1" type="name" size="normal" />
                <Typography text="Active" type="muted" size="small" />
              </div>
            </li>
            <li className="flex justify-start items-center p-2 mb-2 rounded-sm border border-slate-100 hover:shadow-sm hover:cursor-pointer duration-300">
              <AvatarImg
                path="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                width="46"
                height="46"
              />
              <div className="flex-column">
                <Typography text="Student 1" type="name" size="normal" />
                <Typography text="Active" type="muted" size="small" />
              </div>
            </li>
            <li className="flex justify-start items-center p-2 mb-2 rounded-sm border border-slate-100 hover:shadow-sm hover:cursor-pointer duration-300">
              <AvatarImg
                path="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                width="46"
                height="46"
              />
              <div className="flex-column">
                <Typography text="Student 1" type="name" size="normal" />
                <Typography text="Active" type="muted" size="small" />
              </div>
            </li>
            <li className="p-2 mb-2 rounded-sm border border-slate-100">
              test
            </li>
            <li className="p-2 mb-2 rounded-sm border border-slate-100">
              test
            </li>
            <li className="p-2 mb-2 rounded-sm border border-slate-100">
              test
            </li>
            {/* {response.members &&
              response.members[0] &&
              response.members.map((item, index) => (
                <li className="" key={index}>
                  {item.name}
                </li>
              ))} */}
          </ul>
        </div>
      </div>
    </DetailContainer>
  );
};

export default Detail;
