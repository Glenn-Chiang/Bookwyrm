import React from "react"

type SubmitButtonProps = {
  children: React.ReactNode
  onClick: () => void
  isPending: boolean
}

export const SubmitButton = ({onClick, isPending, children}: SubmitButtonProps) => {
  return (
    <button type="submit" onClick={onClick} className="w-full bg-sky-100 text-sky-500 font-medium hover:text-sky-600 hover:bg-sky-200 " disabled={isPending}>
      {children}
    </button>
  )
}

type CancelButtonProps = {
  onClick: () => void
}

export const CancelButton = ({onClick}: CancelButtonProps) => {
  return (
    <button type="button" onClick={onClick} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-600 ">
      Cancel
    </button>
  )
}