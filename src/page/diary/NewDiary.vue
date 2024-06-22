<template>
    <section>
        <base-card>
            <h2>How are you doing today?</h2>
            <new-diary-form></new-diary-form>
        </base-card>
    </section>
</template>

<script>
    import NewDiaryForm from '@/components/diary/NewDiaryForm.vue'
    export default {
        components: {
            NewDiaryForm
        }
    }
</script>

