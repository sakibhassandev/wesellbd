import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Header } from "@/components/Header";
import StoreProvider from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: "WeSell BD",
  description: "A place of uniqueness products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <StoreProvider>
        <html lang="en">
          <body className={`antialiased`}>
            <Header />
            {children}
          </body>
        </html>
      </StoreProvider>
    </ClerkProvider>
  );
}
