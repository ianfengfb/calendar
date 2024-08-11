<template>
    <v-container>
        <v-row>
            <v-infinite-scroll
                direction="horizontal"
                @load="loadDiaries"
            >
                <v-col 
                    v-for="diary in diaries" 
                    :key="diary.id"
                    cols="4"
                >
                    <full-width-card>
                        <diary-item :data="diary"></diary-item>
                    </full-width-card>
                </v-col>
                <template v-slot:empty>
                    No more diary.
                </template>
        </v-infinite-scroll>
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
            }
        },
        computed: {
            diaries() {
                return this.$store.getters['diaries/getDiaries'];
            },
        },
        methods: {
            async loadDiaries({done}) {
                let data = new FormData();
                data.append('offset', this.diaries.length);
                const result = await this.$store.dispatch('diaries/fetchDiaries', data);
                if (result.length > 0) {
                    done('ok');
                } else {
                    done('empty');
                }
            }
        }
    }
</script>