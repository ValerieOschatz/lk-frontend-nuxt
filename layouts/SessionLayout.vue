<template>
  <v-app>
    <div class="page">
      <v-card class="content">
        <slot />
      </v-card>
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
  background-image: url(~/assets/images/ricardo-loaiza-p0TX8uYHC5k-unsplash.jpg);
  display: flex;
}

.content {
  padding: 20px;
  margin: auto;
  min-width: 344px;
}
</style>
