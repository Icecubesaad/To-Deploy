import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'
import Header from "@/components/header";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Source Arabia",
  description: "supplier directory web application",
};
const macan = localFont({
  src:[
    {
      path:"../../public/macan/MacanPanWeb-Bold.ttf",
      weight:"700",
    },
    {
      path:"../../public/macan/MacanPanWeb-Medium.ttf",
      weight:"500",
    },
    {
      path:"../../public/macan/MacanPanWeb-Light.ttf",
      weight:"400"
    }
  ],
  variable:"--font-macan"
})
const helve = localFont({
  src:[
    {
      path:"../../public/helvetica-neue/HelveticaNeueCyr-Bold.ttf",
      weight:"700"
    },
    {
      path:"../../public/helvetica-neue/HelveticaNeueCyr-Medium.ttf",
      weight:"500"
    },
    {
      path:"../../public/helvetica-neue/HelveticaNeueCyr-Light.ttf",
      weight:"400"
    }
  ],
  variable:"--font-helve"
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" w-full h-auto flex-col ">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
