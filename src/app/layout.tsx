import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
})

export const metadata: Metadata = {
  title: "AI Resume Analyzer + Job Matcher",
  description: "Upload your resume and get AI-powered ATS analysis and job matching. Free, fast, and no signup required.",
  openGraph: {
    title: "AI Resume Analyzer + Job Matcher",
    description: "Upload your resume and get AI-powered ATS analysis and job matching.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={` h-full antialiased`}
    > 
      <body className="min-h-full flex flex-col {inter.className}">
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>     
  );
}
