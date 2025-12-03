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
          <div className="flex flex-col w-full h-screen bg-[#09090B] text-[#FFFFFF]">
            <NavBar />
            <div className=" w-full flex h-full overflow-y-auto">
              <div className="max-w-[1440px] w-full mx-auto flex flex-col h-full px-[108px]">
                {children}
              </div>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
