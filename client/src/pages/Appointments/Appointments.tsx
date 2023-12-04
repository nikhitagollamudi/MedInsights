import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TabPanelProps } from "../Settings/Settings";
import Appointment from "../../components/appointments/Appointment";
import { Helper } from "../../services/helper";
import AuthContext from "../../contexts/AuthContext";

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            {children}
          </Box>
        )}
      </div>
    );
}

const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Appointments = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const [selectedTab, setSelectedTab] = useState(1);
    const [appointments, setAppointments] = useState<{}[]>([]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    }

    const handleCancelAppointment = (appointment: any) => {

    }

    const handleMarkComplete = (appointment: any) => {

    }

    useEffect(() => {
        const result = Helper.getAllAppointments(user?.MongoId, user?.role);
        setAppointments(result);
    }, []);
    return (
        <Box>
            <Typography variant="h5" fontWeight={'semibold'} color="primary">Appointments</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mt={3}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Settings tabs">
                    <Tab label="All" value={1} {...a11yProps(1)} />
                    <Tab label="Upcoming" value={2} {...a11yProps(2)} />
                    <Tab label="Expired" value={3} {...a11yProps(3)} />
                </Tabs>
            </Box>
            <Box>
                <CustomTabPanel value={selectedTab} index={1}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            appointments.map((appointment: any) => (
                                <Appointment appointment={appointment} onCancel={handleCancelAppointment} onMarkComplete={handleMarkComplete} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={selectedTab} index={2}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            appointments.filter(((item: any) => !item.isComplete)).map((appointment: any) => (
                                <Appointment appointment={appointment} onCancel={handleCancelAppointment} onMarkComplete={handleMarkComplete} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={selectedTab} index={3}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            appointments.filter(((item: any) => item.isComplete)).map((appointment: any) => (
                                <Appointment appointment={appointment} onCancel={handleCancelAppointment} onMarkComplete={handleMarkComplete} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
            </Box>
        </Box>
    );
}

export default Appointments;