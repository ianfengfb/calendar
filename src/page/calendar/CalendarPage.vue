<template>
    <base-card>
        <v-calendar
            ref="calendar"
            v-model="value"
            :events="formattedEvents"
            view-mode="month"
            @update:modelValue="dateChange"
            @click:event="showDiary"
        >
        <template
            v-slot:event="{ event }"
        >
        <v-tooltip 
            v-for="eve in event.events"
            :key="eve.content"
            :text="eve.content"
        >
        <template v-slot:activator="{ props }">
            <v-chip
                v-bind="props"
                :color="eve.color"
                variant="flat"
                :to="{path: '/diaries', query: {endDate: eve.date}}"
            >
                {{eve.content}}
            </v-chip>
        </template>
        </v-tooltip>
            
        </template>
        </v-calendar>
    </base-card>
</template>

<script>
    export default {
        data: () => ({
            value: [new Date()],
        }),
        mounted() {
            this.$store.dispatch('dashboard/fetchDiariesInformation', this.formatDate(this.value[0]));
        },
        computed: {
            getterEvents() {
                return this.$store.getters['dashboard/getDiariesInformation'];
            },
            formattedEvents() {
                return this.getterEvents.map(event => {
                    return {
                        title: 'diary',
                        start: new Date(`${event.date}T00:00:00`),
                        end: new Date(`${event.date}T23:59:59`),
                        color: 'red',
                        allDay: true,
                        date: event.date,
                        events: [
                            {
                                content: 'We go to the beach',
                                color: 'red',
                            },
                            {
                                content: 'We have dinner with friends',
                                color: 'blue',
                            },
                            {
                                content: 'We go to the gym',
                                color: 'green',
                            },
                            {
                                content: 'We go to the cinema',
                                color: 'yellow',
                            }
                        ]
                    }
                });
            },
            totalDiaries() {
                return this.getterEvents.length;
            },
            diariesInformationIsFetching() {
                return this.$store.getters['dashboard/getIsFetchingDiariesInformation'];
            }
        },
        methods: {
            formatDate(date) {
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            dateChange(date) {
                this.$store.dispatch('dashboard/fetchDiariesInformation', this.formatDate(date[0]));
            },
            showDiary(event) {
                // const date = event.start.toISOString().split('T')[0];
                // const diary = this.getterEvents.find(diary => diary.date === date);
                // if (diary) {
            }
        }
    }
</script>

<style scoped>
    .calendar-heading {
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 20px;
        text-align: center;
    }
    .diaries {
        color: #e73939;
    }
    :deep(.v-calendar-month__day) {
        min-height: 130px !important;
    }
    :deep(.v-calendar-month__day .v-badge) {
        display: none;
    }
    :deep(.v-calendar-month__day .v-chip) {
       width: 100%;
       display: flex;
       justify-content: center;
       align-items: center;
       /* background-color: #e73939; */
       opacity: 0.5;
       cursor: pointer;
       padding: 5px;
    }
    :deep(.v-calendar-month__day .v-chip:hover) {
       opacity: 1;
    }
    :deep(.v-calendar-month__day .v-chip__content) {
       color: #000;
       overflow: hidden;
    }
</style>