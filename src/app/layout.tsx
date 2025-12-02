import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "./Provider";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = {
  title: "EigenWatch",
  description: "Risk Analysis Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <AppProvider>
          <div className="flex w-full min-h-screen h-full bg-[#09090B] text-[#FFFFFF]">
            <NavBar />
            <div className="max-w-[1440px] mx-auto flex flex-col">
              {children}
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
