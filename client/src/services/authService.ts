import axios from 'axios';
import { Helper } from './helper';

// const API_URL = '';

const register = (payload:any) => {
    return new Promise<any>((resolve, reject) => {
        const userData = Helper.getUserByEmail(payload.email);
        const data = {
            qrCode: require('../assets/qrcode.png'),
            data: {
                user: userData
            }
        }
        setTimeout(() => {
            resolve(data);
        }, 800);
    })
}

const login = (payload:any) => {
    return new Promise<any>((resolve, reject) => {
        const userData = Helper.getUserByEmail(payload.email);
        const data = {
            token: 'xyz',
            user: userData
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