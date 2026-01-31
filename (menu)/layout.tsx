import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ania - Menú Principal",
  description: "Menú del juego Ania",
};

export default function MenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="menu-layout">
      <main className="menu-container">
        {children}
      </main>
    </div>
  );
}