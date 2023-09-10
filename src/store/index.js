import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: [],
        books: []
    },
    mutations: {
        setUserMutation(state, user) {
            state.user = user;
        },
        setBookMutation(state, books) {
            state.books = books;
        },
    },
    actions: {
        setUser(state, user) {
            state.commit('setUserMutation', user);
        },
        setBooks(state, books) {
            state.commit('setBookMutation', books);
        },
    },
    getters: {
        getUser: state => {
            return state.user;
        },
        getBooks: state => {
            return state.books;
        },
    }
});

export default store;
