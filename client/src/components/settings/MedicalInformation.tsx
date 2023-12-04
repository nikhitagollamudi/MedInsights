import { Box, TextField, Typography, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

const MedicalInformation = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState?.user;
    const [userMedicalForm, setUserMedicalForm] = useState({
        medicalHistory: user?.medicalHistory,
        covid19Symptoms: {
            fever: user?.covid19Symptoms?.fever,
            cough: user?.covid19Symptoms?.cough
        }
    });

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value } = e.target;
        const newValues = name === 'fever' || name === 'cough' ? 
            { ...userMedicalForm, covid19Symptoms: { ...userMedicalForm.covid19Symptoms, [name]: value === 'false' ? false : true } } : 
            { ...userMedicalForm, [name]: value };
        setUserMedicalForm(newValues);
    }

    useEffect(() => {
        setUserMedicalForm(user?.medicalInformation);
    }, [user]);

    return (
        <Box component={'form'} noValidate autoComplete="off">
            <Box>
                <Typography variant="subtitle1" mb={1}>Medical History</Typography>
                <TextField
                    id="medicalHistory"
                    name="medicalHistory"
                    placeholder="Please provide your medical history, including any pre-existing conditions, allergies, and relevant information. This will help us better understand your health needs."
                    multiline
                    fullWidth
                    rows={4}
                    value={userMedicalForm?.medicalHistory}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                />
            </Box>
            <Box minWidth={350} mt={2}>
                <FormControl>
                    <FormLabel id="covid19Symptoms-fever">Have you had a sudden or prolonged period of fever in the last few days?</FormLabel>
                    <RadioGroup
                        aria-labelledby="covid19Symptoms-fever"
                        name="fever"
                        row
                        value={userMedicalForm?.covid19Symptoms?.fever || false}
                        onChange={(e: any) => handleValueChange(e)}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box minWidth={350} mt={2}>
                <FormControl>
                    <FormLabel id="covid19Symptoms-cough">Have you been experiencing cough symptoms?</FormLabel>
                    <RadioGroup
                        aria-labelledby="covid19Symptoms-cough"
                        name="cough"
                        row
                        value={userMedicalForm?.covid19Symptoms?.cough || false}
                        onChange={(e: any) => handleValueChange(e)}
                    >
                        <FormControlLabel value={true} control={<Radio />} label="Yes" />
                        <FormControlLabel value={false} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Box>
    );
}

export default MedicalInformation;