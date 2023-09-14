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
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Додати
                        </a>
                        <ul class="dropdown-menu" :class="{show: this.checkDropdownInActive('addDropdown')}">
                            <li><router-link :to="{name: 'Create'}" class="dropdown-item">Книгу</router-link></li>
                            <li><a class="dropdown-item" href="#">Автора</a></li>
                        </ul>
                    </li>
                </ul>

                <div class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" class="form-control" placeholder="Пошук" v-model="search" title="Назва книжки, або автор" @keyup.enter="runSearch">
                </div>

                <div class="dropdown nav-item text-end" ref="userDropdown" @click="toggleDropdownState('userDropdown')">
                    <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle show" data-bs-toggle="dropdown" aria-expanded="true">
                        <img :src="getProfileImage" alt="Photo" width="42" height="42" class="rounded-circle" :title="getProfileName">
                    </a>
                    <ul class="dropdown-menu text-small" :class="{show: this.checkDropdownInActive('userDropdown')}">
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
     color: rgba(33, 37, 41, 0.75)
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
</style>