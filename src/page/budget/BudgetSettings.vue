<template>
    <section>
        <base-card class="w--80">
            <budget-type-settings-table></budget-type-settings-table>
        </base-card>
    </section>
</template>

<script>
import BudgetTypeSettingsTable from '@/components/budget/BudgetTypeSettingsTable.vue';

export default {
    components: {
        BudgetTypeSettingsTable
    }
}
</script>