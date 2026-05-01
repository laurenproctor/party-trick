import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Party Trick",
  description: "Describe a moment. Get a cursed image. Pass the phone.",
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
