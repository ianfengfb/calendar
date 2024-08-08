<template>
    <v-table
    fixed-header
  >
    <thead>
      <tr>
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
                    @update:modelValue="typeChange"
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
            <td class="first-col" v-if="!item.editting">
                <v-icon>
                    {{ item.mdi_code }}
                </v-icon>
                <span :class="item.isParent ? 'ml-2 bold' : 'ml-2'">{{ item.name }}</span>
            </td>
            <td class="text-center" v-else>
                <v-icon>
                    {{ item.mdi_code }}
                </v-icon>
                <span>
                    <v-text-field
                        v-model="edittingName"
                        width="50%"
                    ></v-text-field>
                </span>
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
                <v-icon class="cursor-pointer" @click="editType(item)">
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
            console.log('edittingObject===',type);
            this.edittingId = type.isParent ? 'parent' + type.id : type.id;
            this.edittingParentType = type.budget_parent_type_id == null ? null : {id: type.budget_parent_type_id, name: type.parent_name};
            this.edittingParentSearch = type.budget_parent_type_id  == null ? '' : type.parent_name;
            this.edittingMdiCode = type.mdi_code;
            this.edittingColor = type.color;
            this.edittingName = type.name;
            this.edittingWeeklyBudget = type.weekly_budget;
            this.isEditting = true;
        },
        typeChange(value) {
            //console.log(value);
        },
        async addNewType() {
            let data = new FormData();
            data.append('name', this.edittingParentSearch.trim());
            try {
                const result = await this.$store.dispatch('budgets/addBudgetParentType', data);
                this.type = {
                    name: result.name,
                    id: result.id
                };
            } catch (error) {
                console.log(error);
            }
        }
    },
    watch: {
        edittingParentType(value) {
            console.log(value);
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