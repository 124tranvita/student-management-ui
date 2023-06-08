import React, { Fragment, useState } from "react";
import { useFormikContext } from "formik";
import { Dialog, Transition } from "@headlessui/react";
import { Button, RoundedButton } from "./button";

type FormModalProps = {
  title: string;
  children: React.ReactNode;
  handleSubmit?: () => void;
};

export const FormModal: React.FC<FormModalProps> = ({
  children,
  title,
  handleSubmit,
}) => {
  const formikBag = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    formikBag.resetForm();
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <RoundedButton
          type="button"
          label="+"
          onClick={openModal}
          variant="PRIMARY"
        />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>

                  <div className="flex justify-around mt-4">
                    <Button
                      type="submit"
                      label="Add"
                      variant="PRIMARY"
                      onClick={handleSubmit}
                    />
                    <Button
                      type="button"
                      label="Close"
                      variant="DANGER"
                      onClick={closeModal}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
