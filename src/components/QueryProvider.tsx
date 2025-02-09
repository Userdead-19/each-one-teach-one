"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient()); // ✅ Ensure stability across renders

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
