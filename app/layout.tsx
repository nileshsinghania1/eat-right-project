import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Eat Right Project | Nutty Chocolate Coco Bites",
  description: "Single-ingredient-forward snacks with no added sugar and no preservatives. Buy 2 get 1 free.",
  metadataBase: new URL("https://www.theeatrightproject.in"),
  openGraph: {
    title: "The Eat Right Project",
    description: "Nutty Chocolate Coco Bites — Buy 2 get 1 free",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
