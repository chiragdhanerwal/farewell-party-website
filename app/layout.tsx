import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import { MusicProvider } from "@/components/MusicContext";
import MuteButton from "@/components/MuteButton";

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
        <MusicProvider>
          {/* Mute button is global — visible on every page once music starts */}
          <MuteButton />
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}
