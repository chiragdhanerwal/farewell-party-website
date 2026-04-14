import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "THE END OF AN ERA",
  description: "Join the most exclusive farewell party.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}
