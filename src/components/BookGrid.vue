<template>
    <div class="container">
        <div class="card" v-for="(book, index) in this.books" :key="index">
            <Card :book="book"></Card>
        </div>
    </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
    name: "BookGrid",
    components: {
        Card
    },
    props: [
        'books'
    ]
}
</script>

<style scoped>
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
    }
    .container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        width: 80%;
        max-width: 1200px;
        padding: 20px;
    }
    .card {
        cursor: pointer;
        opacity: 0.8;
        width: 240px;
        border: 1px solid #ddd;
        padding: 0;
        text-align: center;
        background-color: #fff;
        box-shadow: 10px 8px 10px rgba(0, 0, 0, 0.2);
    }
    .card:hover {
        opacity: 1;
    }
</style>