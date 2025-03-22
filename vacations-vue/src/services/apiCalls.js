import axios from "axios";




const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'Content-Type': 'application/json' },
});




export const getChoosePeriod = () => {
    return api.get('/global-settings/choose-period');
}

export const changeChoosePeriod = (choosePeriod) => {
    return api.put('/global-settings/choose-period', { choosePeriod: choosePeriod });
}




export const getUsersByPostion = () => {
    return api.get('/users/by-position');
}

export const getUserVacations = (userId) => {
    return api.get(`/users/${userId}/vacation`);
}

export const getAuth = (token) => {
    return api.get(`/users/auth?token=${token}`);
}

export const loginUser = (user) => {
    return api.post('/users/login', user);
}

export const changeUsersPosition = (users) => {
    return api.put('/users/change-positions', users);
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