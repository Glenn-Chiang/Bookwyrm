import { Modal } from "@/components/Modal";
import { VolumeInfo } from "@/lib/books-api/types";

type AddBookModalProps = {
  bookData: VolumeInfo;
};

export const AddBookModal = ({ bookData }: AddBookModalProps) => {
  return (
    <Modal>
      <h2>
        Add <span className="text-sky-500 font-medium">{bookData.title}</span> to your
        Library
      </h2>
    </Modal>
  );
};
