import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Yarden Biton — AI Engineer & Full Stack Developer",
  description:
    "Personal portfolio of Yarden Biton — AI Engineer & Full Stack Developer specializing in AI agent architectures and production-grade applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-[#f9f9f7] text-[#111]`}>
        {children}
      </body>
    </html>
  );
}
