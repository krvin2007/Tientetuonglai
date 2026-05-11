import type { Metadata } from "next";
import SuiWalletProvider from "@/components/providers/SuiWalletProvider";
import { UserProvider } from "@/components/providers/UserProvider";
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
        <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: 'red', color: 'white', padding: '2px 10px', fontSize: '10px', borderRadius: '0 0 5px 5px', pointerEvents: 'none' }}>
          BUILD: 2026-05-11 11:42 (v1.1.6)
        </div>
        <SuiWalletProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </SuiWalletProvider>
      </body>
    </html>
  );
}
