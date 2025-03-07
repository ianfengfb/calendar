<template>
    <section>
        <base-card class="w--80">
            <budget-analysis-form></budget-analysis-form>
        </base-card>
    </section>
</template>

<script>
import BudgetAnalysisForm from '@/components/budget/BudgetAnalysisForm.vue';

export default {
    components: {
        BudgetAnalysisForm,
    }
}
</script>