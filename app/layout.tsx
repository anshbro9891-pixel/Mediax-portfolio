import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ultimate Mediax",
  description: "Ultimate Mediax — Digital creative agency portfolio and admin CMS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] font-sans text-white">{children}</body>
    </html>
  );
}
