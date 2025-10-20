import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/common/Header";
import ReduxProvider from "./providers/ReduxProvider";
import { ConfigProvider, ThemeConfig } from "antd";
import Footer from "./components/common/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | IGNITE Foundation",
    default: "IGNITE Foundation",
  },
};

const themeConfig: ThemeConfig = {
  token: {
    borderRadius: 4,
    fontSize: 16,
  },
  components: {
    Radio: {
      buttonSolidCheckedBg: 'rgb(136,148,166)',
      buttonSolidCheckedHoverBg: 'rgb(127,132,139)',
      borderRadius: 1,
    },
    Checkbox: {
      colorPrimary: "rgb(0,0,0)",
      colorPrimaryHover: "rgb(0,0,0)"
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiasedp`}
      >
        <ReduxProvider>
           <Toaster position="top-center" toastOptions={{ duration: 1500 }} />
          <Header />
          <ConfigProvider theme={themeConfig}>
            <div className=" px-1">{children}</div>
          </ConfigProvider>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
