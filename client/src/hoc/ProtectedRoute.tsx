import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const withProtectedRoute = (Component: React.ComponentType<any>) => {
    return (props: any) => {
      const auth = useContext(AuthContext);
      const navigate = useNavigate();

      if (!auth) {
        // handle the error, probably throw an error or navigate to a different page
        navigate('/');
        return null;
      }
  
      if (!auth.authState.isLoggedIn) {
        navigate('/login');
        return null;
      }
  
      return <Component {...props} />;
    };
};

export default withProtectedRoute;