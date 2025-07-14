import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Reachoout",
  description: "Reachoout - Build your Digital Identity in just minutes",
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon.ico",
  //   apple: "/apple-touch-icon.png",
  // },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        /> */}
        <link rel="manifest" href="/site.webmanifest" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="32c03a2f-3a05-4666-b927-ab34f08c7e1c"
        ></script>
      </head>
      <body className={`antialiased`}>
        <main>{children}</main>
        <Toaster richColors />
      </body>
    </html>
  );
}
