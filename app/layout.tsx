import type { Metadata } from "next";
import { Geist, Geist_Mono,Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Cursor from "./components/layout/Cursor";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "./components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Jeevan | site",
  description: "portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex">
        <Cursor />
        <TooltipProvider>{children}</TooltipProvider>
        </body>
    </html>
  );
}
