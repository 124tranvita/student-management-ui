import React from "react";
import { AvatarImg, Typography } from "../../../commons/components";
import { IconButton } from "../../../commons/components/button";
import { DetailIcon } from "../../../commons/components/icon";
import { Assign, Student } from "../../../commons/models";
import { genderMapper } from "../../../utils/utils";
import { Link } from "react-router-dom";
import { getEnrolledDate } from "../utils";
import { UnasignFormModal } from "../../../commons/components/dialogs";

type Props = {
  members: Student[];
  assigned: Assign[];
  handleUnassign: (value: string) => void;
};

const MembersList: React.FC<Props> = ({
  members,
  assigned,
  handleUnassign,
}) => {
  return (
    <div>
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
                  text={`Enrolled: ${getEnrolledDate(item._id, assigned)}`}
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
                  <UnasignFormModal
                    title="Confirm"
                    handleSubmit={() => handleUnassign(item._id)}
                  >
                    <Typography
                      text={`Unassign "${item.studentId}-${item.name}" from this classroom?`}
                      type="name"
                      size="normal"
                    />
                  </UnasignFormModal>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MembersList;
