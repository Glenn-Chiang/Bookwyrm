"use client"

import { removeBookFromUser } from "@/actions/userBooks";
import { Modal } from "@/components/Modal"
import { CancelButton, SubmitButton } from "@/components/buttons";
import { isPending } from "@reduxjs/toolkit";
import { useState } from 'react';

type RemoveBookModalProps = {
  bookId: string
  close: () => void
}

export const RemoveBookModal = ({bookId, close}: RemoveBookModalProps) => {
  const [isPending, setIsPending] = useState(false)

  const handleConfirm = async () => {
    setIsPending(true)
    await removeBookFromUser(bookId)
    close()
    setIsPending(false)
    console.log(`Book ${bookId} removed from library`)
  }

  return (
    <Modal >
      <div className="flex flex-col gap-4">
        <h2>Remove this book from your library?</h2>
        <p>This book will be removed from all your shelves</p>
        <div className="flex gap-2">
          <SubmitButton isPending={isPending} onClick={handleConfirm}>Confirm</SubmitButton>
          <CancelButton onClick={close}/>
        </div>
      </div>
    </Modal>
  )
}