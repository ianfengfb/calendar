<template>
    <base-card class="calendar-page">
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
        <v-calendar
            ref="calendar"
            v-model="calendarValue"
            :events="formattedEvents"
            view-mode="month"
            @update:modelValue="dateChange"
        >
        <template
            v-slot:event="{ event }"
        >
            <v-menu
                v-for="eve in event.events"
                :key="eve.id"
                :text="eve.content"
            >
                <template v-slot:activator="{ props: menu }">
                    <v-tooltip location="top">
                    <template v-slot:activator="{ props: tooltip }">
                        <v-chip 
                            v-bind="mergeProps(menu, tooltip)"
                            :color="eve.color"
                            variant="flat"
                        >
                        {{eve.content}}</v-chip
                        >
                    </template>
                    <span>{{ eve.content }}</span>
                    </v-tooltip>
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-title 
                            class="cursor-pointer"
                            @click="openUpdateEventForm(eve)"
                        >Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title 
                            class="cursor-pointer"
                            @click="openDeleteEventDialog(eve)"
                        >Delete</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>     
        </template>
        </v-calendar>
    </base-card>
    <v-dialog
      v-model="newEventDialog"
      width="auto"
      persistent
    >
      <v-card
        width="400"
        :title="newEventDate ? `${newEventDate.getDate()}/${newEventDate.getMonth() + 1}/${newEventDate.getFullYear()}` : ''"
      >
        <v-card-text>
          <v-text-field
            label="Description"
            v-model="newEventDescription"
          ></v-text-field>
          <v-select
            label="Type"
            v-model="newEventType"
            :items="formattedEventTypes"
          ></v-select>
        </v-card-text>
        <template v-slot:actions>
            <div v-if="isSaving">
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </div>
            <div v-else>
                <v-icon @click="createNewEvent">
                    mdi-check
                </v-icon>
                <v-icon class="ml-2" @click="closeNewEventDialog">
                    mdi-close
                </v-icon>
            </div>
        </template>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="updateEventDialog"
      width="auto"
      persistent
    >
      <v-card
        width="400"
        :title="updateEventDate ? `${updateEventDate.getDate()}/${updateEventDate.getMonth() + 1}/${updateEventDate.getFullYear()}` : ''"
      >
        <v-card-text>
          <v-text-field
            label="Description"
            v-model="updateEventDescription"
          ></v-text-field>
          <v-select
            label="Type"
            v-model="updateEventType"
            :items="formattedEventTypes"
          ></v-select>
        </v-card-text>
        <template v-slot:actions>
            <div v-if="isSaving">
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </div>
            <div v-else>
                <v-icon @click="updateEvent">
                    mdi-check
                </v-icon>
                <v-icon class="ml-2" @click="closeUpdateEventDialog">
                    mdi-close
                </v-icon>
            </div>
        </template>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="deleteEventDialog"
      width="auto"
      persistent
    >
      <v-card
        width="400"
        :title="'Remove event on ' + (deleteEventDate ? `${deleteEventDate.getDate()}/${deleteEventDate.getMonth() + 1}/${deleteEventDate.getFullYear()}` : '')"
      >
        <v-card-text>
          <v-text-field
            label="Description"
            v-model="deleteEventDescription"
            disabled
          ></v-text-field>
          <v-select
            label="Type"
            v-model="deleteEventType"
            :items="formattedEventTypes"
            disabled
          ></v-select>
        </v-card-text>
        <template v-slot:actions>
            <div v-if="isSaving">
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </div>
            <div v-else>
                <v-icon @click="deleteEvent">
                    mdi-check
                </v-icon>
                <v-icon class="ml-2" @click="closeDeleteEventDialog">
                    mdi-close
                </v-icon>
            </div>
        </template>
      </v-card>
    </v-dialog>
</template>

<script>
    import { mergeProps } from 'vue';
    export default {
        data: () => ({
            user: true,
            calendarValue: [new Date()],
            newEventDialog: false,
            newEventDate: null,
            newEventDescription: null,
            newEventType: null,
            isSaving: false,
            updateEventDialog: false,
            updateEventDate: null,
            updateEventDescription: null,
            updateEventType: null,
            updateEventId: null,
            deleteEventDialog: false,
            deleteEventDate: null,
            deleteEventDescription: null,
            deleteEventType: null,
            deleteEventId: null,
        }),
        mounted() {
            let data = new FormData();
            data.append('start', this.getStartOfTheMonth());
            data.append('end', this.getEndOfTheMonth());
            data.append('user_id', this.user ? 2 : 1);
            this.$store.dispatch('calendar/fetchEvents', data);
            this.$store.dispatch('calendar/fetchEventTypes');
            this.attachClickListeners();
        },
        beforeUnmount() {
            this.detachClickListeners();
        },
        computed: {
            getterEventTypes() {
                return this.$store.getters['calendar/getEventTypes'];
            },
            formattedEventTypes() {
                return this.getterEventTypes.map(type => {
                    return {
                        title: type.name,
                        value: type.id,
                    }
                });
            },
            getterEvents() {
                return this.$store.getters['calendar/getEvents'];
            },
            formattedEvents() {
                console.log('events====>', this.getterEvents);
                return Object.keys(this.getterEvents).map(date => {
                    return {
                        title: 'diary',
                        start: new Date(`${date}T00:00:00`),
                        end: new Date(`${date}T23:59:59`),
                        color: 'red',
                        allDay: true,
                        date: date,
                        events: this.getterEvents[date].map(event => {
                            return {
                                content: event.content,
                                color: event.type.color,
                                id: event.id,
                                type_id: event.event_type_id,
                                date: event.date,
                            }
                        }),
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
            getStartOfTheMonth() {
                const date = new Date(this.calendarValue[0].getFullYear(), this.calendarValue[0].getMonth(), 1);
                return this.formatDate(date);
            },
            getEndOfTheMonth() {
                const date = new Date(this.calendarValue[0].getFullYear(), this.calendarValue[0].getMonth() + 1, 0);
                return this.formatDate(date);
            },
            openNewEventFormOnDay(day) {
                //create new Date object which on the month and year of this.calendarValue[0] and the day of the clicked day
                const date = new Date(this.calendarValue[0].getFullYear(), this.calendarValue[0].getMonth(), day);
                this.newEventDate = date;
                this.newEventDialog = true;
            },
            attachClickListeners() {
                document.querySelectorAll('.v-calendar-weekly__day-label').forEach((element) => {
                    element.addEventListener('click', this.handleClick);
                });
            },
            handleClick(event) {
                const span = event.currentTarget.querySelector('.v-btn__content');
                if (span) {
                    const day = span.textContent.trim();
                    console.log('day====>', day);
                    this.openNewEventFormOnDay(day);
                }
            },
            detachClickListeners() {
                if (this.elements) {
                    this.elements.forEach((element) => {
                    element.removeEventListener('click', this.handleClick);
                    });
                }
            },
            dateChange(date) {
                let data = new FormData();
                data.append('start', this.getStartOfTheMonth());
                data.append('end', this.getEndOfTheMonth());
                data.append('user_id', this.user ? 2 : 1);
                this.$store.dispatch('calendar/fetchEvents', data);
                this.detachClickListeners();
                this.$nextTick(() => {
                    this.attachClickListeners();
                });
            },
            async createNewEvent() {
                const data = new FormData();
                data.append('date', this.formatDate(this.newEventDate));
                data.append('content', this.newEventDescription);
                data.append('type', this.newEventType);
                data.append('user_id', this.user ? 2 : 1);
                this.isSaving = true;
                await this.$store.dispatch('calendar/addEvent', data);
                this.closeNewEventDialog();
                this.isSaving = false;
            },
            closeNewEventDialog() {
                this.newEventDialog = false;
                this.newEventDate = null;
                this.newEventDescription = null;
                this.newEventType = null;
            },
            openUpdateEventForm(event) {
                this.updateEventDate = new Date(event.date);
                this.updateEventDialog = true;
                this.updateEventDescription = event.content;
                this.updateEventType = event.type_id;
                this.updateEventId = event.id;
            },
            closeUpdateEventDialog() {
                this.updateEventDialog = false;
                this.updateEventDate = null;
                this.updateEventDescription = null;
                this.updateEventType = null;
                this.updateEventId = null;
            },
            async updateEvent() {
                const data = new FormData();
                data.append('id', this.updateEventId);
                data.append('content', this.updateEventDescription);
                data.append('type', this.updateEventType);
                data.append('user_id', this.user ? 2 : 1);
                this.isSaving = true;
                await this.$store.dispatch('calendar/updateEvent', data);
                this.closeUpdateEventDialog();
                this.isSaving = false;
            },
            openDeleteEventDialog(event) {
                this.deleteEventDate = new Date(event.date);
                this.deleteEventDialog = true;
                this.deleteEventDescription = event.content;
                this.deleteEventType = event.type_id;
                this.deleteEventId = event.id;
            },
            closeDeleteEventDialog() {
                this.deleteEventDialog = false;
                this.deleteEventDate = null;
                this.deleteEventDescription = null;
                this.deleteEventType = null;
                this.deleteEventId = null;
            },
            async deleteEvent() {
                const data = new FormData();
                data.append('id', this.deleteEventId);
                this.isSaving = true;
                await this.$store.dispatch('calendar/deleteEvent', data);
                this.closeDeleteEventDialog();
                this.isSaving = false;
            },
            userChange() {
                let data = new FormData();
                data.append('start', this.getStartOfTheMonth());
                data.append('end', this.getEndOfTheMonth());
                data.append('user_id', this.user ? 2 : 1);
                this.$store.dispatch('calendar/fetchEvents', data);
            },
            mergeProps,
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
    .calendar-page {
        position: relative;
    }
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