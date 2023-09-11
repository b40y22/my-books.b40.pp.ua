<template>
    <Menu></Menu>
    <div class="profile-form">
        <h5>Профіль користувача</h5>

        <div class="mt-3 image-container" @click="openFileInput">
            <img :src="getProfileImage" alt="Photo" width="200" height="200" class="rounded-circle image-container-img" @mouseenter="showEditIcon" @mouseleave="hideEditIcon">
            <div class="fa fa-pencil edit-icon" @click.stop="openFileInput" v-if="showIcon"></div>
            <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" style="display: none;" />
        </div>

        <div class="form-group my-3">
            <label for="profile-name">Ім'я</label>
            <input type="text" class="form-control" id="profile-name" v-model="this.$store.getters.getUser.name" @change="changeName">
        </div>

        <div class="form-group my-3">
            <label for="profile-email">Електронна пошта</label>
            <input type="email" class="form-control" id="profile-email" v-model="this.$store.getters.getUser.email" @change="changeEmail">
        </div>

        <button type="button" class="btn btn-primary mt-3" @click="handle">Зберегти</button>
    </div>

</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import Menu from "@/components/Menu.vue";
import api from "@/api";

export default {
    name: "Show",
    components: {
        Menu
    },
    computed: {
        getProfileImage() {
            if (this.$store.getters.getUser.image) {
                return process.env.VUE_APP_BACKEND_URL + 'images/users/' + this.$store.getters.getUser.image;
            }
            return '';
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
            this.$store.dispatch('setUser', response.data.data.user);
        })
    },
    data() {
        return {
            showIcon: false,
            User: {
                name: null,
                email: null,
                image: null
            }
        };
    },
    methods: {
        changeName() {
            this.User.name = this.$store.getters.getUser.name
        },
        changeEmail() {
            this.User.email = this.$store.getters.getUser.email
        },
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
            this.User.image = event.target.files[0];
        },
        handle() {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            let data = new FormData();
            data.append('id', this.$store.getters.getUser.id);

            if (this.User.name) {
                data.append('name', this.User.name);
            }

            if (this.User.email) {
                data.append('email', this.User.email);
            }

            if (this.User.image) {
                data.append('image', this.User.image);
            }

            api.updateCurrentUser(data, config).then(response => {
                if (200 === response.status) {
                    this.$store.dispatch('setUser', response.data.data.user)
                }
            });
        }
    },
}
</script>

<style scoped>
    .profile-form {
        display: flex;
        flex-direction: column;
        margin: 120px auto 0 auto;
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
</style>