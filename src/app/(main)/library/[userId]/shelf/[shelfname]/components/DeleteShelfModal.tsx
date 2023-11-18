import { deleteShelf } from "@/actions/shelves";
import { Modal } from "@/components/Modal";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteShelfModalProps = {
  shelfname: string;
  close: () => void;
};

export const DeleteShelfModal = ({
  shelfname,
  close,
}: DeleteShelfModalProps) => {
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setIsPending(true);
    await deleteShelf(shelfname);
    router.push("..");
  };

  return (
    <Modal>
      <h2>
        Delete your shelf{" "}
        <span className="text-sky-500 font-medium">{shelfname}</span>?
      </h2>
      <p className="text-slate-500 ">
        Books in this shelf will remain in your library
      </p>
      <div className="flex gap-2">
        <SubmitButton onClick={handleSubmit} isPending={isPending}>
          Confirm
        </SubmitButton>
        <CancelButton onClick={close} />
      </div>
    </Modal>
  );
};
