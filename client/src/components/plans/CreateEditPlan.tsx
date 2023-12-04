import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText, 
    TextField, Box, InputAdornment, Switch } from "@mui/material";
import { useEffect, useState } from "react";

export interface CreateEditPlanProps {
    open: boolean;
    type: string;
    plan: any;
    onClose: (value?: any) => void;
}

const CreateEditPlan = (props: CreateEditPlanProps) => {
    const { onClose, plan, open, type } = props;
    const [selectedPlan, setSelectedPlan] = useState<any>(null);

    const handleClose = (plan: any) => {
        onClose(plan);
    }

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | any>) => {
        const { name, value, checked } = e.target;
        const newValues = { ...selectedPlan, [name]: name === 'isActive' ? checked as Boolean : value };
        setSelectedPlan(newValues);
    }

    useEffect(() => {
        // const newPlan = { ...plan };
        setSelectedPlan(plan);

        return () => {
            setSelectedPlan(null);
        }
    }, [plan]);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
            {type !== 'view' && <DialogTitle>{type === 'edit' ? 'Edit Plan' : 'Create Plan'}</DialogTitle>}
            <DialogContent>
                <Box>
                    <DialogContentText mb={1}>Plan Name</DialogContentText>
                    <TextField 
                        id="name"
                        name="name"
                        fullWidth
                        disabled={type === 'view'}
                        placeholder="Enter a plan name"
                        variant="outlined" 
                        value={selectedPlan?.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                    />
                </Box>
                <Box mt={1}>
                    <DialogContentText mb={1}>Premium</DialogContentText>
                    <TextField 
                        id="premium"
                        name="premium"
                        fullWidth
                        disabled={type === 'view'}
                        placeholder="Enter the plan premium"
                        variant="outlined" 
                        InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        value={selectedPlan?.premium}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(e)}
                    />
                </Box>
                {
                    type !== 'view' && (
                        <Box mt={1} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <DialogContentText>Switch plan active?</DialogContentText>
                            <Switch
                                id="isActive"
                                name="isActive"
                                checked={selectedPlan?.isActive || false}
                                onChange={(e: React.ChangeEvent) => handleValueChange(e)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Box>
                    )
                }
            </DialogContent>
            <DialogActions>
                {
                    type === 'view' ? 
                        <Button onClick={handleClose}>Close</Button>
                    :
                        <>
                            <Button onClick={() => handleClose(null)}>Cancel</Button>
                            <Button onClick={() => handleClose(selectedPlan)}>{ type === 'edit' ? 'Update' : 'Save' }</Button>
                        </>
                }
            </DialogActions>
        </Dialog>
    );
}

export default CreateEditPlan;