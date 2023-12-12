<template>
<v-form
  class="mx-auto"
  ref="form"
>
  <v-card-text>
    <v-text-field
      density="compact"
      variant="solo"
      label="Введите имя"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      v-model="name"
      @input="onSearch()"
    ></v-text-field>
  </v-card-text>
</v-form>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    name: '',
  }),
  methods: {
    ...mapMutations({
      setSearchedName: "profileStore/setSearchedName",
    }),
    ...mapActions({
      setUserList: "usersStore/setUserList",
    }),
    onSearch() {
      this.setSearchedName(this.name);
      this.setUserList({ name: this.name });
    }
  },
}
</script>
