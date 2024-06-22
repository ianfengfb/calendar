<template>
    <section>
        <base-card>
            <h2>How are you doing today?</h2>
            <new-diary-form @save-data="saveData"></new-diary-form>
        </base-card>
    </section>
</template>

<script>
    import NewDiaryForm from '@/components/diary/NewDiaryForm.vue'
    export default {
        components: {
            NewDiaryForm
        },
        methods: {
            saveData(data) {
                this.$store.dispatch('diaries/addDiary', data);
            }
        }
    }
</script>

