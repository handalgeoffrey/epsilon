import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GlobalBackground from '../components/GlobalBackground';

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata = {
  title: "Epsilon - Excel in Mathematics",
  description: "Master mathematics with expert guidance from 0 to Infinity.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased bg-transparent min-h-screen font-sans`}
      >
        <GlobalBackground />
        <Navbar />
        <main className="w-full flex flex-col items-center justify-start">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
