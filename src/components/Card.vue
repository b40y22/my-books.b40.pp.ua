<template>
    <div>
        <img :src="this.getImage" alt="image">
        <h2 class="title">{{book.title}}</h2>
        <p class="author">
            <router-link to="#">{{getAuthorFullName}}</router-link>
        </p>
    </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
    name: "Card",

    computed: {
        getAuthorFullName() {
            return this.book.authors[0].firstname + ' ' + this.book.authors[0].lastname
        },
        getImage() {
            return '/images/books/' + JSON.parse(this.book.files)[0].image;
        }
    },
    props: [
        'book'
    ]
}
</script>

<style scoped>
    img {
        max-width: 100%;
    }
    .title {
        font-size: 1.1rem;
        margin: 10px 0;
    }
    a, a:link, a:visited {
        color: #888;
        text-decoration: none;
    }
    a:hover {
        color: #000000;
    }
    .author {
        font-style: italic;
        color: #888;
    }
</style>