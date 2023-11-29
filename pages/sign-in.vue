<template>
  <div>
    <v-card-title class="title">Вход</v-card-title>
    <v-form
      ref="form"
      @submit.prevent="submitForm"
    >
      <v-text-field
        variant="underlined"
        label="Логин"
        v-model="login"
        :rules="loginRules"
        required
      ></v-text-field>
      <v-text-field
        variant="underlined"
        label="Пароль"
        v-model="password"
        :rules="passwordRules"
        required
      ></v-text-field>
      <v-btn
        block
        color="rgb(220, 205, 235)"
        class="my-3"
        type="submit"
      >
      Войти</v-btn>
    </v-form>
    <NuxtLink to="sign-up" class="link">Зарегистрироваться</NuxtLink>
  </div>
</template>

<script setup>
definePageMeta({
  name: "SignInPage",
  layout: 'session-layout'
})
</script>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    login: '',
    password: '',
    loginRules: [
      v => !!v || 'Обязательное поле',
      v => /^([\w]+)$/.test(v) || "Допустимы латинские буквы, цифры, нижние подчеркивания",
      v => (v && v.length <= 20) || 'Допустимо не более 20 символов',
      v => (v && v.length >= 2) || 'Допустимо не менее 2 символов',
    ],
    passwordRules: [
      v => !!v || 'Обязательное поле',
    ],
  }),
  methods: {
    ...mapActions({
      loginUser: "authStore/login",
    }),
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;

      if (valid) {
        this.loginUser({ login: this.login, password: this.password});
      }
    }
  },
}
</script>

<style scoped>
.title {
  text-align: center;
}

.link {
  text-decoration: none;
  color: rgb(102, 92, 110);
  font-size: 12px;
  text-align: center;
  display: block;
  margin: 5px;
}

</style>