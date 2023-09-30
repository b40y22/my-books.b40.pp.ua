<template>
    <div class="breadcrumb">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Library</a></li>
                <li class="breadcrumb-item active" aria-current="page">Data</li>
            </ol>
        </nav>
    </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
    name: "Breadcrumbs"
}
</script>

<style scoped>
.breadcrumb {
    height: 50px;
}
</style>