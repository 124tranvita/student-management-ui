import React from "react";
import { Class } from "../../../commons/models";
import { HashDiv, Typography } from "../../../commons/components";
import { formatFullDate } from "../../../utils/dateFormat";

type CardProps = {
  classroom: Class;
};

export const Card: React.FC<CardProps> = ({ classroom }) => {
  const { name, languages, createdAt, image, students, description } =
    classroom;
  return (
    <div className="p-4">
      <div className="max-w-sm rounded overflow-hidden">
        <img
          className="w-card-classroom-img h-card-classroom-img  object-cover"
          src={image}
          alt="Sunset in the mountains"
        />
        <div className="py-4">
          <Typography text={name} type="title" size="large" />
          <Typography text={description} type="description" />
          <Typography text={`${students.length} enrolled`} type="base" />
          <Typography text={formatFullDate(createdAt)} type="muted" />
        </div>
        <div className="pt-4 pb-2">
          {languages[0] ? (
            languages.map((item: string, index: number) => (
              <HashDiv key={index} value={item} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
