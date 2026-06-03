import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {Inter } from "next/font/google";


const inter = Inter({
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <Navbar />

        <main className="min-h-screen ">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}