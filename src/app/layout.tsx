import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/Providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import { CounterStoreProvider } from "@/Providers/Zustand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin ",
  description: "Academia Insight Institute of Research Studies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="top-right" />
        <CounterStoreProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </CounterStoreProvider>
      </body>
    </html>
  );
}
