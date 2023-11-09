import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import TopBar from "../../components/home/TopBar";
import { Box, Typography } from "@mui/material";
import NotificationCard from "../../components/common/NotificationCard";
import { Helper } from "../../services/helper";


const DashboardHome = () => {
    const auth = useContext(AuthContext);
    const [notifications, setNotifications] = useState<{}[]>([]);

    useEffect(() => {
        const data = Helper.getNotificationsByEmail(auth?.authState?.user.email);
        setNotifications(data);
    }, []);

    return (
        <Box>
            <Typography variant="h6" fontWeight={600} mb={4}>Highlights</Typography>
            <TopBar />
            <Box sx={{ marginTop: 12 }}>
                <Typography variant="h6" fontWeight={600} mb={4}>Recent</Typography>
                {
                    notifications.length && notifications.map((notif, index) => (
                        <NotificationCard key={index} notification={notif} />
                    ))
                }
            </Box>
        </Box>
    );
}

export default DashboardHome;