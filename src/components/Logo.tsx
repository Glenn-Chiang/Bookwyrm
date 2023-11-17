import Image from "next/image"

type LogoProps = {
  size?: 'medium' | 'large'
}

export const Logo = ({size='medium'}: LogoProps) => {
  const width = size === 'medium' ? 24 : 100
  return (
    <Image src={'/logo.png'} alt="logo" width={width} height={width} className="rounded-full"/>
  )
}