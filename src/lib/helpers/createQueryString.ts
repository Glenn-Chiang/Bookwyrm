import { ReadonlyURLSearchParams } from "next/navigation"

export const createQueryString = (currentParams: ReadonlyURLSearchParams,  name: string, value: string) => {
  const params = new URLSearchParams(currentParams)
  params.set(name, value)
  return params.toString()
}