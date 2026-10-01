import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muse Market",
  description: "Discover good finds and share product inspiration with your community.",
  icons: {
    icon: "/app-icon-white.png",
    shortcut: "/app-icon-white.png",
    apple: "/app-icon-white.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><link rel="preconnect" href="https://api.fontshare.com"/><link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous"/><link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=switzer@1,2&display=swap"/></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
