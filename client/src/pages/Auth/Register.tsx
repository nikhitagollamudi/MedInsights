import { useContext, useState } from "react";
import { Box, Typography, TextField, InputAdornment, IconButton, Button, Link, FormControl, InputLabel, Select, MenuItem, 
    SelectChangeEvent } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { AuthService } from "../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const Register = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [role, setRole] = useState('');
    const handleClickShowPassword = (isConfirm: Boolean) => isConfirm ? setShowPasswordConfirm((show) => !show) : setShowPassword((show) => !show);

    const handleRole = (event: SelectChangeEvent) => {
        setRole(event.target.value as string);
    };

    const handleRegister = async () => {
        const user = await AuthService.register({
            fullName: 'John Doe',
            email: 'abc@example.com',
            role: 'Patient'
        });
        if (user) {
            auth?.dispatch({
                type: 'REGISTER',
                payload: user
            });
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/auth/2fa', { state: { from: location.pathname }});
        }
    }

    return (
        <Box flex={0.4} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} margin={'0 auto'}>
            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'} maxWidth={'80%'}>
                <Typography variant="h4" color="primary" mb={1} width={1} textAlign={'left'}>Get free access to your one-stop healthcare dashboard</Typography>
                <Typography variant="subtitle1" color="inherit" mb={5}>Already a user? <Link href="/auth/login" color="primary">Login</Link></Typography>
            </Box>
            <Box maxWidth={'80%'}>
                <TextField 
                    id="name" 
                    label="Full Name" 
                    variant="outlined" 
                    fullWidth
                    sx={{
                        marginBottom: '1rem'
                    }}
                />
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
                                    onClick={() => handleClickShowPassword(false)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }}
                    sx={{
                        marginBottom: '1rem'
                    }}
                />
                <TextField 
                    id="passwordConfirm" 
                    label="Confirm Password" 
                    variant="outlined" 
                    fullWidth
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword(true)}
                                    edge="end"
                                >
                                    {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }}
                    sx={{
                        marginBottom: '1rem'
                    }}
                />
                <FormControl fullWidth>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        value={role}
                        label="Role"
                        onChange={handleRole}
                        >
                        <MenuItem value={'patient'}>Patient</MenuItem>
                        <MenuItem value={'doctor'}>Doctor</MenuItem>
                        <MenuItem value={'insurer'}>Insurance Provider</MenuItem>
                    </Select>
                </FormControl>
                <Button 
                    variant="contained" 
                    size="large"
                    fullWidth 
                    onClick={handleRegister} 
                    disableElevation 
                    sx={{ 
                        marginTop: '2rem' 
                    }}>
                    Sign Up
                </Button>
            </Box>
        </Box>
    )
}

export default Register;