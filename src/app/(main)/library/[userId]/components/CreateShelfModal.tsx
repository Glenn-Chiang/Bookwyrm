"use client";

import { createShelf } from "@/actions/shelves";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Modal } from "@/components/Modal";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { shelfnameRegex, shelfnameRule } from "@/lib/constants";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type CreateShelfModalProps = {
  close: () => void;
};

type CreateShelfFormFields = {
  shelfname: string;
};

export const CreateShelfModal = ({ close }: CreateShelfModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateShelfFormFields>();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | string >(null);

  const onSubmit: SubmitHandler<CreateShelfFormFields> = async (formFields) => {
    try {
      setIsPending(true);
      const res = await createShelf(formFields.shelfname);
      if (res.status === 'success') {
        close();
      } else {
        setError(res.message)
      }
    } catch (error) {
      setError((error as Error).message);
    }
    setIsPending(false);
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2>Create a Shelf</h2>
        <label htmlFor="shelfname">Shelf name</label>
        <input
          id="shelfname"
          {...register("shelfname", {
            required: "Shelf name is required",
            pattern: { value: shelfnameRegex, message: shelfnameRule },
          })}
          className="bg-slate-100"
        />
        {errors.shelfname?.message && (
          <ErrorMessage message={errors.shelfname.message} />
        )}
        {error && <ErrorMessage message={error} />}
        <div className="flex gap-2">
          <SubmitButton isPending={isPending}>Create</SubmitButton>
          <CancelButton onClick={close} />
        </div>
      </form>
    </Modal>
  );
};
