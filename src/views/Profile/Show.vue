<template>
    <Menu></Menu>
    <div class="messages">
        <Notification></Notification>
    </div>
    <div class="container-center">
        <h5>Профіль користувача</h5>

        <div class="mt-3 image-container" @click="openFileInput">
            <img :src="getProfileImage" alt="Photo" width="128" height="128" class="rounded-circle image-container-img" @mouseenter="showEditIcon" @mouseleave="hideEditIcon">
            <div class="fa fa-pencil edit-icon" @click.stop="openFileInput" v-if="showIcon"></div>
            <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" style="display: none;" />
        </div>

        <div class="form-group my-3">
            <label for="profile-name">Ім'я</label>
            <input type="text" class="form-control" id="profile-name" v-model="this.$store.getters.getUser.name">
        </div>

        <div class="form-group my-3">
            <label for="profile-email">Електронна пошта</label>
            <input type="email" class="form-control" id="profile-email" v-model="this.$store.getters.getUser.email">
        </div>

        <button type="button" class="btn btn-primary mt-3" @click="handle">Зберегти</button>
    </div>

</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import Menu from "@/components/Menu.vue";
import api from "@/api";
import Notification from "@/components/Notifications.vue";

export default {
    name: "Show",
    components: {
        Notification,
        Menu
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
    created() {
        api.getCurrentUser().then((response) => {
            this.$store.commit('setUser', response.data.data.user);
        })
    },
    data() {
        return {
            showIcon: false,
        };
    },
    methods: {
        openFileInput() {
            this.$refs.fileInput.click();
        },
        showEditIcon() {
            this.showIcon = true;
        },
        hideEditIcon() {
            this.showIcon = false;
        },
        handleFileChange(event) {
            let data = new FormData();
            data.append('photo', event.target.files[0]);

            api.updateUserPhoto(data).then(response => {
                if (200 === response.status) {
                    this.$store.commit('setUserPhoto', response.data.data.photo.filename)
                    this.$store.commit('addMessages', {
                        'title': 'Успіх',
                        'type': 'success',
                        'text': 'Оновлено успешно',
                    });
                } else {
                    this.$store.commit('addMessages', {
                        'title': 'Помилка',
                        'type': 'error',
                        'text': 'Зображення не оновлено',
                    });
                }
            });

        },
        handle() {
            api.updateCurrentUser({
                "id": this.$store.getters.getUser.id,
                "name": this.$store.getters.getUser.name,
                "email": this.$store.getters.getUser.email,
            }).then(response => {
                if (200 === response.status) {
                    this.$store.commit('setUser', response.data.data.user)
                    this.$store.commit('addMessages', {
                        'title': 'Успіх',
                        'type': 'success',
                        'text': 'Оновлено успешно',
                    });
                } else {
                    this.$store.commit('addMessages', {
                        'title': 'Помилка',
                        'type': 'error',
                        'text': 'Не оновлено',
                    });
                }
            });
        }
    },
}
</script>

<style scoped>
    .container-center {
        display: flex;
        flex-direction: column;
        margin: 100px auto 0 auto;
        width: 600px;
    }

    .image-container {
        position: relative;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }

    .image-container-img:hover {
        opacity: 0.5;
    }

    .edit-icon {
        color: #1a1d20;
        position: absolute;
        top: 50%;
        left: 52%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        background-size: cover;
        opacity: 0;
        font-size: 30px;
    }

    .image-container:hover .edit-icon {
        opacity: 1;
    }

    .messages {
        display: flex;
        justify-content: end;
    }
</style>