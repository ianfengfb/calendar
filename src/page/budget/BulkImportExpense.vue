<template>
    <section>
        <base-card>
            <bulk-import-expense-form></bulk-import-expense-form>
        </base-card>
    </section>
</template>

<script>
    import BulkImportExpenseForm from '@/components/budget/BulkImportExpenseForm.vue'
    export default {
        components: {
            BulkImportExpenseForm
        },
    }
</script>
