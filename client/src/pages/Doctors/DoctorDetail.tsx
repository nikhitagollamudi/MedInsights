import { Box, Typography, Stack, Chip, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useParams } from "react-router-dom";
import { Helper } from "../../services/helper";
import Feedback from "../../components/doctors/Feedback";
import { useThemeContext } from "../../contexts/ThemeContext";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

const DoctorDetail = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const theme = useThemeContext();
    const primary = theme.currentTheme.palette.primary;
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState<any>(null);
    const [selectedDay, setSelectedDay] = useState<Dayjs | any>(null);
    const [timeSlots, setTimeSlots] = useState<{}[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [notes, setNotes] = useState('');
    const [open, setOpen] = useState(false);

    const handleDayChange = (day: any) => {
        setSelectedDay(day);
        const slots = Helper.getTimeSlots(day);
        setTimeSlots(slots);
    }

    useEffect(() => {
        const result = doctorId && Helper.getDoctorById(Number(doctorId));
        console.log(result)
        result && setDoctor(result);
    }, [doctorId])
    return (
        <Box height={'100%'}>
            {user.role === 'patient' && <Typography variant="h6" mb={5}>Book an appointment</Typography>}
            <Box height={'100%'} component={'div'} display={'flex'}>
                <Box px={2} component={'div'} flex={user.role === 'patient' ? 0.5 : 1} borderRight={user.role === 'patient' ? 1 : 0} borderColor={primary.main}>
                    <Box component={'div'} display={'flex'} alignItems={'center'}>
                        <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'#efefef'} p={3} borderRadius={'50%'} mr={5}>
                            <LocalHospitalIcon fontSize="large" color={'primary'}></LocalHospitalIcon>
                        </Box>
                        <Box component={'div'}>
                            <Typography variant="body1" mb={1} fontWeight={600} color={'primary'}>{doctor?.name}</Typography>
                            <Typography variant="body2" mb={1}>{doctor?.hospital?.name}</Typography>
                            <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
                                {
                                    doctor?.specializations.map((specialization: any) => <Chip color="primary" variant="outlined" key={specialization} size="small" label={specialization} />)
                                }
                            </Stack>
                        </Box>
                    </Box>
                    {
                        doctor?.feedbacks.length && (
                            <Box mt={3} display={'flex'} flexDirection={'column'} gap={1}>
                                <Typography variant="body1">Reviews</Typography>
                                {
                                    doctor?.feedbacks.map((feed: any) => <Feedback feedback={feed} />)
                                }
                            </Box>
                        )
                    }
                </Box>
                {
                    user.role === 'patient' && (
                        <Box component={'div'} flex={0.5}>
                            <Box px={3} component={'div'}>
                                <Typography variant="body1" fontWeight={600}>Appointment Details</Typography>
                                <Typography variant="body1" mt={3} mb={1}>Please select a date</Typography>
                                <DateCalendar views={['day']} disablePast value={selectedDay} onChange={(newValue) => handleDayChange(newValue)} />
                                {
                                    selectedDay && (
                                        <Box component={'div'} mt={3}>
                                            <Typography variant="body1" mb={1}>Please choose a time slot</Typography>
                                            <Stack direction={'row'} gap={1} flexWrap={'wrap'} mb={2}>
                                                {
                                                    timeSlots.length && timeSlots.map((slot: any) => (
                                                        <Chip
                                                            key={slot.id}
                                                            label={slot.label}
                                                            color="primary"
                                                            size="small"
                                                            variant={selectedSlot?.id === slot.id ? 'filled' : 'outlined'}
                                                            clickable
                                                            onClick={() => setSelectedSlot(slot)}
                                                            sx={{ paddingX: 1 }}
                                                        />
                                                    ))
                                                }            
                                            </Stack>
                                            <TextField
                                                id="notes"
                                                label="Appointment Notes (optional)"
                                                multiline
                                                fullWidth
                                                rows={2}
                                                value={notes}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)}
                                                variant="outlined"
                                            />
                                            <Button sx={{ marginTop: 3 }} disabled={!selectedSlot} variant="contained" disableElevation onClick={() => setOpen(true)}>Book appointment</Button>
                                            <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                                                <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
                                                This is a success message!
                                                </Alert>
                                            </Snackbar>
                                        </Box>
                                    )
                                }
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </Box>
    );
}

export default DoctorDetail;
