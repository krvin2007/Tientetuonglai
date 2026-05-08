import type { Metadata } from "next";
import SuiWalletProvider from "@/components/providers/SuiWalletProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tientetuonglai | Đấu Giá SUI Blockchain",
  description: "Nền tảng đấu giá trực tuyến Tientetuonglai - Tương lai của tiền tệ và đấu giá trên blockchain SUI.",
  keywords: "tientetuonglai, đấu giá, SUI, blockchain, tiền tệ tương lai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <SuiWalletProvider>
          {children}
        </SuiWalletProvider>
      </body>
    </html>
  );
}
