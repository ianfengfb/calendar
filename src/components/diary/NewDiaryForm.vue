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
        auto-grow
        @blur="makeNoteValid"
        :error="!isNoteValid"
        class="mt-5"
    ></v-textarea>
    <p class="text-err" v-if="!isNoteValid">Please leave a note</p>
    <v-file-input
        accept="image/*"
        label="File input"
        class="mt-3"
        v-model="file"
    ></v-file-input>
    <div :class="{ratingErr: !isRatingValid}" class="mt-5">
        <label >How happy are you today</label>
        <v-rating
            v-model="rating"
            empty-icon="mdi-emoticon-outline"
            full-icon="mdi-emoticon-wink"
            length=10
            hover
            :density="isLargeScreen ? 'default' : 'compact'"
            @update:modelValue="makeRatingValid"
        ></v-rating>
    </div>
    <p class="text-err" v-if="!isRatingValid">Please leave a rating</p>
    <v-btn 
        rounded="lg" 
        size="x-large" 
        block
        color="primary"
        @click="saveDiary"
        class="mt-3"
    >Submit</v-btn>
</template>

<script>
    export default {
        data() {
            return {
                datePickerValue: new Date(),
                showDatePicker: false,
                note: '',
                file: null,
                rating: 0,
                isLargeScreen: true,
                isNoteValid: true,
                isRatingValid: true,
                noteErrorMessage: []
            }
        },
        emits: ['save-data'],
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
                    this,this.isNoteValid = false;
                    this.noteErrorMessage.push('Please leave some notes');
                } else {
                    this.isNoteValid = true;
                    this.noteErrorMessage = [];
                }
                if (this.rating === 0) {
                    this.isRatingValid = false;
                }
            },
            saveDiary() {
                this.validatingForm();
                if (this.isNoteValid && this.isRatingValid) {
                    let data = new FormData();
                    data.append('date', this.date);
                    data.append('note', this.note);
                    data.append('file', this.file);
                    data.append('rating', this.rating);
                    this.$emit('save-data', data);
                }
            },
            makeRatingValid() {
                this.isRatingValid = true;
            },
            makeNoteValid() {
                this.isNoteValid = true;
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
    .text-err {
        color: rgb(176, 0, 32);
        font-size: 12px;
        padding: 6px 0 0 12px;
    }
    .ratingErr {
        border-bottom: 1px solid rgb(176, 0, 32);
    }
    ::v-deep .v-input__details {
        display: none !important;
    }
</style>