import type { Metadata } from "next";

// @ts-expect-error Next.js loads this stylesheet at runtime.
import "./globals.css";

export const metadata: Metadata = {
  title: "My Application",
  description: "Full-stack application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};
