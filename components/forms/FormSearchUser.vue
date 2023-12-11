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
      v-model="name"
      @input="onSearch()"
      @click:append-inner="onClick"
    ></v-text-field>
  </v-card-text>
</v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    loaded: false,
    loading: false,
    name: '',
    // nameRules: [
    //   v => !!v || 'Обязательное поле',
    //   v => (v.length <= 150) || 'Допустимо не более 150 символов',
    // ],
  }),
  computed: {
    ...mapGetters({
      userList: "usersStore/getUserList",
    }),
  },
  methods: {
    ...mapActions({
      setUserList: "usersStore/setUserList",
    }),
    onClick () {
      this.loading = true

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    },
    onSearch(value) {
      this.setUserList({ name: this.name });
    }
  },
}
</script>
