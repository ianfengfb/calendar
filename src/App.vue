<template>
  <div class="page-container">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import TheHeader from "@/components/TheHeader.vue";

  export default {
    components: {
      TheHeader,
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
  }
</style>
