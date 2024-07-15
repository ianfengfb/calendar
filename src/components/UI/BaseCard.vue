<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<style scoped>
    .card {
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        padding: 1rem;
        margin: 2rem auto;
        width: 50%;
    }
    .w--80 {
        width: 80%;
        padding: 3rem;
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