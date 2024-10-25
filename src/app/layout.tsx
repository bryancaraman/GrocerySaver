"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body 
      className={`bg-[#FCFCFC] dark:bg-blue-800 ${inter.className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
