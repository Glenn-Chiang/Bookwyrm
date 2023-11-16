import React from "react";

type ModalProps = {
  children: React.ReactNode;
  large?: boolean
};

export const Modal = ({ children, large }: ModalProps) => {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-sky-600/40 flex justify-center items-center z-40 p-4 backdrop-blur-sm">
      {large ? (
        <section className="bg-white rounded-xl p-4 w-full max-h-full ">
          {children}
        </section>
      ) : (
        <section className="bg-white rounded-xl p-4 w-full md:w-2/3 max-h-[60%] sm:max-h-[75%] ">
          {children}
        </section>
      )}
    </div>
  );
};
