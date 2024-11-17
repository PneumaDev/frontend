import React, { useState } from "react";

const MpesaModal = ({
  openModal,
  setOpenModal,
  formData,
  getCartAmount,
  deliveryFee,
}) => {
  return (
    <>
      {openModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg">
            <div className="modal-header mb-6">
              <h3 className="font-muktaVaani text-xl">
                Order Payment Confirmation
              </h3>
            </div>
            <div className="modal-body space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 font-yantramanav">
                Hello, {formData.firstName + " " + formData.lastName}.
              </p>
              <p className="text-base leading-relaxed font-imprima text-gray-500 dark:text-gray-400">
                Please confirm Payment of{" "}
                <span className="font-semibold">
                  Ksh. {getCartAmount() + deliveryFee}
                </span>{" "}
                to Eridanus Mall. You'll receive a prompt on your phone to the
                number{" "}
                <span className="bg-slate-300 p-[1px] px-1 rounded-md font-medium shadow-md">
                  {formData.phone}
                </span>
                . Kindly enter your PIN and wait for confirmation after payment.
              </p>
            </div>
            <div className="modal-footer mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setOpenModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Pay Now
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MpesaModal;
