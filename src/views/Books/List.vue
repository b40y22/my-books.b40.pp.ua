<template>
    <Menu></Menu>
    <BookGrid></BookGrid>
    <Pagination v-if="hasBooks"></Pagination>
    <div class="row mt-5" v-else>
        <div class="d-flex justify-content-center empty">Немає книжок в бібліотеці</div>
    </div>
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
    computed: {
        hasBooks() {
            return this.$store.getters.getBooks.length
        }
    },
    created() {
        api.getBooks().then((response) => {
            if (response.data.data.books.items.length > 0) {
                this.$store.setBooks(response.data.data.books.items);
            }
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
    .empty {
        color: #8f8f8f;
        font-style: italic;
    }
</style>