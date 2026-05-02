import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Party Trick",
  description: "The portrait you deserve. Drawn wrong. Read right.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
