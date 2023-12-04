import theme1 from '../themes/default';
import theme2 from '../themes/theme1';

const users = [
    {
        MongoId: '1',
        name: 'John Doe',
        email: 'abc@example.com',
        role: 'Patient',
        theme: 'theme1',
        dashboardMetadata: [
            { id: 1, label: 'Plans', value: 20, key: 'plans' },
            { id: 2, label: 'Doctors', value: 50, key: 'doctors' },
            { id: 3, label: 'Appointments', value: 8, key: 'appointments' }
        ],
        recents: [
            { id: 1, date: '10/29/2023', body: 'You unsubscribed from the insurance plan: Medicare Plan B. Click here to view more details.' },
            { id: 2, date: '10/23/2023', body: 'You have an upcoming appointment with Dr. Jane. To modify or cancel the appointment, click here.' },
            { id: 3, date: '10/10/2023', body: 'Dr. Ryan replied to your message. Click here to view the message and reply back.' },
            { id: 4, date: '09/13/2023', body: 'Payment successful! You subscribed to the Medicare Plan A. Click to view your insurance plan details.' },
        ],
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
        MongoId: '4',
        name: 'Alex Doe',
        email: 'abc4@example.com',
        role: 'Patient',
        theme: 'theme2',
        dashboardMetadata: [
            { id: 1, label: 'Plans', value: 20, key: 'plans' },
            { id: 2, label: 'Doctors', value: 50, key: 'doctors' },
            { id: 3, label: 'Appointments', value: 8, key: 'appointments' }
        ],
        recents: [
            { id: 1, date: '10/29/2023', body: 'You unsubscribed from the insurance plan: Medicare Plan B. Click here to view more details.' },
            { id: 2, date: '10/23/2023', body: 'You have an upcoming appointment with Dr. Jane. To modify or cancel the appointment, click here.' },
            { id: 3, date: '10/10/2023', body: 'Dr. Ryan replied to your message. Click here to view the message and reply back.' },
            { id: 4, date: '09/13/2023', body: 'Payment successful! You subscribed to the Medicare Plan A. Click to view your insurance plan details.' },
        ],
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
        MongoId: '2',
        name: 'Ryan Doe',
        email: 'abc2@example.com',
        role: 'Doctor',
        theme: 'theme2',
        dashboardMetadata: [
            { id: 1, label: 'Appointments', value: 12, key: 'appointments' },
            { id: 2, label: 'Patients', value: 150, key: 'patients' },
            { id: 3, label: 'Plans', value: 43, key: 'plans' }
        ],
        recents: [
            { id: 1, date: '11/03/2023', body: 'You added the insurance plan: Medicare Plan B to your accepted list. Click here to view more details.' },
            { id: 2, date: '10/29/2023', body: 'You have an upcoming appointment with John. To modify or cancel the appointment, click here.' },
            { id: 3, date: '10/18/2023', body: 'Roy replied to your message. Click here to view the message and reply back.' },
            { id: 4, date: '09/29/2023', body: 'You have a new appointment request. Click here to view details.' },
        ],
        professionalInformation:  {
            id: "b6ccccf1-c549-4b4f-99f7-64fa40f8f2b0",
            hospitalId: "110e79d3-c84a-4ffe-85f7-6f1ed662b1dd",
            specialization: "Random Specialization",
            treatsCovid: true
        }
    },
    {
        MongoId: '3',
        name: 'Max Doe',
        email: 'abc3@example.com',
        role: 'Insurer',
        theme: 'theme1',
        dashboardMetadata: [
            { id: 1, label: 'Plans', value: 16, key: 'plans' },
            { id: 2, label: 'Members', value: 1250, key: 'patients' },
            { id: 2, label: 'Affiliated Doctors', value: 110, key: 'doctors' },
        ],
        recents: [
            { id: 1, date: '11/04/2023', body: 'You created a new insurance plan: Medicare Plan X. Click here to view more details.' },
            { id: 2, date: '11/01/2023', body: 'John subscribed to the insurance plan: Medicare Plan A. Click here to view more details.' },
            { id: 3, date: '10/10/2023', body: 'Dr. Ryan replied to your message. Click here to view the message and reply back.' }
        ]
    }
]

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

const specialities = [
    { id: 1, label: 'Random Specialization 1' },
    { id: 2, label: 'Random Specialization 2' },
    { id: 3, label: 'Random Specialization 3' },
    { id: 4, label: 'Random Specialization 4' }
]

const conditions = [
    { id: 1, label: 'Fever' },
    { id: 2, label: 'Cough' },
    { id: 3, label: 'Fracture' },
    { id: 4, label: 'Covid' }
]

const doctors = [
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
    { id: 1, label: 'Sunday', value: 'sunday', isExpanded: false, startTime: "", endTime: "" },
    { id: 2, label: 'Monday', value: 'monday', isExpanded: false, startTime: "", endTime: "" },
    { id: 3, label: 'Tuesday', value: 'tuesday', isExpanded: false, startTime: "", endTime: "" },
    { id: 4, label: 'Wednesday', value: 'wednesday', isExpanded: false, startTime: "", endTime: "" },
    { id: 5, label: 'Thursday', value: 'thursday', isExpanded: false, startTime: "", endTime: "" },
    { id: 6, label: 'Friday', value: 'friday', isExpanded: false, startTime: "", endTime: "" },
    { id: 7, label: 'Saturday', value: 'saturday', isExpanded: false, startTime: "", endTime: "" }
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

const getAllUsers = () => {
    return users;
}

const getUserByEmail = (email: any) => {
    return users.find(user => user.email === email);
}

const getKeyByRole = (role: String) => {
    return role === 'Patient' ? 'isPatient' : role === 'Doctor' ? 'isDoctor' : 'isInsurance';
}

const getSidebarOptionsByRole = (role: String) => {
    const key = getKeyByRole(role);
    return sidebarOptions.filter(opt => opt[key]);
}

const getTopBarCardsByRole = (role: String) => {
    const key = getKeyByRole(role);
    return topBarCards.filter(obj => obj[key]);
}

const getTopCardsByEmail = (email: String) => {
    const user = getUserByEmail(email);

    return user?.dashboardMetadata || [];
}

const getNotificationsByEmail = (email: String) => {
    const user = getUserByEmail(email);
    
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

const getAllSpecialities = () => {
    return specialities;
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

const getDoctors = (payload: any) => {
    let list = [];
    if (payload?.specialities?.length) {
        for (let i = 0; i < doctors.length; i++) {
            const doctor = doctors[i];
            if (doctor.specializations.some(item => payload.specialities.includes(item))) {
                list.push(doctor);
            }
        }
    } else {
        list = doctors;
    }
    return payload && payload.searchText.length ? list.filter(doc => doc.name.toLowerCase().includes(payload.searchText)) : doctors;
}

const getAllAppointments = (id: any, role: any) => {
    const key = role === 'Doctor' ? 'doctor' : 'patient';
    return appointments.filter((appointment: any) => appointment[key].id == id);
}

const getPlanByUser = (planId: any) => {
    return plans.find(plan => plan.id === planId);
}

const getDoctorById = (id: number) => {
    return doctors.find(doctor => doctor.id === id);
}

const getTimeSlots = (day: any) => {
    const slots = [];
    for (let i = 0; i < 24; i+=2) {
        const obj = {
            id: i,
            label: `${i}:00`
        }
        slots.push(obj);
    }
    return slots;
}

export const Helper = {
    getAllUsers,
    getUserByEmail,
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
    getAllPatients
}