<template>
    <v-container>
        <v-row>
            <div class="col-4 px-4 ml-5">
                  <v-text-field 
                    label="Date" 
                    v-model="endDate"
                    readonly
                    @click="toggleDatePicker"
                  ></v-text-field>
                  <v-dialog
                    v-model="showDatePicker"
                    width="100%"
                  >
                    <v-date-picker 
                        v-model="datePickerValue"
                        @update:modelValue="selectDate"
                        class="mx-auto"
                    ></v-date-picker>
                  </v-dialog>
            </div>
            <div class="col-4 px-4">
                <search-feild></search-feild>
            </div>
            <v-col cols="12">
                <v-infinite-scroll
                    direction="horizontal"
                    @load="loadDiaries"
                >
                    <v-col 
                        v-for="diary in diaries" 
                        :key="diary.id"
                        cols="4"
                    >
                        <full-width-card>
                            <diary-item :data="diary"></diary-item>
                        </full-width-card>
                    </v-col>
                    <template v-slot:empty>
                        No more diary.
                    </template>
                </v-infinite-scroll>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import DiaryItem from '@/components/diary/DiaryItem.vue'
    import FullWidthCard from '@/components/UI/FullWidthCard.vue'
    import SearchFeild from '@/components/diary/SearchFeild.vue'

    export default {
        components: {
            DiaryItem,
            FullWidthCard,
            SearchFeild
        },
        data() {
            return {
                showDatePicker: false,
                datePickerValue: new Date(),
                date: null
            }
        },
        unmounted() {
            this.$store.commit('diaries/resetDiaries');
        },
        computed: {
            diaries() {
                return this.$store.getters['diaries/getDiaries'];
            },
            startDate() {
                return this.$route.query.startDate;
            },
            endDate() {
                return this.$route.query.endDate;
            }
        },
        methods: {
            async loadDiaries({done}) {
                let data = '/?offset=' + this.diaries.length;
                if (this.startDate) {
                    data += '&startDate=' + this.startDate;
                }
                if (this.endDate) {
                    data += '&endDate=' + this.endDate;
                }
                const result = await this.$store.dispatch('diaries/fetchDiaries', {data: data, dateChange: false});
                if (result.length > 0) {
                    done('ok');
                } else {
                    done('empty');
                }
            },
            toggleDatePicker() {
                this.showDatePicker = !this.showDatePicker;
            },
            selectDate() {
                this.showDatePicker = false;
                const selectedDate = this.dateToFormatYMD(this.datePickerValue);
                this.$router.push({query: {endDate: selectedDate, offset: 0}});
                let data = '/?offset=0&endDate=' + selectedDate;
                this.$store.dispatch('diaries/fetchDiaries', {data: data, dateChange: true});
            },
            dateToFormatYMD(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            }
        }
    }
</script>