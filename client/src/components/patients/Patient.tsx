import { Box, Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { Helper } from "../../services/helper";

export interface PatientProps {
    patient: any
}

const Patient = ({ patient }: PatientProps) => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;

    const getPlan = (id: any) => {
        return Helper.getPlanByUser(id)?.name;
    }
    return (
        <Card variant="outlined" elevation={0} sx={{ display: 'flex', alignItems: 'center', paddingX: 4 }}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'#efefef'} p={1} borderRadius={'50%'} mr={5}>
                <PersonIcon fontSize="large" color={'primary'}></PersonIcon>
            </Box>
            <CardContent>
                <Box>
                    <Typography variant="body1">{patient?.name}</Typography>
                    <Typography variant="body2">{patient?.email}</Typography>
                    <Typography variant="body2">Insurance: {getPlan(patient.planId)}</Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ marginLeft: 'auto' }}>
                
            </CardActions>
        </Card>
    );
}

export default Patient;