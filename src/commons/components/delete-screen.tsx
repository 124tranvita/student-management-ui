import React from "react";
import { BackButton } from "./button";
import { Typography } from ".";

type Props = {
  children?: React.ReactNode;
  path?: string;
};

export const DeleteScreen: React.FC<Props> = ({ children, path }) => {
  return (
    <div className="flex justify-center items-center w-full h-full place-items-center">
      <div>{children}</div>
      <div className=" text-center">
        <Typography
          text="Your item has been deleted!"
          type="title"
          size="large"
        />
        <div>
          <BackButton path={path} />
        </div>
      </div>
    </div>
  );
};
