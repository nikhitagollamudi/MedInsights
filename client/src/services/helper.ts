import theme1 from '../themes/default';
import theme2 from '../themes/theme1';

const users = [
    {
        MongoId: '1',
        fullName: 'John Doe',
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
        ]
    },
    {
        MongoId: '2',
        fullName: 'Ryan Doe',
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
        ]
    },
    {
        MongoId: '3',
        fullName: 'Max Doe',
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
    { id: 1, name: 'Home', path: '/app/dashboard', isPatient: true, isDoctor: true, isInsurance: true },
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

const notifications = [
    { id: 1, date: '10/29/2023', body: 'You unsubscribed from the insurance plan: Medicare Plan B. Click here to view more details.' },
    { id: 2, date: '10/23/2023', body: 'You have an upcoming appointment with Dr. Jane. To modify or cancel the appointment, click here.' },
    { id: 3, date: '10/10/2023', body: 'Dr. Ryan replied to your message. Click here to view the message and reply back.' },
    { id: 4, date: '09/13/2023', body: 'Payment successful! You subscribed to the Medicare Plan A. Click to view your insurance plan details.' },
]

const themeMappings = [
    { id: 1, label: 'theme1', value: theme1 },
    { id: 2, label: 'theme2', value: theme2 }
]

const getAllUsers = () => {
    return users;
}

const getUserByEmail = (email: any) => {
    return users.find(user => user.email === email);
}

const getSidebarOptionsByRole = (role: String) => {
    const key = role === 'Patient' ? 'isPatient' : role === 'Doctor' ? 'isDoctor' : 'isInsurance';
    return sidebarOptions.filter(opt => opt[key]);
}

const getTopBarCardsByRole = (role: String) => {
    const key = role === 'Patient' ? 'isPatient' : role === 'Doctor' ? 'isDoctor' : 'isInsurance';
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

export const Helper = {
    getAllUsers,
    getUserByEmail,
    getSidebarOptionsByRole,
    getTopBarCardsByRole,
    getTopCardsByEmail,
    getNotificationsByEmail,
    getTheme
}