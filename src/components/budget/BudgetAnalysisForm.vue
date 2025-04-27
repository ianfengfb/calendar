<template>
    <v-row>
        <div class="col-12 px-4">
            <v-row>
                <v-dialog max-width="500">
                <template v-slot:activator="{ props: activatorProps }">
                    <v-btn
                    v-bind="activatorProps"
                    color="surface-variant"
                    text="Open Dialog"
                    variant="flat"
                    v-if="showDialogTrigger['value']"
                    ></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="Dialog">
                    <v-card-text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                        text="Close Dialog"
                        @click="isActive.value = false"
                        ></v-btn>
                    </v-card-actions>
                    </v-card>
                </template>
                </v-dialog>
            </v-row>
            <v-row>
                <div class="col-6 p-4">
                  <v-text-field 
                    label="Start Date" 
                    v-model="startDate"
                    readonly
                    @click="toggleDatePicker('start')"
                  ></v-text-field>
                    <v-dialog
                      v-model="showDatePickerStart"
                      width="100%"
                    >
                      <v-date-picker 
                          v-model="datePickerValueStart"
                          @update:modelValue="selectDate('start')"
                          class="mx-auto"
                      ></v-date-picker>
                    </v-dialog>
                </div>
                <div class="col-6 p-4">
                  <v-text-field 
                    label="End Date" 
                    v-model="endDate"
                    readonly
                    @click="toggleDatePicker('end')"
                  ></v-text-field>
                  <v-dialog
                    v-model="showDatePickerEnd"
                    width="100%"
                  >
                    <v-date-picker 
                        v-model="datePickerValueEnd"
                        @update:modelValue="selectDate('end')"
                        class="mx-auto"
                    ></v-date-picker>
                  </v-dialog>
                </div>
                <div class="col-12 px-4">
                    <v-combobox
                        multiple
                        item-title="name"
                        item-value="id"
                        label="Expense Types"
                        :items="fechedTypes"
                        v-model="type"
                    ></v-combobox>
                </div>
                <div class="col-12 p-4">
                    <v-btn 
                        rounded="lg" 
                        size="x-large" 
                        block
                        color="#e9e9e9"
                        class="mt-3"
                        :disabled="disbaleActions"
                        @click="onSearch"
                    >{{btnText}}</v-btn>
                </div>
            </v-row>
            <v-row>
                <div class="col-6">
                    <v-skeleton-loader 
                        v-if="isFetchingExpensesPieChart"
                        type="chart"
                        width="100%"
                        height="100%"
                    ></v-skeleton-loader>
                    <Pie 
                        v-else
                        id="pie-chart-id"
                        :data="pieChartData" 
                        :options="pieChartOptions" 
                    />
                </div>
                <div class="col-6">
                    <v-skeleton-loader 
                        v-if="isFetchingExpensesPieChart"
                        type="table"
                        width="100%"
                        height="100%"
                    ></v-skeleton-loader>
                    <v-data-table-virtual v-else :items="tableData"></v-data-table-virtual>
                </div>
            </v-row>
            <v-row>
                <div class="col-12">
                    <!-- <v-table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Note</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in detailedExepensesData" :key="index">
                                <td>{{ item.date }}</td>
                                <td>{{ item.budget_type_name }}</td>
                                <td>{{ item.amount }}</td>
                                <td>{{ item.note }}</td>
                            </tr>
                        </tbody>
                    </v-table> -->
                    <v-data-table-virtual
                        :items="detailedExepensesData"
                        :headers="[
                            { title: 'Date', key: 'date' },
                            { title: 'Type', key: 'budget_type_name' },
                            { title: 'Amount', key: 'amount' },
                            { title: 'Note', key: 'note' }
                        ]"
                        class="elevation-1"
                    ></v-data-table-virtual>
                </div>
            </v-row>
        </div>
    </v-row>
</template>

<script>
    import { Pie } from 'vue-chartjs';

    export default {
        components: {
            Pie
        },
        data() {
            return {
                datePickerValueStart: this.getStartOfTheMonth(),
                showDatePickerStart: false,
                datePickerValueEnd: this.getEndOfTheMonth(),
                showDatePickerEnd: false,
                type: null,
                btnText: 'Search',
                disbaleActions: false,
                pieChartOptions: {
                    responsive: true,
                },
                showDialogTrigger: {
                    value: false,
                    number : 0
                }
            }
        },
        mounted() {
            this.$store.dispatch('budgets/fetchBudgetTypes', 'expense');
        },
        computed: {
            startDate() {
                return this.datePickerValueStart.toDateString();
            },
            endDate() {
                return this.datePickerValueEnd.toDateString();
            },
            fechedTypes() {
                const tempTypes = this.$store.getters['budgets/getBudgetTypes'];
                const result = tempTypes.map(type => {
                    return {
                        name: type.name,
                        id: type.id
                    }
                });
                return result.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
            },
            expensePieChart() {
                return this.$store.getters['budgets/getExpensesPieChart'];
            },
            isFetchingExpensesPieChart() {
                return this.$store.getters['budgets/getIsFetchingExpensesPieChart'];
            },
            pieChartData() {
                if (!this.expensePieChart.chartLabels) return {
                    labels: [],
                    datasets: []
                };
                let chartLabels = this.expensePieChart.chartLabels;

                return {
                    labels: chartLabels,
                    datasets: [
                        {
                        backgroundColor: chartLabels.map(label => this.expensePieChart.chartExpenseData[label].color),
                        data: chartLabels.map(label => this.expensePieChart.chartExpenseData[label].total_amount)
                        }
                    ]
                }
            },
            tableData() {
                if (!this.expensePieChart.tableData) return [];
                return this.expensePieChart.tableData;
            },
            detailedExepensesData() {
                if (!this.expensePieChart.detailedExpenses) return [];
                    return this.expensePieChart.detailedExpenses;
                },
        },
        methods: {
            toggleDatePicker(type) {
                if (type === 'start') {
                    this.showDatePickerStart = !this.showDatePickerStart;
                } else {
                    this.showDatePickerEnd = !this.showDatePickerEnd;
                }
            },
            selectDate(type) {
                if (type === 'start') {
                if (this.datePickerValueStart > this.datePickerValueEnd) {
                    this.datePickerValueStart = this.datePickerValueEnd;
                }
                this.showDatePickerStart = false;
                } else {
                if (this.datePickerValueEnd < this.datePickerValueStart) {
                    this.datePickerValueStart = this.datePickerValueEnd;
                }
                this.showDatePickerEnd = false;
                }
            },
            getStartOfTheMonth() {
                const date = new Date();
                return new Date(date.getFullYear(), date.getMonth(), 1);
            },
            getEndOfTheMonth() {
                const date = new Date();
                return new Date(date.getFullYear(), date.getMonth() + 1, 0);
            },
            onSearch() {
                let data = new FormData();
                data.append('start_date', this.dateToFormatYMD(this.datePickerValueStart));
                data.append('end_date', this.dateToFormatYMD(this.datePickerValueEnd));
                const seletedTypeIds = this.type.map(type => type.id);
                data.append('budget_type_ids', JSON.stringify(seletedTypeIds));
                this.$store.dispatch('budgets/fetchExpensesPieChart', data);
            },
            dateToFormatYMD(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            }
        }
    }
</script>