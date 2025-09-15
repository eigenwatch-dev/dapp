import type { Metadata } from "next";
import "./globals.css";
import AppProvider from "./Provider";

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
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
