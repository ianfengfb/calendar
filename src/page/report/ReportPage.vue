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
                        multiple
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
                datePickerValueEnd: new Date(),
                user: true,
                type: [],
                reportTypes: ['Activity', 'Expense', 'Diary'],
                disbaleActions: false,
                btnText: 'Generate Report',
                notificationDialog: false
            }
        },
        computed: {
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
                    this.startDate = this.datePickerValueStart
                    this.showDatePickerStart = false
                } else {
                    this.endDate = this.datePickerValueEnd
                    this.showDatePickerEnd = false
                }
            },
            getStartOfTheYear() {
                const date = new Date();
                date.setMonth(0);
                date.setDate(1);
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
                data.append('type', JSON.stringify(this.type));
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