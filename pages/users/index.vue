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
        <UserSearch :tab="tab" />
        <UserList :tab="tab" option="subscriptions" />
      </v-window-item>
      <v-window-item :value="2">
        <UserSearch :tab="tab" />
        <UserList :tab="tab" option="subscribers" />
      </v-window-item>
      <v-window-item :value="3">
        <UserSearch :tab="tab" />
        <UserList :tab="tab" option="search" />
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
import UserSearch from "~/components/users/UserSearch.vue";
import UserList from "~/components/users/UserList.vue"

export default {
  components: {
    Alert,
    UserSearch,
    UserList,
  },
  data: () => ({
    tab: null,
  }),
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      searchedName: "profileStore/getSearchedName",
      subscriberName: "profileStore/getSubscriberName",
      subscriptionName: "profileStore/getSubscriptionName",
    }),
  },
  methods: {
    ...mapActions({
      setUserList: "usersStore/setUserList",
      setSubscriberList: "usersStore/setSubscriberList",
      setSubscriptionList: "usersStore/setSubscriptionList",
    }),
  },
  watch: {
    tab() {
      if (this.profile._id) {
        if (this.tab === 1) {
          this.setSubscriptionList({ name: this.subscriptionName, subscriptions: this.profile._id });
        } else if (this.tab === 2) {
          this.setSubscriberList({ name: this.subscriberName, subscribers: this.profile._id });
        } else if (this.tab === 3) {
          this.setUserList({ name: this.searchedName });
        }
      }
    },
    profile() {
      if (this.tab === 1) {
        this.setSubscriptionList({ name: this.subscriptionName, subscriptions: this.profile._id });
      }
    }
  }
}
</script>
