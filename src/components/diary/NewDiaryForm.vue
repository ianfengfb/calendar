<template>
    <v-container v-if="isFetching">
        <v-row>
            <v-col>Loading...</v-col>
        </v-row>
    </v-container>
    <template v-else>
        <div class="form-title">
            <h2 v-if="!!id">Edit this diary:</h2>
            <h2 v-else>How are you doing today?</h2>
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
                ></v-switch>
                <v-avatar>
                    <v-img
                        alt="Charz"
                        src="/src/assets/imgs/charz.png"
                    ></v-img>
                </v-avatar>
            </div>
        </div>
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
            v-model="files"
            multiple
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
            color="#e9e9e9"
            @click="saveDiary"
            class="mt-3"
        >{{btnText}}</v-btn>
    </template>
</template>

<script>
    export default {
        props: ['id'],
        data() {
            return {
                user: false,
                datePickerValue: new Date(),
                showDatePicker: false,
                note: '',
                files: null,
                rating: 0,
                isLargeScreen: true,
                isNoteValid: true,
                isRatingValid: true,
                noteErrorMessage: [],
                isSaving: false,
                isFetching: false
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
            submitDiary() {
                if (this.isSaving) return;
                this.validatingForm();
                if (this.isNoteValid && this.isRatingValid) {
                    this.saveDiary();
                }
            },
            async saveDiary() {
                this.isSaving = true;
                let data = new FormData();
                data.append('date', this.datePickerValue.toISOString().split('T')[0]);
                data.append('note', this.note);
                if (this.files !== null) {
                    this.files.forEach(file => {
                        data.append('images[]', file);
                    });
                }
                data.append('mood', this.rating);
                data.append('user_id', this.user ? 2 : 1);
                try {
                    await this.$store.dispatch('diaries/addDiary', data);
                    this.resetForm();
                } catch (error) {
                    console.log(error);
                }
                this.isSaving = false;
            },
            makeRatingValid() {
                this.isRatingValid = true;
            },
            makeNoteValid() {
                this.isNoteValid = true;
            },
            resetForm() {
                this.datePickerValue = new Date();
                this.note = '';
                this.files = null;
                this.rating = 0;
                this.isNoteValid = true;
                this.isRatingValid = true;
                this.noteErrorMessage = [];
            },
            async readSingleDiary(passId) {
                this.isFetching = true;
                const result = await this.$store.dispatch('diaries/getSingleDiary', passId);
                this.datePickerValue = new Date(result.date);
                this.note = result.note;
                this.rating = result.mood;
                this.isFetching = false;
            }
        },
        computed: {
            date() {
                return this.datePickerValue.toDateString();
            },
            btnText() {
                if (!!this.id) {
                    return this.isSaving ? 'Updating...' : 'Update';
                } else {
                    return this.isSaving ? 'Saving...' : 'Save';
                }
            },
        },
        watch: {
            id(curVal, _) {
                if (!!!curVal) {
                    this.resetForm();
                }
            }
        },
        mounted() {
            window.addEventListener('resize', this.handleResize);
            this.isLargeScreen = window.innerWidth >= 768;
            if (!!this.id) {
                this.readSingleDiary(this.id);
            }
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.handleResize);
        },
    }
</script>

<style scoped>
    .form-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .switch-user-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
    }
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
    ::deep .v-input__details {
        display: none !important;
    }
</style>