// app/layout.jsx
"use client";

import Navbar from "@/components/Navbar";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout({ children }) {
  // Create QueryClient only once
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <div className="min-h-screen bg-gray-50 py-8">{children}</div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
