<template>
    <v-table
    fixed-header
  >
    <thead>
      <tr>
        <th colspan="2" class="text-center">
          Name
        </th>
        <th class="text-center">
          Color
        </th>
        <th class="text-center">
          Weekly Budget
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
        <tr
        v-for="item in budgetTypesArray"
        :key="item.name"
        :style="{backgroundColor: item.parent ? '#e9e9e9' : '#fff'}"
        >
            <td colspan="2" class="text-center">
                <v-icon>
                    {{ item.mdi_code }}
                </v-icon>
                <span :class="item.parent ? 'ml-2 bold' : 'ml-2'">{{ item.name }}</span>
            </td>
            <td>
                <div class="d-flex justify-content-center align-items-center">
                    <div class="color-display" :style="{backgroundColor: item.color}"></div>
                </div>
            </td>
            <td :class="item.parent ? 'text-center bold' : 'text-center'">
                <v-text-field
                v-if="item.editting"
                v-model="item.weekly_budget"
                prepend-inner-icon="mdi-currency-usd"
                ></v-text-field>
                <span v-else>{{ '$' + item.weekly_budget }}</span>
            </td>
            <td class="text-center" v-if="item.editting">
                <v-icon class="cursor-pointer" @click="editType(item)">
                    mdi-check
                </v-icon>
            </td>
            <td class="text-center" v-else>
                <v-icon class="cursor-pointer" @click="editType(item)">
                    mdi-pencil
                </v-icon>
            </td>
        </tr>
    </tbody>
  </v-table>
</template>

<script>
  export default {
    data () {
      return {
        edittingObject: {},
      }
    },
    mounted() {
        this.$store.dispatch('budgets/fetchBudgetTypes', 'settings');
    },
    computed: {
        budgetTypes() {
            return this.$store.getters['budgets/getBugetTypesSettings'];
        },
        budgetParentTypes() {
            return this.$store.getters['budgets/getBudgetParentTypes'];
        },
        budgetTypesArray() {
            return Object.keys(this.budgetParentTypes).reduce((acc, key) => {
                const parentWeeklyBudget = this.budgetTypes[key].reduce((sum, item) => sum + parseFloat(item.weekly_budget), 0);
                        acc.push({
                            name: key,
                            id: this.budgetParentTypes[key].id,
                            mdi_code: this.budgetParentTypes[key].mdi_code,
                            color: this.budgetParentTypes[key].color,
                            weekly_budget: parentWeeklyBudget.toFixed(2),
                            parent: true,
                            editting: this.edittingObject.hasOwnProperty('parent' + this.budgetParentTypes[key].id),
                        });

                        this.budgetTypes[key].forEach(item => {
                            acc.push({
                                ...item,
                                parent: false,
                                editting: this.edittingObject.hasOwnProperty(item.id),
                            });
                                });

                            return acc;
                    }, []);
        }
    },
    methods: {
        editType(type) {
            this.edittingObject[type.parent ? 'parent' + type.id : type.id] = type;
        }
    }
  }
</script>

<style scoped>
    .color-display {
        width: 20px;
        height: 20px;
        border-radius: 50%;
    }
    .bold {
        font-weight: bold;
    }
    :deep(.v-input__details) {
        display: none !important;
    }
</style>