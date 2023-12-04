import { Box, Typography, TextField, InputAdornment, IconButton, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useContext, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { Visibility, VisibilityOff } from "@mui/icons-material"
import AuthContext from "../../contexts/AuthContext";
import theme1 from "../../themes/default";
import theme2 from "../../themes/theme1";
import { useThemeContext } from "../../contexts/ThemeContext";

const ThemeMenuItem = ({item}: {item: string}) => {
    const selectedTheme = item === 'theme1' ? theme1 : theme2;
    const primary = selectedTheme?.palette.primary;
    
    return (
        <Box display={'flex'} alignItems={'center'} flex={1}>
            <Box flex={0.2} bgcolor={primary.main} minHeight={28}></Box>
            <Box flex={0.8} ml={4}>
                <Typography variant="subtitle1" textTransform={'capitalize'}>{item}</Typography>
            </Box>
        </Box>
    )
}

const PersonalInformation = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState?.user;
    const { toggleTheme } = useThemeContext();
    const [showPassword, setShowPassword] = useState(false);
    const [userForm, setUserForm] = useState(user);
    
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleValueChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        if (name === 'theme') {
            toggleTheme();
        }
        const newUserForm = { ...userForm, [name]: value}
        setUserForm(newUserForm);
    }
    return (
        <Box component="form" noValidate autoComplete="off">
            <Box 
                component={'div'} 
                borderRadius={'50%'} 
                width={75} 
                height={75} 
                display={'flex'} 
                alignItems={'center'} 
                justifyContent={'center'}
                bgcolor={'#efefef'}
                mb={4}
            >
                <PersonIcon />
            </Box>
            <Box flex={1} flexDirection={'row'} alignItems={'center'} mb={4}>
                <TextField 
                    id="name"
                    name="name"
                    label="Full Name" 
                    variant="outlined" 
                    value={userForm.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                    sx={{
                        marginRight: '2rem',
                        minWidth: 350
                    }}
                />
                <TextField 
                    id="email" 
                    name="email"
                    label="Email" 
                    variant="outlined" 
                    value={userForm.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                    sx={{
                        minWidth: 350
                    }}
                />
            </Box>
            <Box flex={1} flexDirection={'row'} alignItems={'center'} mb={4}>
                <TextField 
                    id="password" 
                    name="password"
                    label="Password" 
                    variant="outlined" 
                    value={userForm.password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                    }}
                    sx={{
                        marginRight: '2rem',
                        minWidth: 350
                    }}
                />
                <FormControl disabled sx={{ minWidth: 350 }}>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={userForm.role.toLowerCase()}
                        onChange={(e: any) => handleValueChange(e)}
                        label="Role"
                        >
                        <MenuItem value={'patient'}>Patient</MenuItem>
                        <MenuItem value={'doctor'}>Doctor</MenuItem>
                        <MenuItem value={'insurer'}>Insurance Provider</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box>
                <FormControl sx={{ minWidth: 350 }}>
                    <InputLabel id="theme-label">Theme</InputLabel>
                    <Select
                        labelId="theme-label"
                        id="theme"
                        name="theme"
                        value={userForm.theme}
                        onChange={(e: any) => handleValueChange(e)}
                        label="Theme"
                        renderValue={(selected) => <ThemeMenuItem item={selected} />}
                        >
                        <MenuItem value={'theme1'}>
                            <ThemeMenuItem item={"theme1"} />
                        </MenuItem>
                        <MenuItem value={'theme2'}>
                            <ThemeMenuItem item={"theme2"} />
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}

export default PersonalInformation;