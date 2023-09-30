<template>
    <div>
        <div class="messages">
            <Notification></Notification>
        </div>
        <section class="container-central forms">
            <div class="form login">
                <div class="form-content">
                    <header>Вхід</header>
                    <div>
                        <div class="field input-field">
                            <input type="email" placeholder="Електронна пошта" class="input" v-model="email" @keyup.enter="loginSend">
                        </div>
                        <div class="field input-field">
                            <input type="password" placeholder="Пароль" class="password" v-model="password" @keyup.enter="loginSend">
                            <i class='bx bx-hide eye-icon'></i>
                        </div>
                        <div class="form-link">
                            <a href="#" class="forgot-pass">Забули пароль?</a>
                        </div>
                        <div class="field button-field">
                            <button @click="loginSend">Вхід</button>
                        </div>
                    </div>
                    <div class="form-link">
                        <span>Немає облікового запису? <a href="/registration" class="link signup-link">Реєстрація</a></span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import api from "@/api";
import Notification from "@/components/Notifications.vue";

const HOME_URL = '/';

export default {
    name: "Login",
    components: {
        Notification
    },
    data: function () {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        loginSend() {
            this.$store.commit('resetAllMessages');

            this.validateEmailField();
            this.validatePasswordField();

            if (this.$store.getters.getMessages.length < 1) {
                api.loginSend({
                    "email": this.email,
                    "password": this.password,
                })
                .then(response => {
                    this.$cookies.set('auth_token', response.data.data.token, 60 * 60 * 24 * 7);
                    this.$router.push(HOME_URL);
                })
                .catch(error => {
                    error.response.data.errors.forEach(message => {
                        this.$store.commit('addMessages', {
                            'title': 'Помилка',
                            'type': 'error',
                            'text': message,
                        });
                    })
                });
            }
        },
        validateEmailField() {
            if (!this.email) {
                this.$store.commit('addMessages', {
                    'title': 'Помилка',
                    'type': 'error',
                    'text': 'Електронна пошта обов\'язкова',
                });
            }
        },
        validatePasswordField() {
            if (!this.password) {
                this.$store.commit('addMessages', {
                    'title': 'Помилка',
                    'type': 'error',
                    'text': 'Пароль обов\'язковий',
                });
            }
        }
    }
}
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }
    .container-central {
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e1e1e1;
        column-gap: 30px;
    }
    .form {
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        position: absolute;
        max-width: 430px;
        width: 100%;
        padding: 30px;
        border-radius: 6px;
        background: #FFF;
    }
    .form.login {
        opacity: 1;
        pointer-events: auto;
    }
    header {
        font-size: 28px;
        font-weight: 600;
        color: #232836;
        text-align: center;
    }
    form {
        margin-top: 30px;
    }
    .form .field {
        position: relative;
        height: 50px;
        width: 100%;
        margin-top: 20px;
        border-radius: 6px;
    }
    .field input,
    .field button {
        height: 100%;
        width: 100%;
        border: none;
        font-size: 16px;
        font-weight: 400;
        border-radius: 6px;
    }
    .field input {
        outline: none;
        padding: 0 15px;
        border: 1px solid #CACACA;
    }
    .field input:focus {
        border-bottom-width: 2px;
    }
    .eye-icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-size: 18px;
        color: #8b8b8b;
        cursor: pointer;
        padding: 5px;
    }
    .field button {
        color: #fff;
        background-color: #0171d3;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    .field button:hover {
        background-color: #016dcb;
    }
    .form-link {
        text-align: center;
        margin-top: 10px;
    }
    .form-link span,
    .form-link a {
        font-size: 14px;
        font-weight: 400;
        color: #232836;
    }
    .form a {
        color: #0171d3;
        text-decoration: none;
    }
    .form-content a:hover {
        text-decoration: underline;
    }
    .media-options a {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 400px) {
        .form {
            padding: 20px 10px;
        }
    }
    .messages {
        display: flex;
        justify-content: end;
    }
</style>