"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "authProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
