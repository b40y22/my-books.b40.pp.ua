<template>
    <Menu></Menu>
    <div class="messages">
        <Notification></Notification>
    </div>
    <Breadcrumbs></Breadcrumbs>
    <div class="container-center">
        <h5>Додати книгу</h5>

        <div class="form-group my-3">
            <label for="book-title">Назва</label>
            <input type="text" class="form-control" id="book-title" v-model="book.title">
        </div>


        <button type="button" class="btn btn-primary mt-3" @click="handle">Зберегти</button>
    </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import Menu from "@/components/Menu.vue";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import Notification from "@/components/Notifications.vue";

export default {
    name: "Create",
    data() {
        return {
            book: {
                'title': ''
            },
        }
    },
    components: {
        Notification,
        Breadcrumbs,
        Menu
    },
    methods: {
        handle() {
            this.$store.commit('addMessages', {
                'title': 'Успіх',
                'type': 'success',
                'text': 'Збережено успешно',
            });
        }
    }
}
</script>

<style scoped>
.container-center {
    display: flex;
    flex-direction: column;
    margin: 100px auto 0 auto;
    width: 600px;
}

.messages {
    display: flex;
    justify-content: end;
}
</style>