import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MSWProvider } from './providers';
import { Noto_Sans_KR } from 'next/font/google';
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
  title: "로컬부산",
  description: "부산지역 웹 매거진",
};

const noto = Noto_Sans_KR({
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable } ${noto.className} antialiased`}
      >
         <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
