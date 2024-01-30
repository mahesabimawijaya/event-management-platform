import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PathContextProvider from "@/context/Path";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UniFy",
  description: "Your trusted event organizer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PathContextProvider>
          <Navbar />
          {children}
          <Footer />
        </PathContextProvider>
      </body>
    </html>
  );
}
