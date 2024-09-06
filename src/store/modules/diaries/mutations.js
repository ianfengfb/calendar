export default {
    addDiary(state, diary) {
        state.diaries.push(diary);
    },
    fetchDiaries(state, data) {
        if (data.dateChange) {
            state.diaries = data.diaries;
        } else {
            state.diaries.push(...data.diaries);
        }
        if (data.diaries.length === 0) {
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
    },
    searchDiariesStart(state) {
        state.isFetchingDiarySearch = true;
    },
    searchDiariesEnd(state, searchResults) {
        state.isFetchingDiarySearch = false;
        state.diariesSearch = searchResults;
    },
    resetDiariesSearch(state) {
        state.diariesSearch = [];
    }
}