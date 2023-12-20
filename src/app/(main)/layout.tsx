import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Navbar } from "@/components/Navbar";
import { TopButton } from "@/components/buttons";
import { AuthProvider } from "@/components/AuthProvider";
config.autoAddCss = false;

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookwyrm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <Navbar />
          <main className="flex min-h-screen flex-col items-center gap-8 py-20 px-2 sm:px-4 w-full">
            {children}
          </main>
          <TopButton />
        </AuthProvider>
      </body>
    </html>
  );
}
