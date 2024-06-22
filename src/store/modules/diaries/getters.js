export default {
    getDiaries(state) {
        return state.diaries;
    },
    getDiaryById: (state) => (id) => {
        return state.diaries.find(diary => diary.id === id);
    }
}