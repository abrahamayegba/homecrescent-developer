import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@/src/apollo/ApolloProvider";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homecrescent",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ApolloProvider>
        <body className={dmSans.className}>{children}</body>
      </ApolloProvider>
    </html>
  );
}
