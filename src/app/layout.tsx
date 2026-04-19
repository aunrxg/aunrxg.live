import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import { ThemeProvider } from "@/components/ThemeProvider";
import NavbarWrapper from "@/components/NavbarWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Minimalist Portfolio",
  description: "A buttery smooth, high aesthetic portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col relative transition-colors duration-300">
        <ThemeProvider>
          <NoiseOverlay />
          <NavbarWrapper />
          {/* <SmoothScroll> */}
            <PageTransition>
              {children}
            </PageTransition>
          {/* </SmoothScroll> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
