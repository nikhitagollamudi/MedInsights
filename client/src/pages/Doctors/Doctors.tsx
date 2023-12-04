import { Box, Typography } from "@mui/material";
import { Helper } from "../../services/helper";
import Search from "../../components/doctors/Search";
import Doctor from "../../components/doctors/Doctor";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState<{}[]>([]);
    
    const onSearch = (payload: any) => {
        const result = Helper.getDoctors(payload);
        setDoctors(result);
    }

    const goToDoctor = (doctor: any) => {
        navigate(`/app/doctors/${doctor.id}`)
    }

    useEffect(() => {
        const result = Helper.getDoctors(null);
        setDoctors(result);
    }, [])
    return (
        <Box display={'flex'} flexDirection={'column'} gap={4}>
            { user.role === 'Patient' && <Search onSearch={onSearch} /> }
            { user.role === 'Insurer' && <Typography variant="h5" fontWeight={600} color={'primary'}>Doctors</Typography> }
            <Box display={'flex'} flexDirection={'column'} gap={3}>
                {
                    doctors.map((doctor: any, index: any) => (
                        <Doctor key={index} doctor={doctor} onClick={goToDoctor} />
                    ))
                }
            </Box>
        </Box>
    );
}

export default Doctors;