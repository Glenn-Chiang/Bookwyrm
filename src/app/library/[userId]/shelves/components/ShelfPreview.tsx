import { getShelfBooks } from "@/actions/shelfBooks"

type ShelfPreviewProps = {
  userId: number
  shelfname: string
}

export const ShelfPreview = async ({userId, shelfname}: ShelfPreviewProps) => {
  const shelfBooks = await getShelfBooks(userId, shelfname)
  
  return (
    <section>

    </section>
  )
}