import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Configuración básica para un juego
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Deshabilitar características no necesarias para un juego
  poweredByHeader: false,
  
  // Configuración de cabeceras para assets
  headers: async () => {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Configuración para desarrollo
  ...(process.env.NODE_ENV === 'development' && {
    // Puedes añadir configuraciones específicas de desarrollo aquí
  }),
};

export default nextConfig;