import { AppBar, Toolbar, Button, Typography, Link } from '@mui/material';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

export function Header() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoggedIn = auth?.authState?.isLoggedIn;

  const handleLogout = () => {
    auth?.dispatch({
      type: 'LOGOUT'
    });
    
    navigate('/');
  }
  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: '#9370DB' }}>
        <Link href="/" sx={{ flexGrow: 1 }} color="inherit" underline="none">
          <Typography variant="h6" sx={{flexGrow:1}} color={'white'}>MedInsights</Typography>
        </Link>
        {
          isLoggedIn ?
          <Link color="inherit">
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Link> : (
            <div className="d-flex">
              <Button href="/login" color="inherit">Login</Button>
              <Button color="inherit">Register</Button>
            </div>
          )
        }
      </Toolbar>
    </AppBar>
  );
}
