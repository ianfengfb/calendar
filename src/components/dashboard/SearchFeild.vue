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
        <v-menu activator="parent" :close-on-content-click="false" max-height="300px">
            <v-list>
                <v-list-item
                    v-for="(item, index) in searchResults"
                    :key="index"
                    :value="index"
                    :prepend-icon="item.icon"
                    :class="item.type == 'diary' ? 'diary-item' : 'expense-item'"
                    @click="clickSearchHandler(item)"
                >
                    <v-list-item-title v-html="item.content"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-text-field>
    <v-dialog
      v-model="dialog"
      width="auto"
      scrollable
    >
        <v-icon class="close-icon" @click="dialog = false" v-if="isFetchingSingleItem && singleItem?.type">mdi-close-circle</v-icon>
        <v-skeleton-loader type="card" v-if="isFetchingSingleItem && singleItem?.type"></v-skeleton-loader>
        <scroll-card :class="singleItem.type == 'diary' ? 'w--60' : ''" v-else>
            <v-icon class="close-icon-inner" @click="dialog = false">mdi-close-circle</v-icon>
            <diary-item :data="singleItem.data" :single="true" v-if="singleItem.type == 'diary'"></diary-item>
            <v-data-table-virtual :items="singleItem.data" v-else></v-data-table-virtual>
        </scroll-card>
    </v-dialog>
</template>

<script>
    import DiaryItem from '../diary/DiaryItem.vue';
import BaseCard from '../UI/BaseCard.vue';

    export default {
        components: {
            DiaryItem,
                BaseCard
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
                this.dialog = true;
                let data = new FormData();
                data.append('type', item.type);
                data.append('date', item.date);
                this.$store.dispatch('dashboard/fetchSingleItem', data);
            },
            searchHandler() {
                if (this.search.length > 3) {
                    let data = new FormData();
                    data.append('search', this.search);
                    this.$store.dispatch('dashboard/fetchSearchContent', data);
                } else {
                    this.$store.dispatch('dashboard/resetSearchContent');
                }
            }
        },
        computed: {
            searchResults() {
                return this.$store.getters['dashboard/getSearchContent'];
            },
            isFetchingSingleItem() {
                return this.$store.getters['dashboard/getIsFetchingSingleItem'];
            },
            isFetchingSearchContent() {
                return this.$store.getters['dashboard/getIsFetchingSearchContent'];
            },
            singleItem() {
                return this.$store.getters['dashboard/getSingleItem'];
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

    :deep(.v-list-item.diary-item):hover {
        background-color: rgb(231, 57, 57, 0.7);;
    }

    :deep(.v-list-item.expense-item):hover {
        background-color: rgb(5, 124, 236, 0.7);
    }

    :deep(.v-list-item--active.diary-item) {
        background-color: rgb(231, 57, 57, 1);
    }

    :deep(.v-list-item--active.expense-item) {
        background-color: rgb(5, 124, 236, 1);
    }

    .noContent {
        display: none;
    }

    .close-icon {
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
    }

    .close-icon-inner {
        position: absolute;
        right: 1rem;
        top: 1rem;
        cursor: pointer;
    }

</style>