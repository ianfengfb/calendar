export default {
    addDiary(state, diary) {
        state.diaries.push(diary);
    },
    fetchDiaries(state, diaries) {
        state.diaries.push(...diaries);
        if (diaries.length === 0) {
            state.noMoreDiaries = true;
        } else {
            state.noMoreDiaries = false;
        }
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
    },
    resetDiaries(state) {
        state.diaries = [];
    }
}