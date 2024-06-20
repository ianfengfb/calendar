<template>
    <div class="container">
        <div class="column">Column 1</div>
        <div class="column">Column 2</div>
        <div class="column">Column 3</div>
        <div class="column">Column 4</div>
        <div class="column">Column 5</div>
        <div class="column">Column 6</div>
        <div class="column">Column 7</div>
    </div>
</template>

<style scoped>
    .container {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 0px;
        flex: 1 1 auto;
    }

    .column {
        background-color: #f1f1f1;
        padding: 20px;
        text-align: center;
        position: relative;
    }

    .column::after {
        content: "";
        position: absolute;
        right: 0; /* Align to the right edge */
        top: 10%; /* Start at 10% from the top to vertically center */
        width: 1px; /* Width of the border */
        height: 80%; /* Height of the border */
        background-color: #ccc; /* Color of the border */
    }
</style>