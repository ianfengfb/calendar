<template>
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
    <v-textarea
        label="Note"
        v-model.trim="note"
        variant="filled"
        @blur="validatingForm"
        auto-grow
    ></v-textarea>
    <p class="text-danger">Please leave some note</p>
    <v-file-input
        accept="image/*"
        label="File input"
    ></v-file-input>
    <div class="form-control">
        <label>How happy are you today</label>
        <v-rating
            v-model="rating"
            empty-icon="mdi-emoticon-outline"
            full-icon="mdi-emoticon-wink"
            length=10
            hover
            :density="isLargeScreen ? 'default' : 'compact'"
        ></v-rating>
    </div>
    <v-btn 
        rounded="lg" 
        size="x-large" 
        block
        color="primary"
        @click="saveDiary"
    >Submit</v-btn>
</template>

<script>
    export default {
        data() {
            return {
                datePickerValue: new Date(),
                showDatePicker: false,
                note: '',
                file: '',
                rating: 0,
                isLargeScreen: true,
                isNoteValid: true,
                isRatingValid: true
            }
        },
        methods: {
            toggleDatePicker() {
                this.showDatePicker = !this.showDatePicker;
            },
            selectDate() {
                this.showDatePicker = false;
            },
            handleResize() {
                this.isLargeScreen = window.innerWidth >= 768;
            },
            validatingForm() {
                if (this.note === '') {
                    this.isNoteValid = false;
                } else {
                    this.isNoteValid = true;
                }
                if (this.rating === 0) {
                    this.isRatingValid = false;
                } else {
                    this.isRatingValid = true;
                }
            },
            saveDiary() {
                this.validatingForm();
                if (this.isNoteValid && this.isRatingValid) {
                    console.log('Note:', this.note);
                    console.log('File:', this.file);
                    console.log('Rating:', this.rating);
                    console.log('Date:', this.date);
                }
            }
        },
        computed: {
            date() {
                return this.datePickerValue.toDateString();
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
            this.isLargeScreen = window.innerWidth >= 768;
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
        },
    }
</script>

<style scoped>
    label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    }
</style>