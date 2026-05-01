import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Party Trick",
  description: "Real-time AI-powered social web app",
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
