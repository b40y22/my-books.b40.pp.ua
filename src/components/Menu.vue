<template>
    <header class="p-3 mb-3 border-bottom">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                    <img src="/icons/logo.png" alt="" style="height: 40px; margin-right: 50px; border: 1px solid #dee2e6">
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0" id="menu-box">
                    <li><router-link :to="{name: 'Root'}" class="nav-link px-2 link-body-emphasis">Головна</router-link></li>
                    <li><router-link :to="{name: 'Root'}" class="nav-link px-2 link-body-emphasis">Автори</router-link></li>
                    <li><router-link :to="{name: 'Root'}" class="nav-link px-2 link-body-emphasis">Черга</router-link></li>
                    <li class="nav-item dropdown" ref="addDropdown" @click="toggleDropdownState('addDropdown')">
                        <div class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Додати
                        </div>
                        <ul id="add-menu" class="dropdown-menu" :class="{show: this.checkDropdownInActive('addDropdown')}">
                            <li><router-link :to="{name: 'Create'}" class="dropdown-item">Книгу</router-link></li>
                            <li><a class="dropdown-item" href="#">Автора</a></li>
                        </ul>
                    </li>
                </ul>

                <div class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" class="form-control" placeholder="Пошук" v-model="search" title="Назва книжки, або автор" @keyup.enter="runSearch">
                </div>

                <div style="position: relative" ref="messagesDropdown" @click="toggleDropdownState('messagesDropdown')">
                    <span class="fa fa-bell-o messages">
                        <i class="active"></i>
                    </span>
                    <ul id="message-list" class="dropdown-menu text-small" :class="{show: this.checkDropdownInActive('messagesDropdown')}">

                        <li>
                            <div class="message-item">
                                <div class="message-item-text-number">1</div>
                                <div class="message-item-img-box">
                                    <img class="message-item-img" src="/images/books/64405246.jpg" alt="">
                                </div>
                                <div class="message-item-text-box">
                                    <div class="message-item-title">
                                        Заголовок
                                    </div>
                                    <div class="message-item-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam amet aut corporis delectus dolor ipsum magni minima molestiae natus, odit repellat reprehenderit repudiandae sit sunt vel veniam. Facere, placeat!
                                    </div>
                                </div>
                                <div>
                                    <i class="fa fa-times message-item-close-box" title="Видалити"></i>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="message-item">
                                <div class="message-item-text-number">2</div>
                                <div class="message-item-img-box">
                                    <img class="message-item-img error-img" src="/icons/error-for-message.webp" alt="">
                                </div>
                                <div class="message-item-text-box">
                                    <div class="message-item-title">
                                        Помилка
                                    </div>
                                    <div class="message-item-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquam amet aut corporis delectus dolor ipsum magni minima molestiae natus, odit repellat reprehenderit repudiandae sit sunt vel veniam. Facere, placeat!
                                    </div>
                                </div>
                                <div>
                                    <i class="fa fa-times message-item-close-box" title="Видалити"></i>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div class="message-item">
                                <div class="message-item-text-number">3</div>
                                <div class="message-item-img-box">
                                    <img class="message-item-img" src="/images/books/41897725.jpg" alt="">
                                </div>
                                <div class="message-item-text-box">
                                    <div class="message-item-title">
                                        Заголовок
                                    </div>
                                    <div class="message-item-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    </div>
                                </div>
                                <div>
                                    <i class="fa fa-times message-item-close-box" title="Видалити"></i>
                                </div>
                            </div>
                        </li>
                        <div class="message-list-footer">
                            <i class="fa fa-trash message-list-footer-icon" title="Видалити все"></i>
                        </div>
                    </ul>
                </div>

                <div class="dropdown nav-item text-end" ref="userDropdown" @click="toggleDropdownState('userDropdown')">
                    <div class="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
                        <img :src="getProfileImage" alt="Photo" width="42" height="42" class="rounded-circle user-image" :title="getProfileName">
                    </div>
                    <ul id="user-menu" class="dropdown-menu text-small" :class="{show: this.checkDropdownInActive('userDropdown')}">
                        <li><a class="dropdown-item" href="#">Налаштування</a></li>
                        <li><router-link :to="{name: 'Show'}" class="dropdown-item">Профіль</router-link></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#" @click="logout">Вихід</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import api from "@/api";

export default {
    name: "Menu",
    beforeUnmount() {
        document.removeEventListener('click', this.handleDocumentClick);
    },
    data() {
        return {
            dropdownActive: [],
            search: '',
        }
    },
    created() {
        api.getCurrentUser().then((response) => {
            this.$store.commit('setUser', response.data.data.user);
        })
    },
    computed: {
        getProfileImage() {
            if (this.$store.getters.getUser.image) {
                return process.env.VUE_APP_BACKEND_URL + 'images/users/' + this.$store.getters.getUser.image;
            }
            return '/images/no_user.png?v=0.0.1';
        },
        getProfileName() {
            if (this.$store.getters.getUser.name) {
                return this.$store.getters.getUser.name;
            }
            return '';
        }
    },
    methods: {
        checkDropdownInActive(dropdownTitle) {
            return this.dropdownActive.includes(dropdownTitle);
        },
        toggleDropdownState(dropdownTitle) {
            if (this.checkDropdownInActive(dropdownTitle)) {
                let index = this.dropdownActive.indexOf(dropdownTitle);
                if (index !== -1) {
                    this.dropdownActive.splice(index, 1);
                }
            } else {
                this.dropdownActive.push(dropdownTitle)
            }
        },
        handleDocumentClick(event) {
            let target = false;
            Object.keys(this.$refs).forEach((ref) => {
                if (this.$refs[ref].contains(event.target)) {
                    target = true;
                }
            });

            if (!target) {
                this.dropdownActive = [];
            }
        },
        runSearch() {

        },
        logout() {
            this.$cookies.remove('auth_token');
            this.$router.push('/login');
        }
    },
    mounted() {
        document.addEventListener('click', this.handleDocumentClick);
    },
}
</script>

<style scoped>
    a, a:link, a:visited, .link-body-emphasis {
        color: #000000;
        text-decoration: none;
    }
    a:hover {
     color: #212529BF
    }
    *:focus {
        outline: none;
    }
    .form-control:focus {
        border-color: #c7c6c6;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .dropdown-item:active {
        background-color: #bbbdbb;
    }
    .nav-link {
        color: #000000;
    }
    .messages {
        color: #808181;
        cursor: pointer;
        font-size: 20px;
        margin: 0 30px 0 20px;
    }
    .messages:hover {
        color: #000000;
    }
    .active {
        position: absolute;
        background-color: red;
        border-radius: 4px;
        width: 8px;
        height: 8px;
        left: 50%;
    }
    #add-menu,
    #message-list,
    #user-menu {
        border-top: #FFFFFF;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .user-image:hover {
        cursor: pointer;
    }
    #add-menu {
        margin-top: 17px;
    }
    #message-list {
        width: 500px;
        margin-top: 25px;
        right: 30px;
    }
    #user-menu {
        margin-top: 16px;
    }
    .message-item {
        display: flex;
        border-bottom: 1px solid #eae9e9;
        background-color: #f5f4f4;
        flex-direction: row;
        padding: 10px;
        margin-bottom: 10px;
    }
    .message-item-text-number {
        color: #7d8184;
        font-size: 20px;
        font-weight: 800;
        padding: 40px 5px 0 0;
        width: 30px;
    }
    .message-item-img {
        width: 80px;
    }
    .message-item-img:hover {
        cursor: pointer;
    }
    .error-img {
        opacity: 0.5;
    }
    .message-item-text-box {
        padding: 0 20px;
        width: 340px;
    }
    .message-item-title {
        font-size: 14px;
        font-weight: bold;
    }
    .message-item-text {
        font-size: 13px;
    }
    .message-item-close-box {
        color: #7d7f80;
    }
    .message-item-close-box:hover {
        color: #000000;
        cursor: pointer;
    }

    .message-list-footer {
        display: flex;
        justify-content: center;
        height: 30px;
    }
    .message-list-footer:hover {
        cursor: pointer;
    }

    .message-list-footer-icon {
        color: #7d7f80;
        font-size: 26px;
    }
    .message-list-footer-icon:hover {
        color: #000000;
    }
</style>