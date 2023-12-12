<template>
  <div>
    <v-tabs
      v-model="tab"
      color="#E57373"
      align-tabs="center"
    >
      <v-tab :value="1">Подписки</v-tab>
      <v-tab :value="2">Подписчики</v-tab>
      <v-tab :value="3">Поиск людей</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        One
      </v-window-item>

      <v-window-item :value="2">
        Two
      </v-window-item>

      <v-window-item :value="3">
        <UserSearch />
      </v-window-item>
    </v-window>
    <Alert />
  </div>
</template>

<script setup>
definePageMeta({
  name: "UserListPage",
})
</script>

<script>
import { mapGetters, mapActions } from "vuex";
import Alert from '../components/Alert.vue';
import UserSearch from "../../components/users/tabs/UserSearch.vue";

export default {
  components: {
    Alert,
    UserSearch,
  },
  data: () => ({
    tab: null,
  }),
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
