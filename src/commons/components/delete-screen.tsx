import React from "react";
import { BackButton } from "./button";
import { Typography } from ".";

type Props = {
  children?: React.ReactNode;
};

export const DeleteScreen: React.FC<Props> = ({ children }) => {
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
          <BackButton />
        </div>
      </div>
    </div>
  );
};
