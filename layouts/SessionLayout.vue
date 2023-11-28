<template>
  <v-app>
    <div class="page">
      <slot />
    </div>
  </v-app>
</template>

<script>
export default {
  name: "SessionLayout",
};
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  background-color: rgb(201, 174, 226);
}
</style>
