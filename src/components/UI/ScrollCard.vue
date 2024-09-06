<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
    .card {
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        padding: 2rem;
        margin: 2rem auto;
        width: 90%;
        height: 100vh;
        overflow: scroll;
    }
    .w--60 {
        width: 50%;
    }
    @media screen and (max-width: 768px) {
        .card {
            width: 95%;
        }
        .w--80 {
            width: 95%;
            padding: 1rem;
        }
    }
</style>