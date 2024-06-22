<template>
    <form>
        <div class="form-control">
            <label for="date">Date</label>
            <input type="date" id="date"/>
            <!-- <p v-if="!firstName.isValid">Firstname must not be empty.</p> -->
        </div>
        <div class="form-control">
            <label for="note">Note</label>
            <textarea id="note" rows="5"></textarea>
            <!-- <p v-if="!firstName.isValid">Firstname must not be empty.</p> -->
        </div>
        <v-file-input
    accept="image/*"
    label="File input"
  ></v-file-input>
        <div class="">
            <v-rating
            v-model="rating"
            hover
            ></v-rating>
        </div>
        <v-icon
      color="green-darken-2"
      icon="mdi-domain"
      size="large"
    ></v-icon>
    </form>
</template>

<script>
    export default {
        data() {
            return {
                rating: 0
            }
        }
    }
</script>

<style scoped>
    .form-control {
    margin: 0.5rem 0 1rem 0;
    }

    label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
    }

    input[type='checkbox'] + label {
    font-weight: normal;
    display: inline;
    margin: 0 0 0 0.5rem;
    }

    input,
    textarea {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    font: inherit;
    }

    input:focus,
    textarea:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #3d008d;
    }

    input[type='checkbox'] {
    display: inline;
    width: auto;
    border: none;
    }

    input[type='checkbox']:focus {
    outline: #3d008d solid 1px;
    }

    h3 {
    margin: 0.5rem 0;
    font-size: 1rem;
    }

    .invalid label {
    color: red;
    }

    .invalid input,
    .invalid textarea {
    border: 1px solid red;
    }
</style>