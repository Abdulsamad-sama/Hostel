import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer";
import Topbar from "@/components/dashboard/Topbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HostelHub — Find & Manage Student Hostels",
  description:
    "HostelHub is a student-focused hostel marketplace for LAUTECH. Discover, book, and manage hostel accommodation with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col scroll-smooth">
        <Header showGetStarted />
        {children}
        <Footer />
      </body>
    </html>
  );
}
