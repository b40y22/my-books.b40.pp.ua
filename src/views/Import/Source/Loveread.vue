<template>
    <div>
        <div class="container">
            <div class="content">
                <input type="text" class="__link" placeholder="URL for import" v-model="importLink" />
                <select class="__select" name="storeLocation" v-model="format">
                    <option selected="selected">PDF</option>
                    <option>DB</option>
                </select>
                <button class="__button" @click="importBook">Додати</button>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import api from "@/api";

export default {
    name: "Loveread",
    data() {
        return {
            activeTab: '#form',
            authors: [],
            book: {
                author: [
                    {
                        id: 0,
                        new: false,
                        firstname: '',
                        lastname: '',
                    }
                ],
                category_id: 0,
                description: '',
                image: {
                    choose: false,
                    filename: 'Имя файла',
                    file: '',
                },
                pages: 1,
                series_id: 0,
                title: '',
                year: 0,
            },
            format: '',
            importLink: '',
            exampleLink: 'http://loveread.ec/view_global.php?id=76933',
            message: {
                show: false,
                status: '',
                text: ''
            },
            successText: 'Успешно сохранено',
            errorText: 'Ошибка при сохранении',
        }
    },
    methods: {
        importBook() {
            if (!this.importLink.length) {
                this.message.status = 'error';
                this.message.text = 'Заполните URL';
                this.message.show = true;
                return;
            }
            if (!this.format.length) {
                this.message.status = 'error';
                this.message.text = 'Выберите формат';
                this.message.show = true;
                return;
            }

            api.importBook({'link': this.importLink, 'type': this.format}).then(response => {
                if (201 === response.status) {
                    this.message.status = 'success';
                    this.message.text = response.data.message;
                    this.message.show = true;
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>

<style scoped>
    .container {
        flex-direction: column;
    }
    .content {
        display: flex;
        flex-direction: row;
        margin-top: 100px!important;
    }
    .__link {
        width: 200px;
    }
</style>