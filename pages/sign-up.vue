<template>
  <div>
    <v-card-title class="title">Регистрация</v-card-title>
    <v-form
      ref="form"
      @submit.prevent="submitForm"
    >
      <v-text-field
        variant="underlined"
        label="Имя"
        v-model="name"
        :rules="nameRules"
        required
      ></v-text-field>
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
        type="password"
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
      Зарегистрироваться</v-btn>
    </v-form>
    <NuxtLink to="sign-in" class="link">Войти</NuxtLink>
    <Alert />
  </div>
</template>

<script setup>
definePageMeta({
  name: "SignUpPage",
  layout: 'session-layout'
})
</script>

<script>
import { mapActions } from "vuex";
import Alert from '../components/Alert.vue'

export default {
  components: {
    Alert,
  },
  data: () => ({
    name: '',
    login: '',
    password: '',
    nameRules: [
      v => !!v || 'Обязательное поле',
      v => (v && v.length <= 20) || 'Допустимо не более 20 символов',
      v => (v && v.length >= 2) || 'Допустимо не менее 2 символов',
    ],
    loginRules: [
      v => !!v || 'Обязательное поле',
      v => /^([\w]+)$/.test(v) || "Латинские буквы, цифры, нижние подчеркивания",
      v => (v && v.length <= 20) || 'Допустимо не более 20 символов',
      v => (v && v.length >= 2) || 'Допустимо не менее 2 символов',
    ],
    passwordRules: [
      v => !!v || 'Обязательное поле',
    ],
  }),
  methods: {
    ...mapActions({
      register: "authStore/register",
    }),
    async validate () {
      return await this.$refs.form.validate();
    },
    async submitForm() {
      const validity = await this.validate();
      const valid = validity.valid;

      if (valid) {
        this.register({
          name: this.name,
          login: this.login,
          password: this.password
        });
      }
    },
  },
}
</script>

<style scoped>
@import url(../assets/styles/auth-form.css);
</style>
