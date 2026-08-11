import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/ecommerce/CartDrawer";
import "./globals.css";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "BHADOHI ARTS WEAVE | The World of Carpet Design",
  description: "Bhadohi Arts Weave brings you the finest range of Handmade, Handloom, Machine Made and Wall-to-Wall Carpets crafted with precision, passion and perfection.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user as any;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <Header user={user} />
        <CartDrawer />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
