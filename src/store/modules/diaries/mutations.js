export default {
    addDiary(state, diary) {
        state.diaries.push(diary);
    },
    fetchDiaries(state, diaries) {
        state.diaries = diaries;
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