import AuthProvider from "@/context/AuthContext";
import { MarketPlaceProvider } from "@/context/MarketPlaceProvider";
import { DataProvider } from "@/context/DataContext";
import "./globals.css";
import Toast from "@/components/shared/general/Toaster";
import { Montserrat } from "next/font/google";
import ErrorBoundary from "@/utils/validators/errorBoundary";
import GoogleAnalytics from "@/components/shared/general/organisms/GoogleAnalytics/GoogleAnalytics";
import Head from "./head";

const montserratFont = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "iCharter",
  description: "Find the right experience in just one click",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserratFont.className} w-full overflow-x-hidden`}>
      <head>
        <Head />
      </head>
      <body className="!p-0">
        <GoogleAnalytics ga_id="G-HGKH4N83RK" />
        <ErrorBoundary>
          <Toast />
          <AuthProvider>
            <MarketPlaceProvider>
              <DataProvider>
                <main className="flex flex-col items-center justify-center">
                  {children}
                </main>
              </DataProvider>
            </MarketPlaceProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
