"use client"

import { useRouter } from "next/navigation"
import React from "react"

export const Searchbar = () => {
  const router = useRouter()

  const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== 'Enter') return // Fire on enter

    const searchTerm = event.currentTarget.value
    router.push(`/?search=${searchTerm}`)
  }

  return (
    <input onKeyDown={handleKeydown} className="border-b-2 focus:outline-none border-sky-500"/>
  )
}