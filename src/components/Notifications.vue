<template>
    <div class="notification" v-show="this.messages.length > 0">
        <div class="notification-box" v-for="(message, index) in messages" :key="index">
            <div>
                <img v-if="message.type = 'error'" class="notification-box-icon" src="/icons/error.png" alt="error">
            </div>
            <div class="notification-box-message">
                <div class="notification-box-message-title">
                    <span v-if="message.type === 'error'">Помилка!</span>
                </div>
                <div class="notification-box-message-text" title="Розгорнути">
                    {{message.text}}
                </div>
            </div>
            <div class="notification-box-control">
                <div class="notification-box-action">
                    <div class="notification-box-action-item" @click="switchPinMessage(index)">
                        <i :class="{ 'active-pin': message.pin }" class="fa fa-thumb-tack " aria-hidden="true" title="Закріпити"></i>
                    </div>
                    <div class="notification-box-action-item left-border" @click="closeMessage(index)">
                        <i class="fa fa-times" aria-hidden="true" title="Закрити"></i>
                    </div>
                </div>
                <div class="message-time">
                    <span>{{message.remainingTime}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
    export default {
        name: "Notifications",
        data() {
            return {
                messages: {},
                timers: {}
            };
        },
        props: [
            'messagesArray'
        ],
        created() {
            this.messages = this.messagesArray;
        },
        methods: {
            closeMessage(index) {
                if (this.messages[index] && this.messages[index].pin === false) {
                    this.messages.splice(index, 1);
                }

                clearTimeout(this.timers[index]);
                delete this.timers[index];
            },
            switchPinMessage(index) {
                this.messages[index].pin = !this.messages[index].pin;
            }
        },
        updated() {
            this.messages.forEach((message, index) => {
                if (!this.timers[index]) {
                    this.timers[index] = setInterval(() => {
                        if (message.remainingTime && message.remainingTime > 0) {
                            message.remainingTime--;
                        } else {
                            this.closeMessage(index);
                        }
                    }, 1000);
                }
            });
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
        border: 1px solid #c7c6c6;
        border-bottom-left-radius: 30px;
        border-top-left-radius: 30px;
        display: flex;
        flex-direction: row;
        min-height: 60px;
        margin-bottom: 10px;
        width: 300px;
    }
    .notification-box-icon {
        height: 48px;
        padding: 6px 10px 6px 8px;
        opacity: 0.7;
        width: 48px;
    }
    .notification-box-message {
        display: flex;
        flex-direction: column;
        padding: 6px;
        width: 170px;
    }
    .notification-box-message-title {
        color: #232836;
        font-size: 14px;
        font-weight: bold;
    }
    .notification-box-message-text {
        color: #424242;
        font-size: 14px;
    }
    .notification-box-control {
        display: flex;
        color: #b9b9b9;
        justify-self: end;
        flex-direction: column;
        border-left: 2px solid #e0dddd;
        width: 50px;
    }
    .active-pin {
        color: #232836!important;
    }
    .notification-box-action {
        border-bottom: 2px solid #e0dddd;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        height: 24px;
    }
    .notification-box-action-item {
        padding: 3px;
        cursor: pointer;
    }
    .notification-box-action-item:hover {
        color: #232836;
    }

    .left-border {
        border-left: 2px solid #e0dddd;
    }

    .message-time {
        display: flex;
        justify-content: center;
        font-size: 18px;
        font-weight: bold;
        padding-top: 8px;
    }
</style>