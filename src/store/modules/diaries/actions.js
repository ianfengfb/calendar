export default {
    async addDiary({ commit }, diary) {
        console.log(diary);
        const response = await fetch('http://127.0.0.1:8000/api/diary', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            withCredentials: true,
            body: diary,
        });

        // const responseData = await response.json();

        if (!response.ok) {
            //error
        }
        commit('addDiary', diary);
    },
    updateDiary({ commit }, diary) {
        commit('updateDiary', diary);
    },
    deleteDiary({ commit }, id) {
        commit('deleteDiary', id);
    }
}