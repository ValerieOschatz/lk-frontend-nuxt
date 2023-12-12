<template>
  <v-app>
    <div class="page">
      <v-card class="content">
        <slot />
      </v-card>
    </div>
  </v-app>
</template>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  background-image: url(/image2.jpg);
  display: flex;
}

.content {
  padding: 20px;
  margin: auto;
  width: 344px;
}
</style>
