<template>
    <div id="menu-box">
        <div class="menu-logo" title="Головна">
            <img class="menu-logo-image" src="/icons/logo.png?v=0.30" alt="Лого">
        </div>
        <div class="menu-navbar">
            <ul class="menu-navbar-list">
                <li>
                    <a href="#">Головна</a>
                </li>
                <li>
                    <a href="#">Автори</a>
                </li>
                <li>
                    <a href="#">Додати</a>
                </li>
                <li>
                    <a href="#">Черга</a>
                </li>
                <li>
                    <a href="#">Новинки</a>
                </li>
            </ul>
        </div>
        <div class="menu-user">
            <div title="Повідомлення">
                <span id="message-envelope" class="fa fa-envelope-o"></span>
            </div>
            <div title="Користувач">
                <img class="menu-user-image" src="/images/users/profile.png?v=0.1" alt="Користувач">
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
    name: "Menu",
    data() {
        return {
            showDropdown: false
        };
    }
}
</script>

<style scoped>
    #menu-box {
        background-color: #F9F9F9;
        border-bottom: 1px solid #efeeee;
        display: flex;
        justify-content: space-between;
        height: 50px;
        padding: 0;
        margin: 0;
        width: 100%;
    }
    .menu-logo {
        cursor: pointer;
        height: 50px;
        padding-left: 10px;
    }
    .menu-logo-image {
        height: 50px;
    }
    .menu-user {
        display: flex;
        flex-direction: row;
    }
    #message-envelope {
        color: #8b8b8b;
        cursor: pointer;
        font-size: 20px;
        padding: 16px 26px 0 0;
    }
    #message-envelope:hover {
        color: #232836;
    }
    .menu-user-image {
        cursor: pointer;
        height: 44px;
        border-radius: 24px;
        margin: 4px 10px;
        width: 44px;
    }

    .menu-navbar-list {
        display: flex;
        list-style: none;
    }
    .menu-navbar-list li a {
        color: #8b8b8b;
        text-decoration: none;
    }
    .menu-navbar-list li a:hover {
        color: #232836;
    }
    .menu-navbar-list li {
        position: relative;
        margin-right: 15px;
    }
</style>