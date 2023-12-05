import { Card, Box, CardContent, Typography, CardActions, IconButton, Button } from "@mui/material";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export interface PlanProps {
    plan: any,
    onPlanUpdate?:(plan?: any) => void,
    onPlanDelete?:(plan?: any) => void, 
    onPlanView?:(plan?: any) => void,
    onPlanSubscribe?:(plan?: any) => void,
    onPlanAccept?:(plan?: any) => void
}

const Plan = ({ plan, onPlanUpdate, onPlanDelete, onPlanView, onPlanSubscribe, onPlanAccept }: PlanProps) => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    return (
        <Card variant="outlined" elevation={0} sx={{ display: 'flex', alignItems: 'center', paddingX: 4 }}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'#efefef'} p={2} borderRadius={'50%'} mr={5}>
                <HealthAndSafetyIcon fontSize="large" color={'primary'}></HealthAndSafetyIcon>
            </Box>
            <CardContent>
                <Box>
                    <Typography variant="body1">{plan.name}</Typography>
                    <Typography variant="body2" fontStyle={'italic'}>By - {plan.providerData.name}</Typography>
                </Box>
                <Typography variant="body1" my={1} color={'primary'} fontWeight={'bold'}>$ {plan.premium}</Typography>
            </CardContent>
            <CardActions sx={{ marginLeft: 'auto' }}>
                <Box display={'flex'} alignItems={'center'}>
                    { onPlanView &&  <IconButton color="primary" onClick={() => onPlanView(plan)}>
                        <VisibilityIcon />
                    </IconButton> }
                    { onPlanUpdate && <IconButton color="primary" onClick={() => onPlanUpdate(plan)}>
                        <EditIcon />
                    </IconButton> }
                    { onPlanDelete && <IconButton color="primary" onClick={() => onPlanDelete(plan)}>
                        <DeleteIcon />
                    </IconButton> }
                    { user.role === 'patient' && onPlanSubscribe && <Button color="primary" disabled={ user?.planId === plan.id } onClick={() => onPlanSubscribe(plan)}>{ user?.planId === plan.id ? 'Subscribed' : 'Subscribe' }</Button> }
                    { user.role === 'doctor' && onPlanAccept && <Button color="primary" disabled={ user?.planId === plan.id } onClick={() => onPlanAccept(plan)}>{ user?.planId === plan.id ? 'Accepted' : 'Accept' }</Button> }
                </Box>
            </CardActions>
        </Card>
    );
}

export default Plan;
