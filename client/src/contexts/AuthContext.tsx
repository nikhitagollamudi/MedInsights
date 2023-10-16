import React, { ReactNode, createContext, useReducer } from 'react';
import { authReducer, initialState, AuthState } from '../reducers/authReducer';

interface AuthContextType {
  authState: AuthState;
  dispatch: React.Dispatch<any>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
