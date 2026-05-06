import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import FaviconWatcher from "./FaviconWatcher";
import "./globals.css";

export const metadata: Metadata = {
  title: "Party Trick",
  description: "The portrait you deserve. Drawn wrong. Read right.",
  icons: {
    icon: [{ url: "/favicon-idle.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <FaviconWatcher />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
