import axios from 'axios';

const API_BASE_URL = 'http://20.205.178.13:8001/docs';

export const register = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/registration/`, {
            email,
            password,
            repeat_password: password,
        });

        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const confirmRegistration = async (confirmationCode: string) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/registration/${confirmationCode}`);

        return response.data;
    } catch (error) {
        console.error('Confirmation error:', error);
        throw error;
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login/`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

