import React, { useContext, useReducer, useState } from "react";
import { Box, Button, Typography, Link, TextField, IconButton } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { AuthService } from "../../services/authService";
import { useNavigate } from "react-router";
import AuthContext from "../../contexts/AuthContext";
import { useThemeContext } from "../../contexts/ThemeContext";

const Login = () => {
    const auth = useContext(AuthContext);
    const theme = useThemeContext();
    const primary = theme?.currentTheme.palette.primary.main;
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleLogin = async () => {
        const user = await AuthService.login({
            email: 'abc@example.com',
            name: 'John Doe'
        });
        if (user) {
            auth?.dispatch({
                type: 'LOGIN',
                payload: user
            });
            navigate('/app');
        }
    }

    return (
        <Box height={1} display={'flex'}>
            <Box flex={0.5} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} borderRight={1} borderColor={primary}>
                <Typography variant="h3" mb={5}>
                        Welcome back!
                </Typography>
                <Box textAlign={'center'} mb={5}>
                    <img src={require('../../assets/43071.jpg')} width="50%" />
                </Box>
                <Typography variant="h2" color="primary" textAlign={'center'}>
                    Healthcare at your fingertips!
                </Typography>
            </Box>
            <Box flex={0.5} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'}>
                    <Typography variant="h4" color="primary" mb={1} width={1} textAlign={'center'}>Access your healthcare dashboard</Typography>
                    <Typography variant="subtitle1" color="inherit" mb={5}>New user? <Link href="/register" color="primary">Create an account</Link></Typography>
                </Box>
                <Box>
                    <TextField 
                        id="email" 
                        label="Email" 
                        variant="outlined" 
                        fullWidth
                        sx={{
                            marginBottom: '1rem'
                        }}
                    />
                    <TextField 
                        id="password" 
                        label="Password" 
                        variant="outlined" 
                        fullWidth
                        InputProps={{
                            endAdornment: 
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                        }}
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
        </Box>
    )
};

export default Login;