export default {
    addEventType(state, eventType) {
        state.eventTypes.push(eventType)
    },
    fetchEventTypes(state, eventTypes) {
        state.eventTypes = eventTypes
    },
    updateEventType(state, eventType) {
        const index = state.eventTypes.findIndex(type => type.id === eventType.id)
        state.eventTypes[index] = eventType
    },
    addEvent(state, event) {
        if (state.events[event.date]) {
            state.events[event.date].push(event)
        } else {
            state.events[event.date] = [event]
        }
    },
    fetchEvents(state, events) {
        state.events = events
    },
    updateEvent(state, event) {
        const index = state.events[event.date].findIndex(e => e.id === event.id)
        state.events[event.date][index] = event
    },
    deleteEvent(state, event) {
        const index = state.events[event.date].findIndex(e => e.id === event.id)
        state.events[event.date].splice(index, 1)
    }
}