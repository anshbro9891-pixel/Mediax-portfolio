import type { Metadata } from "next";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
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
      <body className="bg-[#0A0A0A] font-sans text-white">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
