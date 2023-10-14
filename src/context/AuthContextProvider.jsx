import React, { createContext, useState } from 'react';

// Create a context
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState(false);

  const value = {auth, setAuth};
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
