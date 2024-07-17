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
    <v-text-field
        label="Amount"
        v-model.trim="amount"
        prepend-inner-icon="mdi-currency-usd"
    ></v-text-field>
    <v-text-field
        label="Note"
        v-model.trim="note"
    ></v-text-field>
    <v-btn 
        rounded="lg" 
        size="x-large" 
        block
        color="#e9e9e9"
        class="mt-3"
        :disabled="disbaleActions"
    >{{btnText}}</v-btn>
</template>

<script>
    export default {
        data() {
            return {
                datePickerValue: new Date(),
                showDatePicker: false,
                type: null,
                note: '',
                amount: '',
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
                data.append('name', this.search);
                this.disbaleActions = true;
                try {
                    const result = await this.$store.dispatch('budgets/addBudgetType', data);
                    this.type = result.id;
                } catch (error) {
                    console.log(error);
                }
                this.disbaleActions = false;
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
</style>