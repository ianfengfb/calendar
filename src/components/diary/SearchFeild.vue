<template>
    <v-text-field
        v-model="search"
        label="Search"
        outlined
        dense
        hide-details
        prepend-inner-icon="mdi-magnify"
        placeholder="Input some keywords"
        @update:model-value="searchHandler"
    >
        <v-menu activator="parent" max-height="300px">
            <v-list>
                <v-list-item
                    v-for="(item, index) in searchResults"
                    :key="index"
                    :value="index"
                    :prepend-icon="item.icon"
                    @click="clickSearchHandler(item)"
                >
                    <v-list-item-title v-html="item.content"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-text-field>
</template>

<script>
    import DiaryItem from '../diary/DiaryItem.vue';

    export default {
        components: {
            DiaryItem,
        },
        data() {
            return {
                search: '',
                dialog: false,
                menuModel: null
            }
        },
        methods: {
            clickSearchHandler(item) {
                this.$router.push({query: {endDate: item.date, offset: 0}});
                let data = '/?offset=0&endDate=' + item.date;
                this.$store.dispatch('diaries/fetchDiaries', {data: data, dateChange: true});
            },
            searchHandler() {
                if (this.search.trim().length >= 3) {
                    let data = new FormData();
                    data.append('search', this.search);
                    this.$store.dispatch('diaries/searchDiaries', data);
                } else {
                    this.$store.commit('diaries/resetDiariesSearch');
                }
            }
        },
        computed: {
            searchResults() {
                return this.$store.getters['diaries/getDiariesSearch'];
            },
            isFetchingSearchResults() {
                return this.$store.getters['diaries/isFetchingDiarySearch'];
            }
        }
    }
</script>

<style scoped>
    :deep(.v-list-item) p {
        margin: 0;
    }

    :deep(.v-list-item) .highlighted {
        background-color: yellow;
    }

    :deep(.v-list-item):nth-child(odd) {
        background-color: #dfdbdb;
    }
</style>