import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reachoout",
  description: "Reachoout - Build your Digital Identity in just minutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
