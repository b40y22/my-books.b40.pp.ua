import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL + 'api'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
if (process.env.VUE_APP_LANGUAGE === "ua") {
    axios.defaults.headers.common['Content-Language'] = 'ua_UA';
} else {
    axios.defaults.headers.common['Content-Language'] = 'en_US';
}

export default {
    //
}