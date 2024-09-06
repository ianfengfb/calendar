<template>
    <v-table
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-center">
        </th>
        <th class="text-center">
        </th>
        <th class="text-center">
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
        :style="{backgroundColor: item.isParent ? '#e9e9e9' : '#fff'}"
        >
            <td class="text-center" width="30%" v-if="item.editting">
                <v-combobox
                    label="Parent Type"
                    :items="fetchedTypes"
                    v-model:search="edittingParentSearch"
                    item-title="name"
                    item-value="id"
                    hide-no-data
                    v-model="edittingParentType"
                    :disabled="parentDisbaleActions"
                    class="mt-5"
                    v-if="!item.isParent"
                >
                    <template v-slot:no-data>
                        <v-list-item>
                            <v-list-item-title>
                            No results matching "<strong>{{ edittingParentSearch }}</strong>". Press <kbd>enter</kbd> to create a new one
                            </v-list-item-title>
                        </v-list-item>
                    </template>
                    <template v-slot:append v-if="edittingParentSearch.trim().length > 0">
                        <v-slide-x-reverse-transition mode="out-in">
                            <v-icon
                            key="icon"
                            icon="mdi-plus"
                            class="add-new-type"
                            @click="addNewType"
                            ></v-icon>
                        </v-slide-x-reverse-transition>
                    </template>
                </v-combobox>
            </td>
            <td v-else></td>
            <td class="text-center" v-if="!item.editting">
                <v-icon>
                    {{ item.mdi_code }}
                </v-icon>
            </td>
            <td class="text-center" v-else>
                <mdi-icon-picker :icon="edittingMdiCode" @changeIcon="changeIconHandler"></mdi-icon-picker>
            </td>
            <td class="text-center" v-if="!item.editting">
                <span :class="item.isParent ? 'ml-2 bold' : 'ml-2'">{{ item.name }}</span>
            </td>
            <td class="text-center" v-else>
                <v-text-field
                    v-model="edittingName"
                ></v-text-field>
            </td>
            <td>
                <div class="d-flex justify-content-center align-items-center">
                    <input 
                        type="color" 
                        v-model="edittingColor" 
                        v-if="item.editting"
                    />
                    <div 
                        class="color-display" 
                        :style="{backgroundColor: item.color}" 
                        v-else
                    >
                    </div>
                </div>
            </td>
            <td :class="item.isParent ? 'text-center bold' : 'text-center'">
                <v-text-field
                v-if="item.editting && !item.isParent"
                v-model="edittingWeeklyBudget"
                prepend-inner-icon="mdi-currency-usd"
                ></v-text-field>
                <span v-else>{{ '$' + item.weekly_budget }}</span>
            </td>
            <td class="text-center" v-if="!isEditting && item.id != null">
                <v-icon class="cursor-pointer" @click="editType(item)">
                    mdi-pencil
                </v-icon>
            </td>
            <td class="text-center" v-if="isEditting && item.editting">
                <v-icon class="cursor-pointer" @click="updateType(item.isParent)">
                    mdi-check
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
        isEditting: false,
        edittingId: null,
        edittingFriendlyId: null,
        edittingParentType: null,
        edittingParentSearch: '',
        edittingMdiCode: '',
        edittingColor: '',
        parentDisbaleActions: false,
        edittingName: '',
        edittingWeeklyBudget: '',
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
                            isParent: true,
                            editting: this.edittingId == ('parent' + this.budgetParentTypes[key].id),
                        });

                        this.budgetTypes[key].forEach(item => {
                            acc.push({
                                ...item,
                                isParent: false,
                                editting: this.edittingId == item.id,
                            });
                        });
                            return acc;
                    }, []);
        },
        fetchedTypes() {
            const fetchedParent = this.$store.getters['budgets/getBudgetParentSelections'];
            const parentTypes = fetchedParent.map(item => {
                return {
                    name: item.name,
                    id: item.id
                }
            });
            return parentTypes;
        },
    },
    methods: {
        editType(type) {
            this.edittingId = type.isParent ? 'parent' + type.id : type.id;
            this.edittingFriendlyId = type.id;
            if (!type.isParent) {
                this.edittingParentType = type.budget_parent_type_id == null ? null : {id: type.budget_parent_type_id, name: type.parent_name};
                this.edittingParentSearch = type.budget_parent_type_id  == null ? '' : type.parent_name;
                this.edittingWeeklyBudget = type.weekly_budget;
            }
            this.edittingMdiCode = type.mdi_code;
            this.edittingColor = type.color;
            this.edittingName = type.name;
            this.isEditting = true;
        },
        changeIconHandler(value) {
            this.edittingMdiCode = value;
        },
        async addNewType() {
            let data = new FormData();
            data.append('name', this.edittingParentSearch.trim());
            try {
                const result = await this.$store.dispatch('budgets/addBudgetParentType', data);
                this.edittingParentType = {
                    name: result.name,
                    id: result.id
                };
            } catch (error) {
                console.log(error);
            }
        },
        async updateType(isParent) {
            let data = new FormData();
            data.append('isParent', isParent ? 1 : 0);
            data.append('id', this.edittingFriendlyId);
            data.append('name', this.edittingName);
            data.append('mdi_code', this.edittingMdiCode);
            data.append('color', this.edittingColor);
            if (!isParent) {
                data.append('budget_parent_type_id', this.edittingParentType == null ? null : this.edittingParentType.id);
                data.append('weekly_budget', this.edittingWeeklyBudget);
            }
            try {
                await this.$store.dispatch('budgets/updateBudgetType', data);
                await this.$store.dispatch('budgets/fetchBudgetTypes', 'settings');
            } catch (error) {
                console.log(error);
            }
            this.isEditting = false;
            this.edittingId = null;
            this.edittingFriendlyId = null;
            this.edittingParentType = null;
            this.edittingParentSearch = '';
            this.edittingMdiCode = '';
            this.edittingColor = '';
            this.parentDisbaleActions = false;
            this.edittingName = '';
            this.edittingWeeklyBudget = '';
        }
    },
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
    .add-new-type {
        cursor: pointer;
        font-size: 2rem;
    }
    .add-new-type:hover {
        transform: scale(1.1);
        text-shadow: 0 0 5px #000;
    }
    :deep(.v-input__details) {
        display: none !important;
    }
</style>