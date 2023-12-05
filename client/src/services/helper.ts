import theme1 from '../themes/default';
import theme2 from '../themes/theme1';
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const sidebarOptions = [
    { id: 1, name: 'Home', path: '/app', isPatient: true, isDoctor: true, isInsurance: true },
    { id: 2, name: 'Appointments', path: '/app/appointments', isPatient: true, isDoctor: true, isInsurance: false },
    { id: 3, name: 'Doctors', path: '/app/doctors', isPatient: true, isDoctor: false, isInsurance: true },
    { id: 4, name: 'Patients', path: '/app/patients', isPatient: false, isDoctor: true, isInsurance: true },
    { id: 5, name: 'Plans', path: '/app/plans', isPatient: false, isDoctor: false, isInsurance: true },
    { id: 6, name: 'Insurances', path: '/app/insurances', isPatient: true, isDoctor: true, isInsurance: false },
    { id: 7, name: 'Settings', path: '/app/settings', isPatient: true, isDoctor: true, isInsurance: true },
]

const topBarCards = [
    { id: 1, label: 'Plans', value: 20, key: 'plans', isPatient: true, isDoctor: true, isInsurance: true },
    { id: 2, label: 'Patients', value: 200, key: 'patients', isPatient: false, isDoctor: true, isInsurance: true },
    { id: 3, label: 'Doctors', value: 50, key: 'doctors', isPatient: true, isDoctor: false, isInsurance: true },
    { id: 4, label: 'Appointments', value: 8, key: 'appointments', isPatient: true, isDoctor: true, isInsurance: false }
]

const themeMappings = [
    { id: 1, label: 'theme1', value: theme1 },
    { id: 2, label: 'theme2', value: theme2 }
]

const tabs = [
    { id: 1, label: 'Personal Information', value: 'personal', isPatient: true, isDoctor: true, isInsurance: true },
    { id: 2, label: 'Medical Information', value: 'medical', isPatient: true, isDoctor: false, isInsurance: false },
    { id: 3, label: 'Professional Information', value: 'professional', isPatient: false, isDoctor: true, isInsurance: false }
]

const conditions = [
    { id: 1, label: 'Fever' },
    { id: 2, label: 'Cough' },
    { id: 3, label: 'Fracture' },
    { id: 4, label: 'Covid' }
]

const hardCodedDoctors = [
    {
        id: 2,
        name: 'Dr. Ryan Doe',
        specializations: ['Random Specialization 1', 'Random Specialization 2'],
        treatsCovid: true,
        hospital: {
            id: 1,
            name: 'IU Health'
        },
        feedbacks: [
            { id: 1, from: 'Max', message: 'Very good doctor, patient and understanding.' },
            { id: 2, from: 'Alex', message: 'Very good.' },
            { id: 3, from: 'Maria', message: 'Patient and helpful' },
            { id: 4, from: 'Isaac', message: 'Amazing doctor.' }
        ]
    },
    {
        id: 5,
        name: 'Dr. Negan Doe',
        specializations: ['Random Specialization 1', 'Random Specialization 2', 'Random Specialization 3'],
        treatsCovid: true,
        hospital: {
            id: 2,
            name: 'Bloomington Hospital'
        },
        feedbacks: [
            { id: 1, from: 'Max', message: 'Very good doctor, patient and understanding.' },
            { id: 2, from: 'Alex', message: 'Very good.' },
            { id: 3, from: 'Maria', message: 'Patient and helpful' },
            { id: 4, from: 'Isaac', message: 'Amazing doctor.' }
        ]
    },
    {
        id: 6,
        name: 'Dr. Rick Grimes',
        specializations: ['Random Specialization 1'],
        treatsCovid: false,
        hospital: {
            id: 3,
            name: 'Monroe Hospital'
        },
        feedbacks: [
            { id: 1, from: 'Max', message: 'Very good doctor, patient and understanding.' },
            { id: 2, from: 'Alex', message: 'Very good.' },
            { id: 3, from: 'Maria', message: 'Patient and helpful' },
            { id: 4, from: 'Isaac', message: 'Amazing doctor.' }
        ]
    },
    {
        id: 7,
        name: 'Dr. Morgan Jones',
        specializations: ['Random Specialization 1', 'Random Specialization 3'],
        treatsCovid: false,
        hospital: {
            id: 4,
            name: 'Bloomington Meadows Hospital'
        },
        feedbacks: [
            { id: 1, from: 'Max', message: 'Very good doctor, patient and understanding.' },
            { id: 2, from: 'Alex', message: 'Very good.' },
            { id: 3, from: 'Maria', message: 'Patient and helpful' },
            { id: 4, from: 'Isaac', message: 'Amazing doctor.' }
        ]
    },
    {
        id: 8,
        name: 'Dr. Sean Davis',
        specializations: ['Random Specialization 2', 'Random Specialization 4'],
        treatsCovid: true,
        hospital: {
            id: 1,
            name: 'IU Health'
        },
        feedbacks: [
            { id: 1, from: 'Max', message: 'Very good doctor, patient and understanding.' },
            { id: 2, from: 'Alex', message: 'Very good.' },
            { id: 3, from: 'Maria', message: 'Patient and helpful' },
            { id: 4, from: 'Isaac', message: 'Amazing doctor.' }
        ]
    }
]

const patients = [
    {
        id: 1,
        name: 'John Doe',
        email: 'abc@example.com',
        medicalInformation: {
            id: "1",
            medicalHistory: "Medical history 1",
            covid19Symptoms: {
                fever: true,
                cough: false
            }
        },
        planId: 1
    },
    {
        id: 4,
        name: 'Alex Doe',
        email: 'abc4@example.com',
        medicalInformation: {
            id: "2",
            medicalHistory: "Medical history 2",
            covid19Symptoms: {
                fever: false,
                cough: false
            }
        },
        planId: 3
    },
    {
        id: 3,
        name: 'Max Doe',
        email: 'abc5@example.com',
        medicalInformation: {
            id: "3",
            medicalHistory: "Medical history 3",
            covid19Symptoms: {
                fever: false,
                cough: true
            }
        },
        planId: 4
    },
    {
        id: 2,
        name: 'Kate Doe',
        email: 'abc6@example.com',
        medicalInformation: {
            id: "4",
            medicalHistory: "Medical history 4",
            covid19Symptoms: {
                fever: true,
                cough: false
            }
        },
        planId: 2
    },
    {
        id: 5,
        name: 'Jonathan Doe',
        email: 'abc7@example.com',
        medicalInformation: {
            id: "5",
            medicalHistory: "Medical history 5",
            covid19Symptoms: {
                fever: false,
                cough: false
            }
        },
        planId: 5
    }
]

const days = [
    { label: 'Sunday', value: 'sunday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Monday', value: 'monday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Tuesday', value: 'tuesday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Wednesday', value: 'wednesday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Thursday', value: 'thursday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Friday', value: 'friday', isExpanded: false, startTime: "", endTime: "" },
    { label: 'Saturday', value: 'saturday', isExpanded: false, startTime: "", endTime: "" }
]

const plans = [
    { id: 1, name: 'Plan A', isActive: true, premium: '790', providerData: { MongoId: 3, name: 'Max Doe', email: 'abc3@example.com' } },
    { id: 2, name: 'Plan B', isActive: false, premium: '490', providerData: { MongoId: 3, name: 'Max Doe', email: 'abc3@example.com' } },
    { id: 3, name: 'Plan C', isActive: true, premium: '650', providerData: { MongoId: 3, name: 'Max Doe', email: 'abc3@example.com' } },
    { id: 4, name: 'Plan D', isActive: false, premium: '500', providerData: { MongoId: 3, name: 'Max Doe', email: 'abc3@example.com' } },
    { id: 5, name: 'Plan E', isActive: true, premium: '1200', providerData: { MongoId: 3, name: 'Max Doe', email: 'abc3@example.com' } },
    { id: 6, name: 'Plan F', isActive: true, premium: '1699', providerData: { MongoId: 3, name: 'Max Doe', email: 'abc3@example.com' } }
]

const appointments = [
    {
        id: 1,
        patient: {
            id: 1,
            name: 'John Doe'
        },
        doctor: {
            id: 1,
            name: 'Dr. Negan Doe',
            hospital: {
                id: 2,
                name: 'Bloomington Hospital'
            }
        },
        startTime: '2023-12-04 14:00',
        isComplete: false
    },
    {
        id: 2,
        patient: {
            id: 2,
            name: 'Alex Doe'
        },
        doctor: {
            id: 8,
            name: 'Dr. Sean Davis',
            hospital: {
                id: 1,
                name: 'IU Health'
            }
        },
        startTime: '2023-12-01',
        isComplete: true
    },
    {
        id: 3,
        patient: {
            id: 4,
            name: 'Kate Doe'
        },
        doctor: {
            id: 2,
            name: 'Dr. Ryan Doe',
            hospital: {
                id: 1,
                name: 'IU Health'
            }
        },
        startTime: '2023-12-15',
        isComplete: false
    },
    {
        id: 4,
        patient: {
            id: 1,
            name: 'John Doe'
        },
        doctor: {
            id: 7,
            name: 'Dr. Morgan Jones',
            hospital: {
                id: 4,
                name: 'Bloomington Meadows Hospital'
            }
        },
        startTime: '2023-12-23',
        isComplete: false
    },
    {
        id: 5,
        patient: {
            id: 5,
            name: 'Jonathan Doe'
        },
        doctor: {
            id: 2,
            name: 'Dr. Ryan Doe',
            hospital: {
                id: 1,
                name: 'IU Health'
            }
        },
        startTime: '2023-11-20',
        isComplete: true
    }
]

const getUser = async (): Promise<any> => {
    const user = await axios.get(`${REACT_APP_API_URL}/api/v1/users/me`, {
        withCredentials: true
    });

    if (user.data.status !== 'success') return null; // TODO - Handle error (route to login screen?)

    return user.data.data.user;
}

const updateUser = async (payload: any): Promise<any> => {
    const user = await axios.patch(`${REACT_APP_API_URL}/api/v1/users/updateMe`, payload, {
        withCredentials: true
    });

    if (user.data.status !== 'success') {
        throw new Error(user.data.message);
    }

    return user.data.data.user;
}

const userLogin = async (payload: any): Promise<any> => {
    const user = await axios.post(`${REACT_APP_API_URL}/api/v1/users/login`, {
        email: payload.email,
        password: payload.password,
        totp: payload.totp
    }, {
        withCredentials: true
    });

    if (user.status !== 200) return null; // TODO - Handle error (route to login screen?)

    return {
        token: user.data.token,
        user: user.data.data.user
    };
}

const userRegister = async (payload: any): Promise<any> => {
    const user = await axios.post(`${REACT_APP_API_URL}/api/v1/users/signup`, {
        email: payload.email,
        password: payload.password,
        passwordConfirm: payload.passwordConfirm,
        name: payload.name,
        phone: payload.phone,
        address: payload.address,
        role: payload.role,
        theme: payload.theme
    }, {
        withCredentials: true
    });

    if (user.status !== 200) {
        return null; // TODO - Handle error (route to register screen?)
    }

    return user.data;
}

const getKeyByRole = (role: String) => {
    return role === 'patient' ? 'isPatient' : role === 'doctor' ? 'isDoctor' : 'isInsurance';
}

const getSidebarOptionsByRole = (role: String) => {
    const key = getKeyByRole(role);
    return sidebarOptions.filter(opt => opt[key]);
}

const getTopBarCardsByRole = (role: String) => {
    const key = getKeyByRole(role);
    return topBarCards.filter(obj => obj[key]);
}

const getTopCardsByEmail = async () => {
    const user = await getUser();

    return user?.dashboardMetadata || [];
}

const getNotificationsByEmail = async () => {
    const user = await getUser();

    return user?.recents || [];
}

const getTheme = (theme: String) => {
    return themeMappings.find(opt => opt.label === theme)?.value || theme1;
}

const getTabsByRole = (role: String) => {
    const key = getKeyByRole(role);
    return tabs.filter(obj => obj[key]);
}

const getAllConditions = () => {
    return conditions;
}

const getAllSpecialities = async () => {
    const specialitiesData = await axios.get(`${REACT_APP_API_URL}/api/v1/users/doctor/specs`, {
        withCredentials: true
    });
    return specialitiesData.data.data.data;
}

const getAllDays = () => {
    return days;
}

const getAllTimes = () => {
    let times = [];
    for (let i = 0; i < 24; i++) {
        let timeObj = {
            label: `${i}:00`,
            value: `${i}:00`
        }
        times.push(timeObj)
    }
    return times;
}

const getAllTimesAfter = (time: any) => {
    let times = [], startingIndex = time.split(':')[0];
    for (let i = startingIndex; i < 24; i++) {
        let timeObj = {
            label: `${i}:00`,
            value: `${i}:00`
        }
        times.push(timeObj)
    }
    return times;
}

const getAllPlans = () => {
    return plans;
}

const getAllPatients = () => {
    return patients;
}

// Need to create a 'get all doctors' endpoint on the API
const getDoctors = async (name : string | null, treatsCovid : boolean | null, specializations : [] | null) => {
    const doctors = await axios.get(`${REACT_APP_API_URL}/api/v1/search?name=${name == '' ? null : name}&treatsCovid=${treatsCovid}&specialization=${JSON.stringify(specializations != null ? specializations : [])}`, {
        withCredentials: true
    });

    if (doctors.status !== 200) return [];

    const doctorsList = doctors.data.data;

    return doctorsList.filter((doc: any) => doc.name.toLowerCase());
}

const getAllAppointments = (id: any, role: any) => {
    const key = role === 'doctor' ? 'doctor' : 'patient';
    return appointments.filter((appointment: any) => appointment[key].id == id);
}

const getPlanByUser = (planId: any) => {
    return plans.find(plan => plan.id === planId);
}

const getDoctorById = (id: number) => {
    return hardCodedDoctors.find(doctor => doctor.id === id);
}

const getTimeSlots = (day: any) => {
    const slots = [];
    for (let i = 0; i < 24; i += 2) {
        const obj = {
            label: `${i}:00`
        }
        slots.push(obj);
    }
    return slots;
}

export const Helper = {
    getUser,
    getSidebarOptionsByRole,
    getTopBarCardsByRole,
    getTopCardsByEmail,
    getNotificationsByEmail,
    getTheme,
    getTabsByRole,
    getAllConditions,
    getAllSpecialities,
    getAllDays,
    getAllTimes,
    getAllTimesAfter,
    getAllPlans,
    getDoctors,
    getPlanByUser,
    getDoctorById,
    getTimeSlots,
    getAllAppointments,
    getAllPatients,
    userLogin,
    userRegister,
    updateUser,
}
