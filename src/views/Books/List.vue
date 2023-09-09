<template>
    <Menu></Menu>
    <BookGrid :books="this.books"></BookGrid>
    <Pagination></Pagination>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import Menu from "@/components/Menu.vue";
import BookGrid from "@/components/BookGrid.vue";
import api from "@/api";
import Pagination from "@/components/Pagination.vue";

export default {
    name: "List",
    data() {
        return {
            books: [],
        }
    },
    created() {
        api.getBooks().then((response) => {
            this.books = response.data.data.books.items;
        })
    },
    components: {
        Pagination,
        BookGrid,
        Menu
    }
}
</script>

<style scoped>
    html,
    body {
        margin: 0!important;
    }
</style>