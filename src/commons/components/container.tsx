import React from "react";
import { classNames } from "../../utils/className";

type Props = {
  children?: React.ReactNode;
  value?: string;
};

/** General container */
export const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className="container md:w-4/6 mx-auto">
      <div className="flex justify-around flex-wrap">{children}</div>
    </div>
  );
};

/** Detail container */
export const DetailContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full p-6">
      <div className="fixed top-12 left-12 bottom-12 right-12 px-12 py-8 bg-white border border-slate-100 rounded-md shadow-lg hover:shadow-xl duration-300 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

/** Fixed container */
enum Variant {
  TOP_LEFT = "top-left",
  TOP_RIGHT = "top-right",
  BOTTOM_LEFT = "bottom-left",
  BOTTOM_RIGHT = "bottom-right",
}

type FixedContainerProps = {
  children: React.ReactNode;
  variant?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
};

const VariantMap = {
  [Variant.TOP_LEFT]: "top-12 left-12",
  [Variant.TOP_RIGHT]: "top-12 right-12",
  [Variant.BOTTOM_LEFT]: "bottom-12 left-12",
  [Variant.BOTTOM_RIGHT]: "bottom-12 right-12",
};

export const FixedContainer: React.FC<FixedContainerProps> = ({
  children,
  variant = "top-left",
}) => {
  return (
    <div className={classNames("fixed", VariantMap[variant])}>{children}</div>
  );
};

/** Hash tag div */
export const HashDiv: React.FC<Props> = ({ value }) => {
  return (
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-1">
      #{value}
    </span>
  );
};
