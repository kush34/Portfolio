import type { Metadata } from "next";
import "./globals.css";
import PortfolioTools from "@/components/portfolio-tools";

export const metadata: Metadata = {
  title: "Chatt Kush | Portfolio",
  description:
    "Chatt Kush | Software Developer Portfolio showcasing projects, skills, and experience in modern web development.",
  openGraph: {
    title: "KushDev",
    description: "Chatt Kush | Software Developer Portfolio",
    images: [
      "https://res.cloudinary.com/dbmtsiyqt/image/upload/v1750407061/Screenshot_2025-06-20_134029_vtts3h.png",
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KushDev",
    description: "Chatt Kush | Software Developer Portfolio",
    images: [
      "https://res.cloudinary.com/dbmtsiyqt/image/upload/v1750407061/Screenshot_2025-06-20_134029_vtts3h.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Hanken+Grotesk:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PortfolioTools />
        {children}
      </body>
    </html>
  );
}
