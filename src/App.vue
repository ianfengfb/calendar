<template>
  <base-alert></base-alert>
  <div class="page-container">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import TheHeader from "@/components/TheHeader.vue";
  import BaseAlert from "@/components/UI/BaseAlert.vue";

  export default {
    components: {
      TheHeader,
      BaseAlert
    },
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }

  html {
    font-family: "Roboto", sans-serif;
  }

  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  .page-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }
</style>
