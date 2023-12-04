import { Box, Typography, TextField, Switch } from "@mui/material"
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

const ProfessionalInformation = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const [userProfessionalForm, setUserProfessionalForm] = useState({
        specialization: user?.professionalInformation?.specialization,
        treatsCovid: user?.professionalInformation?.specialization
    });

    useEffect(() => {
        setUserProfessionalForm(user?.professionalInformation);
    }, [user]);

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value, checked } = e.target;
        const newValues = { ...userProfessionalForm, [name]: name === 'specialization' ? value : checked };
        setUserProfessionalForm(newValues);
    }
    return (
        <Box component={'form'} noValidate autoComplete="off">
            <Box>
                <Typography variant="subtitle1" mb={1}>Specialization</Typography>
                <TextField
                    id="specialization"
                    name="specialization"
                    placeholder="Add your professional specializations here. These will be visible on your profile."
                    multiline
                    fullWidth
                    rows={4}
                    value={userProfessionalForm?.specialization}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                />
            </Box>
            <Box mt={2} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-start'}>
                <Typography variant="subtitle1" mb={0} mr={2}>Do you treat patients with symptoms of Covid?</Typography>
                <Switch
                    name="treatsCovid"
                    checked={userProfessionalForm?.treatsCovid}
                    onChange={(e: React.ChangeEvent) => handleValueChange(e)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Box>
        </Box>
    );
}

export default ProfessionalInformation;