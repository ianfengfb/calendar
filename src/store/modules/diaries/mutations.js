export default {
    addDiary(state, diary) {
        state.diaries.push(diary);
    },
    updateDiary(state, diary) {
        const index = state.diaries.findIndex(item => item.id === diary.id);
        if (index !== -1) {
            state.diaries.splice(index, 1, diary);
        }
    },
    deleteDiary(state, id) {
        const index = state.diaries.findIndex(item => item.id === id);
        if (index !== -1) {
            state.diaries.splice(index, 1);
        }
    }
}