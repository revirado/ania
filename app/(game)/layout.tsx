import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ania - El Misterio de la Máscara",
  description: "Un simulador antropológico interactivo",
};

export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="game-layout">
      {children}
    </div>
  );
}