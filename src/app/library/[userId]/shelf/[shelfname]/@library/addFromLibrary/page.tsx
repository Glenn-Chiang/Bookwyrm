import { Modal } from "@/components/Modal";

export default async function BrowseLibrary({
  params,
}: {
  params: { userId: string; shelfname: string };
}) {
  const userId = Number(params.userId);
  const shelfname = params.shelfname;

  return (
    <Modal large={true}>
      <h2 className="text-center">
        Add books from your library to{" "}
        <span className="text-sky-500 font-medium">{shelfname}</span>
      </h2>
      <section></section>
      <div className="flex gap-2 "></div>
    </Modal>
  );
}
