import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Header } from "@/components/Header";
import StoreProvider from "@/store/StoreProvider";
import { AppContextProvider } from "@/contexts/AppContext";
import { ToastContainer } from "react-toastify";
import { MiniCart } from "@/components/cart/MiniCart";

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
      <AppContextProvider>
        <html lang="en">
          <body className={`antialiased`}>
            <StoreProvider>
              <Header />
              <MiniCart />
            </StoreProvider>
            {children}
            <ToastContainer className="text-sm" />
          </body>
        </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
