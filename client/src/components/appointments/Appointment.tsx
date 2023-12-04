import { Card, Box, CardContent, CardActions, Button, Typography } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export interface AppointmentProps {
    appointment: any,
    onCancel?: (appointment: any) => void,
    onMarkComplete?: (appointment: any) => void
}
const Appointment = ({ appointment, onCancel, onMarkComplete }: AppointmentProps) => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;

    const getTimeToAppointment = (startTime: any) => {
        const now = dayjs(new Date());
        dayjs.extend(relativeTime)
        return dayjs(now).to(startTime);
    }
    return (
        <Card variant="outlined" elevation={0} sx={{ display: 'flex', alignItems: 'center', paddingX: 4 }}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'#efefef'} p={2} borderRadius={'50%'} mr={5}>
                <EventAvailableIcon fontSize="large" color={'primary'}></EventAvailableIcon>
            </Box>
            <CardContent>
                <Box>
                    <Typography variant="body1">{user.role === 'Patient' ? appointment?.doctor?.name : appointment?.patient?.name}</Typography>
                    {user.role === 'Patient' && <Typography variant="body2" fontStyle={'italic'}>At - {appointment?.doctor?.hospital?.name}</Typography>}
                </Box>
                <Typography variant="body1" my={1} color={'primary'} fontWeight={'bold'}>{getTimeToAppointment(appointment.startTime)}</Typography>
            </CardContent>
            <CardActions sx={{ marginLeft: 'auto' }}>
                <Box display={'flex'} alignItems={'center'}>
                    { onCancel && !appointment.isComplete && <Button color="primary" onClick={() => onCancel(appointment)}>Cancel</Button> }
                    { user.role === 'Doctor' && onMarkComplete && <Button color="primary" onClick={() => onMarkComplete(appointment)}>{ appointment.isComplete ? 'Completed' : 'Mark as complete' }</Button> }
                </Box>
            </CardActions>
        </Card>
    );
}

export default Appointment;