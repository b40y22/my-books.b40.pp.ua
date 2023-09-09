<template>
    <nav>
        <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">
                <span class="fa fa-chevron-left"></span>
            </a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">
                <span class="fa fa-chevron-right"></span>
            </a></li>
        </ul>
    </nav>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
    name: "Pagination"
}
</script>

<style scoped>
    /* Змінюємо колір фону і тексту для активної сторінки пагінації */
    .pagination .page-item.active .page-link {
        background-color: #757575; /* Змініть колір фону на бажаний */
        border-color: #757575; /* Змініть колір рамки на бажаний */
        color: #e8e8e8 !important; /* Змініть колір тексту на бажаний; !important використовується для перевизначення стилів Bootstrap */
    }

    /* Змінюємо колір фону та тексту для неактивних сторінок */
    .pagination .page-link {
        background-color: #fdfcfc; /* Змініть колір фону для неактивних сторінок на бажаний */
        border-color: lightgray; /* Змініть колір рамки для неактивних сторінок на бажаний */
        color: black !important; /* Змініть колір тексту для неактивних сторінок на бажаний; !important використовується для перевизначення стилів Bootstrap */
    }

    /* Змінюємо колір фону та тексту для hover-стану сторінок */
    .pagination .page-link:hover {
        background-color: #424242; /* Змініть колір фону для hover-стану на бажаний */
        border-color: #424242; /* Змініть колір рамки для hover-стану на бажаний */
        color: white !important; /* Змініть колір тексту для hover-стану на бажаний; !important використовується для перевизначення стилів Bootstrap */
    }
</style>