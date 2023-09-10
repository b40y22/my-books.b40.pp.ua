import { createRouter, createWebHistory } from 'vue-router';

import auth from '../middleware/auth';
import log from '../middleware/log';

import Home from "@/views/Home.vue";
import Registration from "@/views/Auth/Registration.vue";
import Login from "@/views/Auth/Login.vue";
import Loveread from "@/views/Import/Source/Loveread.vue";
import BookList from "@/views/Books/List.vue";
import Error404 from "@/views/Errors/Error404.vue";
import Show from "@/views/Profile/Show.vue";

const routes = [
    // Auth
    {path: '/registration', name: 'Registration', component: Registration},
    {path: '/login', name: 'Login', component: Login, meta: {middleware: [auth, log]}},

    // General
    {path: '/home', name: 'Home', component: Home, meta: {middleware: [auth, log]}},

    // Import
    {path: '/import/loveread', name: 'Loveread', component: Loveread, meta: {middleware: [auth, log]}},

    // Books
    {path: '/', name: 'Root', component: BookList, meta: {middleware: [auth, log]}},

    //User
    {path: '/profile', name: 'Show', component: Show, meta: {middleware: [auth, log]}},

    // 404
    {path: '/:catchAll(.*)', component: Error404}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Middleware runner
router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next
    }

    return middleware[0]({
        ...context
    })
})

export default router;
