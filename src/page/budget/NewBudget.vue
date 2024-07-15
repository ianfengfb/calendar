<template>
    <section>
        <base-card>
            <new-budget-form></new-budget-form>
        </base-card>
    </section>
</template>

<script>
    import NewBudgetForm from '@/components/budget/NewBudgetForm.vue'
    export default {
        components: {
            NewBudgetForm
        },
    }
</script>