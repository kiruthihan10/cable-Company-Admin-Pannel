import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/external/providers";
import Navbar from "@/components/complexComponents/navbar";
import Header from "@/components/complexComponents/header";
import StylingConfig from "@/styling/stylingConfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cable Companies",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StylingConfig>
        <Providers>
          <Header />
          <Navbar>{children}</Navbar>
        </Providers>
      </StylingConfig>
    </html>
  );
}
