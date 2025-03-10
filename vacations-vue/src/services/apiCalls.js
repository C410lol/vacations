import axios from "axios";




const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
});




export const getUserVacations = (userId) => {
    return api.get(`/users/${userId}/vacation`);
}

export const loginUser = (user) => {
    return api.post('/users/login', user);
}








export const getAllVacations = (excludeId) => {
    return api.get(`/vacations?excludeId=${excludeId}`);
}

export const getForbiddenDates = () => {
    return api.get('/vacations/forbidden');
}

export const postVacation = (userId, body) => {
    return api.post(`/vacations/?userId=${userId}`, body);
}