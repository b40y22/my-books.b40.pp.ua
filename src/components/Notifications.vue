<template>
    <div class="notification" v-show="isShow">
        <div class="notification-box" v-for="(message, index) in getMessages" :key="index">
            <div class="notification-icon">
                <img v-if="message.type === 'error'" class="notification-icon-img" src="/icons/error.png" alt="error">
                <img v-else class="notification-icon-img" src="/icons/check.png" alt="error">
            </div>
            <div class="notification-message">
                <div class="notification-message-title">{{message.title}}</div>
                <div class="notification-message-text">{{message.text}}</div>
            </div>
            <div class="notification-button">
                <span class="fa fa-times notification-button-icon" @click="closeMessage(index)"></span>
            </div>
        </div>
    </div>
</template>

<script>

import store from "@/store";
/* eslint-disable vue/multi-word-component-names */

export default {
        name: "Notifications",
        data() {
            return {
                messages: [],
                timers: {}
            };
        },
        computed: {
            isShow() {
                return store.getters.getMessages.length > 0
            },
            getMessages() {
                return store.getters.getMessages;
            }
        },
        methods: {
            closeMessage(index) {
                this.$store.commit('removeMessage', index)
            },
        }
    }
</script>

<style scoped>
    .notification {
        position: absolute;
        margin: 0;
        padding: 10px;
    }

    .notification-box {
        background-color: #f8f8f8;
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
        border: 1px solid #c7c6c6;
        border-radius: 7px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        min-height: 90px;
        margin-bottom: 20px;
        padding: 15px;
        width: 400px;
    }

    .notification-icon {
        width: 38px;
    }

    .notification-icon-img {
        height: 34px;
        margin-top: 4px;
        padding: 2px 4px;
        opacity: 0.6;
        width: 38px;
    }

    .notification-message {
        display: flex;
        flex-direction: column;
        padding: 4px 0 0 25px;
        width: 100%;
    }

    .notification-message-title {
        font-weight: bold;
        font-size: 14px;
    }

    .notification-message-text {
        font-size: 14px;
    }
    .notification-button {
        display: flex;
        justify-content: end;
        width: 38px;
    }

    .notification-button-icon {
        color: #7d8184;
    }

    .notification-button-icon:hover {
        color: #000000;
        cursor: pointer;
    }
</style>