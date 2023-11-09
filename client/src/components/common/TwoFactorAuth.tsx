import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

const TwoFactorAuth = () => {
    const navigate = useNavigate();
    const [showQrCode, setShowQrCode] = useState(false);
    const location = useLocation();

    const goToDashboard = () => {
        navigate('/app');
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
                            <img src={require('../../assets/qrcode.png')} width={'100%'} height={'100%'} />
                        </Box>
                    </>
                )
            }
            <TextField 
                id="secretCode" 
                label="Verification Code"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                variant="outlined"
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