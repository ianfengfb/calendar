<template>
    <section>
        <base-card class="w--80">
            <budget-type-settings></budget-type-settings>
        </base-card>
    </section>
</template>

<script>
import BudgetTypeSettings from '@/components/budget/BudgetTypeSettings.vue';

export default {
    components: {
        BudgetTypeSettings
    }
}
</script>