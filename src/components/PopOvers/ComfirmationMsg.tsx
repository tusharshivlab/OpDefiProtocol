import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

function ComfirmationMsg({
  confirmationMsgTitle,
  confirmationsubtitle,
  confirmationImg,
  continueButton,
  isOpen,
  setIsOpen,
}: {
  confirmationMsgTitle: string;
  confirmationsubtitle: string;
  confirmationImg: string;
  continueButton: boolean;
  isOpen: boolean;
  setIsOpen: any;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => setIsOpen(false)}>
        <div className="min-h-screen px-1 text-center md:px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50 dark:bg-opacity-80" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-75"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div
              className={`inline-block w-full my-5 text-left align-middle transition-all transform bg-white border border-black border-opacity-5 shadow-xl rounded-2xl sm:my-8 dark:bg-neutral-800 dark:border-neutral-700 text-neutral-900 dark:text-neutral-300 max-w-screen-xl`}>
              <div className="m-auto text-center">
                <img
                  src="/assets/opdefi_color_transp.png"
                  alt="opdefiImage"
                  className="mt-20 w-28 h-auto m-auto"
                />
              
              <Dialog.Panel className="mt-20  text-center">
                <Dialog.Title className="font-bold text-4xl">
                  {confirmationMsgTitle}
                </Dialog.Title>
                <Dialog.Title className="text-gray-500 mt-5 text-xl">
                  {confirmationsubtitle}
                </Dialog.Title>
                <img
                  src={confirmationImg}
                  alt="shapesImage"
                  className="mt-20 w-20 h-auto m-auto"
                />
                <Dialog.Description className="mt-24 m-auto text-gray-500 mb-20">
                  {continueButton === true ? (
                    <button className="rounded-3xl bg-blue-500 px-28 py-3 text-white ">
                      <div className="flex">
                        <span className="mx-8"> Continue </span>
                        <img
                          src="/assets/Vector.png"
                          className="h-2 w-3 mt-2 ml-20 -mr-24"
                          alt="arrowImg"
                        />
                      </div>
                    </button>
                  ) : (
                    <>
                      <span>
                        Click the link in your email to continue the sign-up{" "}
                      </span>
                      <br />
                      <span>
                        process.You will be redirected to Opdefi and can close{" "}
                      </span>
                      <br />
                      <span> this window.</span>
                    </>
                  )}
                </Dialog.Description>
              </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ComfirmationMsg;
