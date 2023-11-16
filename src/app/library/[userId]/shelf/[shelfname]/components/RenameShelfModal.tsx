import { renameShelf } from "@/actions/shelves";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Modal } from "@/components/Modal";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { shelfnameRegex, shelfnameRule } from "@/lib/constants";
import { serializeStringToUrl } from "@/lib/helpers/serializeUrlParam";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type RenameShelfModalProps = {
  shelfname: string;
  close: () => void;
};

type RenameShelfFormFields = {
  shelfname: string;
};

export const RenameShelfModal = ({
  shelfname,
  close,
}: RenameShelfModalProps) => {
  const [newName, setNewName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RenameShelfFormFields>();

  const onSubmit: SubmitHandler<RenameShelfFormFields> = async (event) => {
    setIsPending(true);

    try {
      await renameShelf(shelfname, newName);
      router.push(`../shelf/${serializeStringToUrl(newName)}`);
    } catch (error) {
      setError((error as Error).message);
      setIsPending(false);
    }
  };

  return (
    <Modal>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h2>
          Rename your shelf{" "}
          <span className="text-sky-500 font-medium">{shelfname}</span>?
        </h2>
        <label htmlFor="shelfname">New shelfname</label>
        <input
          id="shelfname"
          {...register("shelfname", {
            required: "Shelfname is required",
            pattern: { value: shelfnameRegex, message: shelfnameRule },
          })}
          className="bg-slate-100"
        />
        {errors.shelfname?.message && (
          <ErrorMessage message={errors.shelfname.message} />
        )}
        {error && <ErrorMessage message={error} />}
        <div className="flex gap-2">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={close} />
        </div>
      </form>
    </Modal>
  );
};
