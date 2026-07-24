import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Diagnóstico de Maturidade | Lucrando com Delivery",
  description:
    "Diagnóstico completo para donos de delivery: descubra o real estado do seu negócio em lucratividade, controladoria, financeiro, processos, equipe e marketing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={poppins.variable}>
      <body className="bg-bg text-body min-h-screen antialiased">{children}</body>
    </html>
  );
}
