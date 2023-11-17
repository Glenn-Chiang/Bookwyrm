import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
config.autoAddCss = false;

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookwyrm",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-sky-200 w-screen h-screen flex justify-center items-center p-4">
        <main className="sm:w-3/4 shadow bg-white rounded-xl flex flex-col gap-4 justify-center items-center p-4">
        {children}
        </main>
      </body>
    </html>
  );
}
