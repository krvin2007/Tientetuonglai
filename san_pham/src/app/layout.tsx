import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SUI Auction | Đấu Giá Đa Dạng Tài Sản Trên Blockchain",
  description: "Nền tảng đấu giá trực tuyến đa dạng tài sản trên blockchain SUI. Đồ gia dụng, vật phẩm game, thời trang, đồ cổ - Giao dịch minh bạch, an toàn và nhanh chóng.",
  keywords: "đấu giá, auction, SUI, blockchain, NFT, tài sản, gia dụng, game, thời trang, đồ cổ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
      </body>
    </html>
  );
}
