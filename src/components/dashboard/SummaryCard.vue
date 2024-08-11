<template>
    <div class="summary-card">
        <v-icon class="summary-card-icon">
            {{ icon }}
        </v-icon>
        <div class="summary-card-text-container">
            <div class="summary-card-title">
                {{ title }}
            </div>
            <div class="summary-card-text">
                {{ number }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['icon','number', 'title'],
        data() {
            return {
            }
        }
    }
</script>

<style scoped>
    .summary-card {
        display: flex;
        align-items: center;
        padding: 20px;
        margin: 0 16px;
        border-radius: 10px;
        background-color: #f5f5f5;
        margin-bottom: 10px;
        cursor: default;
    }
    .summary-card-icon {
        font-size: 60px;
        color: #3f51b5;
    }
    .summary-card-text-container {
        margin-left: 10px;
    }
    .summary-card-title {
        font-size: 16px;
        font-weight: 500;
    }
    .summary-card-text {
        font-size: 36px;
        font-weight: 700;
        text-align: center;
    }
</style>