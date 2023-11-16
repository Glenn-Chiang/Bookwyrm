import { renameShelf } from "@/actions/shelves";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Modal } from "@/components/Modal";
import { CancelButton, SubmitButton } from "@/components/buttons";
import { serializeStringToUrl } from "@/lib/helpers/serializeUrlParam";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RenameShelfModalProps = {
  shelfname: string;
  close: () => void;
};

export const RenameShelfModal = ({
  shelfname,
  close,
}: RenameShelfModalProps) => {
  const [newName, setNewName] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setIsPending(true)

    try {
      await renameShelf(shelfname, newName)
      router.push(`../shelf/${serializeStringToUrl(newName)}`)
    } catch (error) {
      setError((error as Error).message)
      setIsPending(false)
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputValue = event.target.value;
    setNewName(inputValue)
    if (inputValue.includes('_')) {
      setError('Shelfname cannot contain underscores')
    } else {
      setError(null)
    }
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2>
          Rename your shelf{" "}
          <span className="text-sky-500 font-medium">{shelfname}</span>?
        </h2>
        <label htmlFor="shelfname">New shelfname</label>
        <input id="shelfname" onChange={handleInputChange} disabled={isPending} className="bg-slate-100"/>
        {error && <ErrorMessage message={error}/>}
        <div className="flex gap-2">
          <SubmitButton isPending={isPending}>Confirm</SubmitButton>
          <CancelButton onClick={close}/>
        </div>
      </form>
    </Modal>
  );
};
