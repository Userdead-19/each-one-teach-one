import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import QueryProvider from "@/components/QueryProvider"; // ✅ Use the new Client Component
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EduLearn",
  description: "An educational platform for collaborative learning",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <QueryProvider>
          {children}
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}
