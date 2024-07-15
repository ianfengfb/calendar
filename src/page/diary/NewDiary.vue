<template>
    <section>
        <base-card>
            <new-diary-form :id="id"></new-diary-form>
        </base-card>
    </section>
</template>

<script>
    import NewDiaryForm from '@/components/diary/NewDiaryForm.vue'
    export default {
        components: {
            NewDiaryForm
        },
        props: ['id']
    }
</script>

<style scoped>

</style>

