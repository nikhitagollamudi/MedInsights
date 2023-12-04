import { Box, Card, CardContent, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

const Feedback = ({ feedback }: { feedback: any }) => {
    return (
        <Card variant="outlined" elevation={0} sx={{ display: 'flex', alignItems: 'center', paddingX: 3 }}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'} bgcolor={'#efefef'} p={1} borderRadius={'50%'} mr={5}>
                <PersonIcon fontSize="medium" color={'primary'}></PersonIcon>
            </Box>
            <CardContent>
                <Typography variant="body1">{feedback.name}</Typography>
                <Typography variant="body2" my={1}>{feedback.message}</Typography>
            </CardContent>
        </Card>
    );
}

export default Feedback;