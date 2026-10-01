import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

// Lato ships no 500 on Google Fonts; font-medium falls back to 400.
const lato = Lato({
  variable: "--font-lato-family",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Alter Studio",
  description:
    "Discover space you truly belong in. Curated luxury residences, digital walk-throughs and trusted investment frameworks.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lato.variable} antialiased`}>
      <body className="bg-[#F8F8F8] font-lato">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
