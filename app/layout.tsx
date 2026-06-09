import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "CreditGuard — Prediksi Risiko Gagal Bayar",
  description: "Decision-support credit default prediction berbasis Machine Learning dengan SHAP. CreditGuard.",
  icons: {
    icon: "/credit.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PageTransition>
            <SmoothScroll>{children}</SmoothScroll>
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
