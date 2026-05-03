import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

const inter    = Inter({ subsets: ["latin"], variable: "--font-sans-loaded" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display-loaded" });
const caveat   = Caveat({ subsets: ["latin"], variable: "--font-script-loaded" });

export const metadata: Metadata = {
  title: "Bali Fastboat Previews",
  description: "5 design previews for a Bali fastboat operator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${caveat.variable} h-full`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
