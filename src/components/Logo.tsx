import Image from "next/image";

type LogoProps = {
  size?: "medium" | "large";
};

export const Logo = ({ size = "medium" }: LogoProps) => {
  const width = size === "medium" ? 24 : 100;
  return (
    <Image
      src={
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRf_PBz9uE19P7FbqJHo2TOjKmxHZ7gxjibVvup-ZOmlrAQBKy"
      }
      alt="logo"
      width={width}
      height={width}
      className="rounded-full"
    />
  );
};
