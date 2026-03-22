import { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [hasAccount, setHasAccount] = useState(false);

  return (
    <AccountContext.Provider value={{ hasAccount, setHasAccount }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within AccountProvider");
  }
  return context;
}
