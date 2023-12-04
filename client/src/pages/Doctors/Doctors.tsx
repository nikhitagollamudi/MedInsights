import { Box } from "@mui/material";
import { Helper } from "../../services/helper";
import Search from "../../components/doctors/Search";
import DoctorsList from "../../components/doctors/DoctorsList";
import { useEffect, useState } from "react";

const Doctors = () => {
    const [doctors, setDoctors] = useState<{}[]>([]);
    
    const onSearch = (payload: any) => {
        const result = Helper.getDoctors(payload);
        setDoctors(result);
    }

    useEffect(() => {
        const result = Helper.getDoctors(null);
        setDoctors(result);
    }, [])
    return (
        <Box display={'flex'} flexDirection={'column'} gap={4}>
            <Search onSearch={onSearch} />
            <DoctorsList doctors={doctors} />
        </Box>
    );
}

export default Doctors;