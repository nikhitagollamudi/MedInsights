import React, { ReactNode, createContext, useEffect, useReducer } from 'react';
import { authReducer, initialState, AuthState } from '../reducers/authReducer';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const checkUserStatus = async () => {
    //TODO: Replace with /me API call
    const user = localStorage.getItem('user');
    if (user) {
      dispatch({
        type: 'LOGIN',
        payload: JSON.parse(user)
      });
      navigate('/app');
    }
  }

  useEffect(() => {
    checkUserStatus();
  }, [])

  return (
    <AuthContext.Provider value={{ authState, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
