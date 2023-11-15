import React from "react";

type ModalProps = {
  children: React.ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-sky-600/40 flex justify-center items-center z-20 p-4">
      <section className="bg-white rounded-xl p-4 w-full md:w-2/3 max-h-[60%] sm:max-h-[75%] /">
        {children}
      </section>
    </div>
  );
};
