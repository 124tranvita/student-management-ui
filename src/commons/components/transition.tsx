import React, { Fragment } from "react";
import { Transition } from "@headlessui/react";

type PageTransitionProps = {
  children: React.ReactNode;
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <>
      <Transition
        appear={true}
        show={true}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {children}
      </Transition>
    </>
  );
};
