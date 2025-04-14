<template>
    <base-card>
        <div class="col-12 px-4">
            <v-row>
                <div class="col-5 p-4">
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
                          :allowed-dates="allowedFirstDay"
                          class="mx-auto"
                      ></v-date-picker>
                    </v-dialog>
                </div>
                <div class="col-5 p-4">
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
                        :allowed-dates="allowedLastDay"
                        class="mx-auto"
                    ></v-date-picker>
                  </v-dialog>
                </div>
                <div class="col-2 p-4">
                    <div class="switch-user-container">
                        <v-avatar>
                            <v-img
                                alt="Ian"
                                src="/src/assets/imgs/ian.png"
                            ></v-img>
                        </v-avatar>
                        <v-switch
                            v-model="user"
                            hide-details
                            inset
                            @change="userChange"
                        ></v-switch>
                        <v-avatar>
                            <v-img
                                alt="Charz"
                                src="/src/assets/imgs/charz.png"
                            ></v-img>
                        </v-avatar>
                    </div>
                </div>
                <div class="col-12 px-4">
                    <v-combobox
                        label="Report Types"
                        :items="reportTypes"
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
                        @click="genereateReport"
                    >{{btnText}}</v-btn>
                </div>
            </v-row>
            <v-row>
                <v-divider></v-divider>
                <v-table class="w-100">
                    <thead>
                        <tr>
                            <th class="text-center">
                            <b>Title</b>
                            </th>
                            <th class="text-center">
                                <b>User</b>
                            </th>
                            <th class="text-center">
                                <b>Start Date</b>
                            </th>
                            <th class="text-center">
                                <b>End Date</b>
                            </th>
                            <th class="text-center">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="report in reports"
                        :key="report.id"
                    >
                        <td class="text-center">{{ report.title }}</td>
                        <td class="text-center">{{ report.user.name }}</td>
                        <td class="text-center">{{ report.start_date }}</td>
                        <td class="text-center">{{ report.end_date }}</td>
                        <td class="text-center"><a :href="report.report_cloud_url" target="_blank">View Report</a></td>
                    </tr>
                    </tbody>
                </v-table>
            </v-row>
            <v-dialog
            v-model="notificationDialog"
            width="auto"
            >
                <v-card>
                    <v-card-title>
                        <span>Generating Report ...</span>
                    </v-card-title>
                    <v-card-text>
                        <v-progress-linear
                            indeterminate
                            color="primary"
                        ></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </base-card>
</template>

<script>
    export default {
        data() {
            return {
                showDatePickerStart: false,
                showDatePickerEnd: false,
                datePickerValueStart: this.getStartOfTheYear(),
                datePickerValueEnd: this.getLastDayOfTheMonth(),
                user: true,
                type: [],
                reportTypes: ['Activity', 'Expense', 'Diary'],
                disbaleActions: false,
                btnText: 'Generate Report',
                notificationDialog: false
            }
        },
        mounted() {
            this.$store.dispatch('reports/fetchReports');
        },
        computed: {
            reports() {
                return this.$store.getters['reports/getReports'];
            },
            startDate() {
                return this.datePickerValueStart.toDateString();
            },
            endDate() {
                return this.datePickerValueEnd.toDateString();
            },
        },
        methods: {
            formatDate(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            userChange() {
                //
            },
            toggleDatePicker(type) {
                if (type === 'start') {
                    this.showDatePickerStart = !this.showDatePickerStart
                } else {
                    this.showDatePickerEnd = !this.showDatePickerEnd
                }
            },
            selectDate(type) {
                if (type === 'start') {
                    this.showDatePickerStart = false
                } else {
                    this.showDatePickerEnd = false
                }
            },
            allowedFirstDay(date) {
                return new Date(date).getDate() === 1;
            },
            allowedLastDay(date) {
                const currentDate = new Date(date);
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const lastDay = new Date(year, month + 1, 0).getDate();

                return currentDate.getDate() === lastDay;
            },
            getStartOfTheYear() {
                const date = new Date();
                date.setMonth(0);
                date.setDate(1);
                return date;
            },
            getLastDayOfTheMonth() {
                const date = new Date();
                date.setMonth(date.getMonth() + 1);
                date.setDate(0);
                return date;
            },
            async genereateReport() {
                this.disbaleActions = true;
                this.btnText = 'Generating Report...';
                this.notificationDialog = true;
                let data = new FormData();
                data.append('user_id', this.user ? 2 : 1);
                data.append('start_date', this.formatDate(this.datePickerValueStart));
                data.append('end_date', this.formatDate(this.datePickerValueEnd));
                data.append('type', JSON.stringify([this.type]));
                await this.$store.dispatch('reports/addReport', data);
                this.disbaleActions = false;
                this.btnText = 'Generate Report';
                this.notificationDialog = false;
            }
        }
    }
</script>

<style scoped>
    .switch-user-container {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }
</style>