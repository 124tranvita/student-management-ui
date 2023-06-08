import React, { ButtonHTMLAttributes } from "react";
import { classNames } from "../../utils/className";

// enum Variant {
//   PRIMARY,
//   SUCCESSFULLY,
//   DANGER,
// }

enum Variant {
  PRIMARY = "PRIMARY",
  SUCCESSFULLY = "SUCCESSFULLY",
  DANGER = "DANGER",
}

const VARIANT_MAPS = {
  [Variant.PRIMARY]: "bg-blue-100 text-blue-900 hover:bg-blue-200",
  [Variant.SUCCESSFULLY]: "bg-green-100 text-green-900 hover:bg-green-200",
  [Variant.DANGER]: "bg-red-100 text-red-900 hover:bg-red-200",
};

type ButtonProps = {
  label: string;
  variant: string;
  onClick?: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  label,
  type,
  variant,
  onClick,
}) => {
  let selectedVariant = "";

  switch (variant) {
    case Variant.PRIMARY:
      selectedVariant = VARIANT_MAPS[Variant.PRIMARY];
      break;
    case Variant.SUCCESSFULLY:
      selectedVariant = VARIANT_MAPS[Variant.SUCCESSFULLY];
      break;
    case Variant.DANGER:
      selectedVariant = VARIANT_MAPS[Variant.DANGER];
      break;
    default:
      break;
  }

  return (
    <div className="mt-4">
      <button
        type={type}
        className={classNames(
          "inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          selectedVariant
        )}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

Button.defaultProps = {
  variant: Variant.PRIMARY,
};

export const RoundedButton: React.FC<ButtonProps> = ({
  label,
  type,
  variant,
  onClick,
}) => {
  let selectedVariant = "";
  switch (variant) {
    case Variant.PRIMARY:
      selectedVariant = VARIANT_MAPS[Variant.PRIMARY];
      break;
    case Variant.SUCCESSFULLY:
      selectedVariant = VARIANT_MAPS[Variant.SUCCESSFULLY];
      break;
    case Variant.DANGER:
      selectedVariant = VARIANT_MAPS[Variant.DANGER];
      break;
    default:
      break;
  }

  return (
    <div className="mt-4">
      <button
        type={type}
        className={classNames(
          "w-16 h-16 inline-flex justify-center items-center rounded-full border border-transparent text-3xl font-extrabold shadow-md focus:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          selectedVariant
        )}
        onClick={onClick}
      >
        <span className="mb-1">{label}</span>
      </button>
    </div>
  );
};

RoundedButton.defaultProps = {
  variant: Variant.PRIMARY,
};
