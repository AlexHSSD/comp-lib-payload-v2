import { fetchGlobals } from "@/graphql";
import { Ubuntu, Open_Sans } from "next/font/google";

const primary = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-primary",
});
const secondary = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-secondary",
});

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import "@/css/globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { header, footer } = await fetchGlobals();
  return (
    <html lang="en" className={`${primary.variable} ${secondary.variable}`}>
      <head />
      <body>
        <Header header={header} />
        {children}
        <Footer footer={footer} />
      </body>
    </html>
  );
}
