import { useContext, useState } from "react";
import { Box, Button, Typography, Link, TextField, IconButton } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { AuthService } from "../../services/authService";
import { useNavigate, useLocation } from "react-router";
import AuthContext from "../../contexts/AuthContext";

const Login = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const handleLogin = async () => {
        const user = await AuthService.login(loginForm);
        if (user) {
            auth?.dispatch({
                type: 'LOGIN',
                payload: user
            });
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/auth/2fa', { state: { from: location.pathname }});
        }
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let newValues = { ...loginForm, [name]: value };
        setLoginForm(newValues);
    }

    return (
        <Box flex={0.5} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
                <Typography variant="h4" color="primary" mb={1} width={1} textAlign={'center'}>Access your healthcare dashboard</Typography>
                <Typography variant="subtitle1" color="inherit" mb={5}>New user? <Link href="/auth/register" color="primary">Create an account</Link></Typography>
            </Box>
            <Box component="form" noValidate autoComplete="off">
                <TextField 
                    id="email" 
                    label="Email" 
                    variant="outlined" 
                    fullWidth
                    name="email"
                    sx={{
                        marginBottom: '1rem'
                    }}
                    required
                    value={loginForm.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                />
                <TextField 
                    id="password" 
                    label="Password" 
                    name="password"
                    variant="outlined" 
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    required
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                    }}
                    value={loginForm.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                />
                <Button 
                    variant="contained" 
                    size="large"
                    fullWidth 
                    onClick={handleLogin} 
                    disableElevation 
                    sx={{ 
                        marginTop: '1rem' 
                    }}>
                    Login
                </Button>
            </Box>
        </Box>
    )
};

export default Login;