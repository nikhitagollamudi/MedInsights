import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react";
import { Helper } from "../../services/helper";
import AuthContext from "../../contexts/AuthContext";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useThemeContext } from "../../contexts/ThemeContext";
import Divider from '@mui/material/Divider';

const drawerWidth = 240;

const getIcon = (item: any) => {
    switch (item.name) {
        case 'Home':
            return <HomeIcon />
        case 'Appointments':
            return <CalendarMonthIcon />
        case 'Doctors':
            return <MedicationIcon />
        case 'Patients':
            return <GroupAddIcon />
        case 'Plans':
            return <ChecklistIcon />
        case 'Insurances':
            return <MedicalInformationIcon />
        case 'Settings':
            return <SettingsIcon />
        default:
            break;
    }
}

const Sidebar = () => {
    const auth = useContext(AuthContext);
    const theme = useThemeContext();
    const [sidebarOptions, setSidebarOptions] = useState<{}[]>([]);
    const [user, setUser] = useState(auth?.authState?.user);
    const primary = theme?.currentTheme.palette.primary.main;

    useEffect(() => {
        setUser(auth?.authState?.user);
        const options = Helper.getSidebarOptionsByRole(auth?.authState?.user?.role);
        setSidebarOptions(options);
    }, [auth]);
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
                <Box mr={2} sx={{ color: primary }}>
                    <PersonIcon />
                </Box>
                <Box>
                    <Typography>{user?.fullName}</Typography>
                    <Typography variant="subtitle2" fontStyle={'italic'}>{user?.role}</Typography>
                </Box>
            </Toolbar>
            <Divider />
            <List>
                {sidebarOptions.map((opt: any) => (
                    <ListItem key={opt.id} disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={{ color: primary }}>
                                {getIcon(opt)}
                            </ListItemIcon>
                            <ListItemText primary={opt.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}

export default Sidebar;