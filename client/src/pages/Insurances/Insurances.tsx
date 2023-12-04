import { Box, Typography, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Helper } from "../../services/helper";
import CreateEditPlan from "../../components/plans/CreateEditPlan";
import Plan from "../../components/plans/Plan";
import { useThemeContext } from "../../contexts/ThemeContext";

const Insurances = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const theme = useThemeContext();
    const primary = theme?.currentTheme?.palette.primary;
    const [plans, setPlans] = useState<{}[]>([]);
    const [userPlan, setUserPlan] = useState<any>(null);
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen(open => !open);
    }

    const handlePlanSubscribe = (plan: any) => {

    }

    const handlePlanAccept = (plan: any) => {
        
    }

    useEffect(() => {
        const plans = Helper.getAllPlans();
        const userPlan = Helper.getPlanByUser(user?.planId);
        setPlans(plans.filter(plan => plan.isActive));
        setUserPlan(userPlan);
    }, []);

    return (
        <Box>
            {
                user.role === 'Patient' && userPlan && (
                    <Box p={2} border={1} borderRadius={4} borderColor={primary.main} mb={3}>
                        <Typography variant="h6" color={'primary'} fontWeight={600}>My Plan</Typography>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} mt={1}>
                            <Typography variant="body1" fontWeight={500}>{userPlan.name}</Typography>
                            <Button onClick={toggleOpen}>View</Button>
                        </Box>
                        <CreateEditPlan open={open} onClose={toggleOpen} plan={userPlan} type={'view'} />
                    </Box>
                )
            }
            <Typography variant="h5" color={'primary'} mb={1}>Available Plans</Typography>
            <Box display={'flex'} flexDirection={'column'} gap={3} mt={3}>
                {
                    plans.map((plan: any) => (
                        <Plan plan={plan} onPlanSubscribe={handlePlanSubscribe} onPlanAccept={handlePlanAccept} />
                    ))
                }
            </Box>
        </Box>
    );
}

export default Insurances;