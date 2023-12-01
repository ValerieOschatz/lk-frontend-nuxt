<template>
  <v-app>
    <div class="page">
      <slot />
    </div>
  </v-app>
</template>

<style scoped>
.page {
  width: 100vw;
  min-height: 100vh;
  background-color: rgb(234, 223, 255);
  display: flex;
}
</style>
