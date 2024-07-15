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
    
</template>

<script>
    export default {
        data() {
            return {
                datePickerValue: new Date(),
                showDatePicker: false,
            }
        },
        computed: {
            date() {
                return this.datePickerValue.toDateString();
            },
            
        },
        methods: {
            toggleDatePicker() {
                this.showDatePicker = !this.showDatePicker;
            },
            selectDate() {
                this.showDatePicker = false;
            },
        }
    }
</script>