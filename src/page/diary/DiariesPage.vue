<template>
    <v-container>
        <v-row>
            <v-col v-if="isFetching">Loading...</v-col>
            <v-col v-else 
                v-for="diary in diaries" 
                :key="diary.id"
                cols="4"
            >
                <full-width-card>
                    <diary-item :data="diary"></diary-item>
                </full-width-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import DiaryItem from '@/components/diary/DiaryItem.vue'
    import FullWidthCard from '@/components/UI/FullWidthCard.vue'
    export default {
        components: {
            DiaryItem,
            FullWidthCard
        },
        data() {
            return {
                isFetching: false
            }
        },
        created() {
            this.loadDiaries();
        },
        computed: {
            diaries() {
                return this.$store.getters['diaries/getDiaries'];
            }
        },
        methods: {
            async loadDiaries() {
                this.isFetching = true;
                let data = new FormData();
                await this.$store.dispatch('diaries/fetchDiaries', data);
                this.isFetching = false;
            }
        }
    }
</script>