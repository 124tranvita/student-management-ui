import React from "react";
import { AvatarImg, Typography } from "../../../commons/components";
import { IconButton } from "../../../commons/components/button";
import { DeleteIcon, DetailIcon } from "../../../commons/components/icon";
import { Student } from "../../../commons/models";
import { genderMapper } from "../../../utils/utils";
import { Link } from "react-router-dom";

/** TODO */
const enrolledDay = "2020-01-01";

type Props = {
  members: Student[];
};

const MembersList: React.FC<Props> = ({ members }) => {
  return (
    <ul>
      {members &&
        members.length > 0 &&
        members.map((item, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 mb-2 rounded-md border border-slate-100 hover:shadow-sm hover:bg-slate-100 duration-300"
          >
            <div className="flex justify-start items-center">
              <AvatarImg
                path="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                width="46"
                height="46"
              />
              <div className="flex-column">
                <Typography text={item.name} type="name" size="normal" />
                <Typography
                  text={`${item.studentId} - ${item.status}`}
                  type="muted"
                  size="small"
                />
              </div>
            </div>

            <div>
              <Typography
                text={`Enrolled day: ${enrolledDay}`}
                type="name"
                size="small"
              />
              <Typography
                text={genderMapper(item.gender)}
                type="muted"
                size="small"
              />
            </div>

            <div className="flex justify-start items-center ">
              <div className="mx-4">
                <Link to={`/student/${item._id}`}>
                  <IconButton variant="primary" type="button">
                    <DetailIcon />
                  </IconButton>
                </Link>
              </div>
              <div>
                <IconButton variant="danger">
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default MembersList;
