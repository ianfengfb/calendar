<template>
    <v-alert v-if="!!showAlert"
        :title="alert.title"
        :type="alert.type"
        class="alert"
        variant="tonal"
        :text="alert.text"
    ></v-alert>
</template>

<script>
    export default {
        computed: {
            alert() {
                return this.$store.getters['global/getAlert'];
            },
            showAlert() {
                return this.$store.getters['global/showAlert'];
            },
        },
    }
</script>

<style>
    .alert {
        width: 30%;
        position: fixed !important;
        top: 5%;
        right: 5%;
        z-index: 1000;
        width: 30%;
    }
</style>