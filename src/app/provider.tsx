import { useState } from "react";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  // use Suspense with a defined fallback so something renders
  // in place of the components when they haven't loaded.
  return <>{children}</>;
};
