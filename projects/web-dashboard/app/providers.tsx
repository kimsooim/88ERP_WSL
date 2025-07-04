'use client';

import { LogProvider } from './contexts/LogContext';
import { AuthProvider } from './contexts/AuthContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LogProvider>
        {children}
      </LogProvider>
    </AuthProvider>
  );
}