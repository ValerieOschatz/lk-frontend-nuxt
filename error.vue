<template>
  <v-app>
    <div class="page">
      <v-card class="content">
        <v-card-title>Ошибка</v-card-title>
        <v-btn @click="onBack">Перейти в профиль</v-btn>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  methods: {
    onBack() {
      return navigateTo('/profile');
    }
  },
}
</script>

<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  background-color: rgb(234, 223, 255);
  display: flex;
}

.content {
  padding: 20px;
  margin: auto;
  width: 344px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
