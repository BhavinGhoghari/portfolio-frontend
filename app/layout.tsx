import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, JetBrains_Mono } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/hooks/useAuth";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bhavin Ghoghari | MERN Stack Developer",
  description:
    "MERN Stack Developer from Surat, Gujarat — building fast, accessible web apps with React, Node.js & MongoDB.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#060a12",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <body>
        <AntdRegistry>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#101828",
                  color: "#f0f4ff",
                  border: "1px solid #1e2d45",
                  fontFamily: "var(--font-body)",
                },
                success: {
                  iconTheme: { primary: "#34d399", secondary: "#000" },
                },
                error: { iconTheme: { primary: "#f87171", secondary: "#000" } },
              }}
            />
          </AuthProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
