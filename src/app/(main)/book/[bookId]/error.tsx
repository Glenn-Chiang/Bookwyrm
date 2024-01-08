"use client"

import { ErrorMessage } from "@/components/ErrorMessage"

export default function Error({error, reset}: {error: Error & {digest?: string}, reset: () => void}) {
  return (
    <div>
      <ErrorMessage message="Error fetching book data"/>
    </div>
  )
}