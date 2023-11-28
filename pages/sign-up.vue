<template>
  <!-- <div>
    <v-card-title class="title">Вход</v-card-title>
    <v-form>
      <v-text-field
        variant="underlined"
        label="Логин"
      ></v-text-field>
      <v-text-field
        variant="underlined"
        label="Пароль"
      ></v-text-field>
      <v-btn
        block
        color="rgb(220, 205, 235)"
      >
      Войти</v-btn>
    </v-form>
    <NuxtLink to="sign-up"></NuxtLink>
  </div> -->
</template>

<script setup lang="ts">
definePageMeta({
  name: "SignГзPage",
  layout: 'session-layout'
})
</script>

<style scoped>
.title {
  text-align: center;
}
</style>