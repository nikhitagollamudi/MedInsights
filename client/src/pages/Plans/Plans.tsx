import { Box, Button, Typography, Tabs, Tab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { TabPanelProps } from "../Settings/Settings";
import { useContext, useEffect, useState } from "react";
import Plan from "../../components/plans/Plan";
import { Helper } from "../../services/helper";
import CreateEditPlan from "../../components/plans/CreateEditPlan";
import AuthContext from "../../contexts/AuthContext";

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            {children}
          </Box>
        )}
      </div>
    );
}

const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Plans = () => {
    const auth = useContext(AuthContext);
    const user = auth?.authState.user;
    const [selectedTab, setSelectedTab] = useState<number>(1);
    const [open, setOpen] = useState(false);
    const [allPlans, setAllPlans] = useState<{}[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [dialogType, setDialogType] = useState('');
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    }
    const handleClose = (plan: any) => {
        if (!plan) {
            setOpen(false);
        } else {
            !plan.id ? createPlan(plan) : editPlan(plan);
            setOpen(false);
        }
        setSelectedPlan(null);
    }
    const handleCreatePlan = () => {
        const newPlan = {
            name: '',
            premium: ''
        }
        setDialogType('create');
        setSelectedPlan(newPlan);
        setOpen(open => !open);
    }

    const handleEditPlan = (plan: any) => {
        setDialogType('edit');
        setSelectedPlan(plan);
        setOpen(open => !open);
    }

    const handleDeletePlan = (plan: any) => {
        const index = allPlans.findIndex((item: any) => item.id === plan.id);
        const newValues = [...allPlans.slice(0, index), ...allPlans.slice(index + 1)];
        setAllPlans(newValues);
    }

    const createPlan = (plan: any) => {
        const newPlan = { ...plan, id: allPlans.length + 1, providerData: { MongoId: user?.MongoId, name: user?.name } };
        const newValues = [...allPlans, ...[newPlan]];
        setAllPlans(newValues);
    }

    const editPlan = (plan: any) => {
        const index = allPlans.findIndex((item: any) => item.id === plan.id);
        const updatedPlan = { ...allPlans[index], ...plan };
        const newValues = [ ...allPlans.slice(0, index), updatedPlan, ...allPlans.slice(index + 1) ];
        setAllPlans(newValues);
    }

    useEffect(() => {
        const plans = Helper.getAllPlans();
        setAllPlans(plans);
    }, [])
    return (
        <Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant="h5" fontWeight={'semibold'} color="primary">All Plans</Typography>
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreatePlan}>
                    Create Plan
                </Button>
                <CreateEditPlan open={open} onClose={handleClose} plan={selectedPlan} type={dialogType} />
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} mt={3}>
                <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Settings tabs">
                    <Tab label="All" value={1} {...a11yProps(1)} />
                    <Tab label="Active" value={2} {...a11yProps(2)} />
                    <Tab label="Inactive" value={3} {...a11yProps(3)} />
                </Tabs>
            </Box>
            <Box>
                <CustomTabPanel value={selectedTab} index={1}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            allPlans.map((plan: any) => (
                                <Plan plan={plan} onPlanView={handleEditPlan} onPlanUpdate={handleEditPlan} onPlanDelete={handleDeletePlan} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={selectedTab} index={2}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            allPlans.filter(((item: any) => item.isActive)).map((plan: any) => (
                                <Plan plan={plan} onPlanView={handleEditPlan} onPlanUpdate={handleEditPlan} onPlanDelete={handleDeletePlan} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
                <CustomTabPanel value={selectedTab} index={3}>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                        {
                            allPlans.filter(((item: any) => !item.isActive)).map((plan: any) => (
                                <Plan plan={plan} onPlanView={handleEditPlan} onPlanUpdate={handleEditPlan} onPlanDelete={handleDeletePlan} />
                            ))
                        }
                    </Box>
                </CustomTabPanel>
            </Box>
        </Box>
    );
}

export default Plans;