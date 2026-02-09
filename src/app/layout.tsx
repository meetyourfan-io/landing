import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Meet Your Fan | Where Fans Meet Their Idols",
  description:
    "The platform where fans and content creators arrange real-life meetups and video calls. Giveaways, exclusive media, and Meet & Greets — all in one place.",
  keywords: [
    "meet your fan",
    "influencer meetup",
    "fan meetup",
    "content creator",
    "giveaway",
    "meet and greet",
    "video call influencer",
  ],
  openGraph: {
    title: "Meet Your Fan | Where Fans Meet Their Idols",
    description:
      "The platform where fans and content creators arrange real-life meetups and video calls.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
