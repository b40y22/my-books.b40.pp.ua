<template>
    <div>
        <div class="errors">
            <notification :messagesArray="this.errors"></notification>
        </div>
        <section class="container forms">
            <div class="form signup">
                <div class="form-content">
                    <header>Реєстрація</header>
                    <div>
                        <div class="field input-field">
                            <input type="text" placeholder="Ім'я" class="input" v-model="name" @keyup.enter="registrationSend">
                        </div>
                        <div class="field input-field">
                            <input type="email" placeholder="Електронна пошта" class="input" v-model="email" @keyup.enter="registrationSend">
                        </div>
                        <div class="field input-field">
                            <input type="password" placeholder="Пароль" class="password" v-model="password" @keyup.enter="registrationSend">
                        </div>
                        <div class="field input-field">
                            <input type="password" placeholder="Підтвердження пароля" class="password" v-model="confirmPassword" @keyup.enter="registrationSend">
                            <i class='bx bx-hide eye-icon'></i>
                        </div>
                        <div class="field button-field">
                            <button @click="registrationSend">Реєстрація</button>
                        </div>
                    </div>
                    <div class="form-link">
                        <span>Вже є обліковий запис? <a href="/login" class="link login-link">Вхід</a></span>
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

const SHOW_MESSAGE_IN_SECONDS = 5;

export default {
    name: "Registration",
    components: {
        Notification
    },
    data: function () {
        return {
            confirmPassword: '',
            email: '',
            errors: [],
            name: '',
            password: ''
        }
    },
    methods: {
        registrationSend() {
            this.validateNameField();
            this.validateEmailField();
            this.validatePasswordField();

            if (this.errors.length < 1) {
                api.registerUser({
                    "email": this.email,
                    "name": this.name,
                    "password": this.password,
                    "password_confirmation": this.confirmPassword
                })
                .then(response => {
                    this.$cookies.set('auth_token', response.data.data.token, 60 * 60 * 24 * 7);
                    this.$router.push('/import/loveread');
                })
                .catch(error => {
                    error.response.data.errors.forEach(message => {
                        let newMessage = {
                            'type': 'error',
                            'text': message,
                            'remainingTime': SHOW_MESSAGE_IN_SECONDS,
                            'pin': false
                        };
                        this.errors.push(newMessage);
                    })
                });
            }
        },
        validateNameField() {
            if (!this.name) {
                let newMessage = {
                    'type': 'error',
                    'text': 'Ім\'я обов\'язково',
                    'remainingTime': SHOW_MESSAGE_IN_SECONDS,
                    'pin': false
                };
                this.errors.push(newMessage);
            }
        },
        validateEmailField() {
            if (!this.email) {
                let newMessage = {
                    'type': 'error',
                    'text': 'Електронна пошта обов\'язкова',
                    'remainingTime': SHOW_MESSAGE_IN_SECONDS,
                    'pin': false
                };
                this.errors.push(newMessage);
            }
        },
        validatePasswordField() {
            if (!this.password) {
                let newMessage = {
                    'type': 'error',
                    'text': 'Пароль обов\'язковий',
                    'remainingTime': SHOW_MESSAGE_IN_SECONDS,
                    'pin': false
                };
                this.errors.push(newMessage);
            }
            if (this.password !== this.confirmPassword) {
                let newMessage = {
                    'type': 'error',
                    'text': 'Пароль та підтвердження пароля не співпадають',
                    'remainingTime': SHOW_MESSAGE_IN_SECONDS,
                    'pin': false
                };
                this.errors.push(newMessage);
            }
        }
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }
    .container{
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e1e1e1;
        column-gap: 30px;
    }
    .form{
        position: absolute;
        max-width: 430px;
        width: 100%;
        padding: 30px;
        border-radius: 6px;
        background: #FFF;
    }
    .forms.show-signup .form.signup{
        opacity: 1;
        pointer-events: auto;
    }
    header{
        font-size: 28px;
        font-weight: 600;
        color: #232836;
        text-align: center;
    }
    form{
        margin-top: 30px;
    }
    .form .field{
        position: relative;
        height: 50px;
        width: 100%;
        margin-top: 20px;
        border-radius: 6px;
    }
    .field input,
    .field button{
        height: 100%;
        width: 100%;
        border: none;
        font-size: 16px;
        font-weight: 400;
        border-radius: 6px;
    }
    .field input{
        outline: none;
        padding: 0 15px;
        border: 1px solid#CACACA;
    }
    .field input:focus{
        border-bottom-width: 2px;
    }
    .eye-icon{
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        font-size: 18px;
        color: #8b8b8b;
        cursor: pointer;
        padding: 5px;
    }
    .field button{
        color: #fff;
        background-color: #0171d3;
        transition: all 0.3s ease;
        cursor: pointer;
    }
    .field button:hover{
        background-color: #016dcb;
    }
    .form-link{
        text-align: center;
        margin-top: 10px;
    }
    .form-link span,
    .form-link a{
        font-size: 14px;
        font-weight: 400;
        color: #232836;
    }
    .form a{
        color: #0171d3;
        text-decoration: none;
    }
    .form-content a:hover{
        text-decoration: underline;
    }
    .media-options a{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media screen and (max-width: 400px) {
        .form{
            padding: 20px 10px;
        }

    }
    .errors {
        display: flex;
        justify-content: end;
    }
</style>