import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import Link from "next/link";
import { AuthButton } from "@/components/auth/sign-in";

import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next GPT Chat",
  description: "Next.js GPT Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">Next GPT Chat</h1>
            <nav className="flex items-center gap-4">
              <ul className="flex items-center gap-4">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </nav>
            <AuthButton />
          </header>
          <main>{children}</main>
          <footer>
            <p>Next GPT Chat</p>
          </footer>
        </body>
      </html>
    </SessionProvider>
  );
}
