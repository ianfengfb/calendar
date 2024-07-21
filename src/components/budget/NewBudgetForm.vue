<template>
    <h2>What are your expends today?</h2>
    <v-text-field 
        label="Date" 
        class="mt-5"
        v-model="date"
        readonly
        @click="toggleDatePicker"
    ></v-text-field>
    <v-date-picker 
        v-if="showDatePicker"
        v-model="datePickerValue"
        @update:modelValue="selectDate"
    ></v-date-picker>
    <v-combobox
        label="Expense Type"
        :items="fechedTypes"
        v-model:search="search"
        item-title="name"
        item-value="id"
        hide-no-data
        v-model="type"
        :disabled="disbaleActions"
        class="mt-5"
        @update:modelValue="typeChange"
    >
        <template v-slot:no-data>
            <v-list-item>
                <v-list-item-title>
                No results matching "<strong>{{ search }}</strong>". Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
            </v-list-item>
        </template>
        <template v-slot:append v-if="search.trim().length > 0">
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
    <p class="text-err" v-if="!isTypeValid">Please choose a type</p>
    <v-text-field
        label="Amount"
        v-model.trim="amount"
        prepend-inner-icon="mdi-currency-usd"
        class="mt-5"
        @update:modelValue="amountChange"
    ></v-text-field>
    <p class="text-err" v-if="!isAmountValid">Please enter an amount</p>
    <p class="text-err" v-if="!isAmountFomratted">Please enter a valid number</p>
    <v-text-field
        label="Note (optional)"
        v-model.trim="note"
        class="mt-5"
    ></v-text-field>
    <v-btn 
        rounded="lg" 
        size="x-large" 
        block
        color="#e9e9e9"
        class="mt-3"
        :disabled="disbaleActions"
        @click="addNewExpense"
    >{{btnText}}</v-btn>
</template>

<script>
    export default {
        data() {
            return {
                datePickerValue: new Date(),
                showDatePicker: false,
                type: null,
                isTypeValid: true,
                note: '',
                amount: '',
                isAmountValid: true,
                isAmountFomratted: true,
                btnText: 'Save',
                search: '',
                disbaleActions: false
            }
        },
        mounted() {
            this.$store.dispatch('budgets/fetchBudgetTypes');
        },
        computed: {
            date() {
                return this.datePickerValue.toDateString();
            },
            fechedTypes() {
                const tempTypes = this.$store.getters['budgets/getBudgetTypes'];
                return tempTypes.map(type => {
                    return {
                        name: type.name,
                        id: type.id
                    }
                });
            }
        },
        methods: {
            toggleDatePicker() {
                this.showDatePicker = !this.showDatePicker;
            },
            selectDate() {
                this.showDatePicker = false;
            },
            async addNewType() {
                let data = new FormData();
                data.append('name', this.search.trim());
                this.disbaleActions = true;
                try {
                    const result = await this.$store.dispatch('budgets/addBudgetType', data);
                    this.type = result.id;
                } catch (error) {
                    console.log(error);
                }
                this.disbaleActions = false;
            },
            async addNewExpense() {
                this.validateForm();
                if (!this.isTypeValid || !this.isAmountValid || !this.isAmountFomratted) return;
                let data = new FormData();
                data.append('budget_type_id', this.type.id);
                data.append('amount', this.amount);
                if (this.note.trim().length > 0) {
                    data.append('note', this.note);
                }
                data.append('date', this.datePickerValue.toISOString().split('T')[0]);
                this.disbaleActions = true;
                this.btnText = 'Saving...';
                try {
                    await this.$store.dispatch('budgets/addExpense', data);
                    resetForm();
                } catch (error) {
                    console.log(error);
                }
                this.disbaleActions = false;
                this.btnText = 'Save';
            },
            validateForm() {
                if (this.type === null) {
                    this.isTypeValid = false;
                } else {
                    this.isTypeValid = true;
                }
                if (this.amount.trim().length === 0) {
                    this.isAmountValid = false;
                } else {
                    this.isAmountValid = true;
                }
                if (isNaN(this.amount) || (this.amount.split('.').length > 1 && this.amount.split('.')[1].length > 2)){
                    if (this.isAmountValid) {
                        this.isAmountFomratted = false;
                    }
                } else {
                    this.isAmountFomratted = true;
                }
            },
            resetForm() {
                this.type = null;
                this.isTypeValid = true;
                this.amount = '';
                this.isAmountValid = true;
                this.isAmountFomratted = true;
                this.note = '';
                this.datePickerValue = new Date();
                this.search = '';
            },
            amountChange() {
                if (this.amount.trim().length > 0) {
                    this.isAmountValid = true;
                }
                if (!isNaN(this.amount) && this.amount.split('.').length > 1 && this.amount.split('.')[1].length <= 2) {
                    this.isAmountFomratted = true;
                }
            },
            typeChange() {
                if (this.type !== null) {
                    this.isTypeValid = true;
                }
            }
        },
    }
</script>

<style scoped>
    .add-new-type {
        cursor: pointer;
        font-size: 2rem;
    }
    .add-new-type:hover {
        transform: scale(1.1);
        text-shadow: 0 0 5px #000;
    }
    .text-err {
        color: rgb(176, 0, 32);
        font-size: 12px;
        padding: 6px 0 0 12px;
    }
    :deep(.v-input__details) {
        display: none !important;
    }
</style>