<template>
<v-form
  class="mx-auto"
  ref="form"
>
  <v-card-text>
    <v-text-field
      :loading="loading"
      density="compact"
      variant="solo"
      label="Введите имя"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      v-model="text"
      @click:append-inner="onClick"
    ></v-text-field>
  </v-card-text>
</v-form>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    loaded: false,
    loading: false,
    text: '',
    textRules: [
      v => !!v || 'Обязательное поле',
      v => (v.length <= 150) || 'Допустимо не более 150 символов',
    ],
  }),
  methods: {
    onClick () {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
  },
}
</script>
