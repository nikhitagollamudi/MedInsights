import axios from 'axios';

// const API_URL = '';

const register = (payload:any) => {
    return new Promise<any>((resolve, reject) => {
        const data = {
            token: 'xyz',
            user: {
                name: payload.name,
                email: payload.email,
                role: payload.role
            }
        }
        setTimeout(() => {
            resolve(data);
        }, 800);
    })
}

const login = (payload:any) => {
    return new Promise<any>((resolve, reject) => {
        const data = {
            token: 'xyz',
            user: {
                email: payload.email,
                name: payload.name
            }
        }
        setTimeout(() => {
            resolve(data);
        }, 800);
    })
}

export const AuthService = {
    register,
    login
}