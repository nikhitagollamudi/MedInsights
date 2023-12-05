import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { AuthService } from "../../services/authService";
import AuthContext from "../../contexts/AuthContext";

const TwoFactorAuth = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [showQrCode, setShowQrCode] = useState(false);
    const [secretCode, setSecretCode] = useState('');
    const location = useLocation();
    
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    const goToDashboard = async () => {
        if (secretCode === '') {
            return;
        }

        const userLoginInfo = JSON.parse(localStorage.getItem('userLoginInfo') || '{}');

        const user = await AuthService.login({
            email: userLoginInfo.email,
            password: userLoginInfo.password,
            totp: secretCode
        });

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.removeItem('userLoginInfo');
            auth?.dispatch({
                type: 'LOGIN',
                payload: user
            });
            navigate('/app');
        }else{
            alert('Invalid login');
        }
    }

    useEffect(() => {
        setShowQrCode(location.state?.from === '/auth/register');
    }, []);

    return (
        <Box flex={0.4} margin={'0 auto'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
            {
                showQrCode && (
                    <>
                        <Typography variant="h5" color="primary" mb={1} width={1} textAlign={'center'}>Use an authenticator app to register</Typography>
                        <Box width={300} height={300}>
                            <img src={userData.qrCode} alt="" width={'100%'} height={'100%'} />
                        </Box>
                    </>
                )
            }
            <TextField 
                id="secretCode" 
                label="Verification Code"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                variant="outlined"
                onChange={(e) => setSecretCode(e.target.value)}
                required
            />
            <Button 
                variant="contained" 
                size="large"
                fullWidth 
                onClick={goToDashboard} 
                disableElevation 
                sx={{ 
                    marginTop: '2rem' 
                }}>
                Continue to dashboard
            </Button>
        </Box>
    );
}

export default TwoFactorAuth;
