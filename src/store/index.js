import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: [],
        book: [],
        books: [],
        messages: []
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setBook(state, book) {
            state.book = book;
        },
        setBooks(state, books) {
            state.books = books;
        },
        addMessages(state, messages) {
            state.messages = [...state.messages, messages];
        },
        resetAllMessages(state) {
            state.messages = [];
        },
        removeMessage(state, index) {
            state.messages.splice(index, 1)
        }
    },
    actions: {
        //
    },
    getters: {
        getUser: state => {
            return state.user;
        },
        getBook: state => {
            return state.book;
        },
        getBooks: state => {
            return state.books;
        },
        getMessages: state => {
            return state.messages;
        },
    }
});

export default store;
