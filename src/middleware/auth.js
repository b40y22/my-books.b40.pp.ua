import cookies from "vue-cookies";
import Home from "@/views/Home.vue";

export default function auth({ to, from, next }) {
    if (cookies.get('auth_token')) {
        // cookie auth_token EXIST
        if (to.name === 'Login' || to.name === 'Registration') {
            return next({ name: 'Home' });
        } else {
            return next();
        }
    } else {
        // cookie auth_token NOT EXIST
        if (to.name === 'Login' || to.name === 'Registration') {
            return next();
        } else {
            return next({ name: 'Login' });
        }
    }
}
