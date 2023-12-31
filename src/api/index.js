import axios from "axios";
import cookies from "vue-cookies";

axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL + 'api';
axios.defaults.headers.common['Accept-Language'] = process.env.VUE_APP_LANGUAGE === 'ua' ? 'ua' : 'en';

axios.interceptors.request.use(config => {
    const token = cookies.get('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

function handleApiError(error) {
    console.error('Помилка запиту:', error);
    throw error;
}

export default {
    // Auth
    registerUser(data) {
        return axios.post('/auth/register', data).catch(handleApiError);
    },
    loginSend(data) {
        return axios.post(  '/auth/login', data).catch(handleApiError);
    },

    // Import
    importBook(params) {
        return axios.post('/import', params).catch(handleApiError);
    },

    // Books
    getBooks() {
        return axios.get('/book/list?orderBy=id,desc').catch(handleApiError);
    },

    // User
    getCurrentUser() {
        return axios.get('/user').catch(handleApiError);
    },
    updateCurrentUser(params) {
        return axios.put('/user/' + params.id, params).catch(handleApiError);
    },
    updateUserPhoto(params) {
        return axios.post('/user/photo', params).catch(handleApiError);
    }

};
