import { createContext, useContext, useState } from 'react';

const ScanResultIDContext = createContext(); // Create the context

export function useScanResultID() {
  return useContext(ScanResultIDContext); // Use the context hook
}

export function ScanResultIDProvider({ children }) {
  const [scanResultID, setScanResultID] = useState(0);

  return (
    <ScanResultIDContext.Provider value={{ scanResultID, setScanResultID }}>
      {children}
    </ScanResultIDContext.Provider>
  );
}
