import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/AuthProvider";

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
        <link rel="manifest" href="/site.webmanifest" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="32c03a2f-3a05-4666-b927-ab34f08c7e1c"
        ></script>
      </head>
      <body className={`antialiased`}>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
