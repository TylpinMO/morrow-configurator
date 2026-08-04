import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);
  const image = new URL("/og.png", metadataBase).toString();
  return {
    metadataBase,
    title: "Morrow 01 — Interactive Product Configurator",
    description: "Configure the Morrow 01 task lamp by finish, height, light temperature, and mount.",
    openGraph: { title: "Morrow 01", description: "Light that follows the work.", type: "website", images: [{ url: image, width: 1200, height: 630, alt: "Morrow 01 product configurator" }] },
    twitter: { card: "summary_large_image", title: "Morrow 01", description: "Light that follows the work.", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>;
}
