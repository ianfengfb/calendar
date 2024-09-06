<template>
    <div class="calendar-heading" v-if="diariesInformationIsFetching">
        Loading...
    </div>
    <div class="calendar-heading" v-else>
        Monthly <span class="diaries">Diaries</span>: {{totalDiaries}}
    </div>
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
        <v-chip
            :to="{path: '/diaries', query: {endDate: event.date}}"
        ></v-chip>
    </template>
    </v-calendar>
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
            return date.toISOString().split('T')[0];
        },
        dateChange(date) {
            this.$store.dispatch('dashboard/fetchDiariesInformation', this.formatDate(date[0]));
        },
        showDiary(event) {
            // const date = event.start.toISOString().split('T')[0];
            // const diary = this.getterEvents.find(diary => diary.date === date);
            // if (diary) {
            //     this.$router.push({ name: 'diary', params: { id: diary.id } });
            // }
        }
    },
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
        min-height: 60px !important;
    }
    :deep(.v-calendar-month__day .v-badge) {
        display: none;
    }
    :deep(.v-calendar-month__day .v-chip) {
       width: 100%;
       display: flex;
       justify-content: center;
       align-items: center;
       background-color: #e73939;
       opacity: 0.5;
       cursor: pointer;
    }
    :deep(.v-calendar-month__day .v-chip:hover) {
       opacity: 1;
    }
    :deep(.v-calendar-month__day .v-chip__content) {
       opacity: 0;
    }
</style>