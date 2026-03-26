"use client";

import React, { useState, useEffect } from "react";
import PageTransition from "@/components/ui/PageTransition";
import Cursor from "@/components/ui/Cursor";

interface ClientShellProps {
  children: React.ReactNode;
}

const ClientShell: React.FC<ClientShellProps> = ({ children }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Small delay to ensure styles are loaded and transition feels smooth
    const timer = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!ready && <PageTransition />}
      <Cursor />
      {children}
    </>
  );
};

export default ClientShell;
