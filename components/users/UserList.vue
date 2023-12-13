<template>
<v-list
  item-props
  lines="three"
>
  <div v-for="user in userList" :key="user._id">
    <v-list-item
      :prepend-avatar="user.photo ? `http://localhost:3001/${user.photo}` : '/image2.jpg'"
      nav
      height="60"
    >
    <v-list-item-title class="link" @click="navigateTo(`/users/${user._id}`)">{{ user.name }}</v-list-item-title>
    <v-list-item-subtitle>{{ `Подписчики: ${user.subscribers.length}` }}</v-list-item-subtitle>
      <template v-slot:append>
        <v-btn
          v-if="isSubscribed(user)"
          variant="text"
          icon="mdi-account-minus"
          color="#E57373"
          @click="onUnsubscribe(user._id)"
        ></v-btn>
        <v-btn
          v-else
          variant="text"
          icon="mdi-account-plus"
          color="#E57373"
          @click="onSubscribe(user._id)"
        ></v-btn>
        <v-btn
          variant="text"
          icon="mdi-email-outline"
          color="#E57373"
        ></v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</v-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      userList: "usersStore/getUserList",
    }),
  },
  methods: {
    ...mapActions({
      setUserList: "usersStore/setUserList",
      subscribe: "profileStore/subscribe",
      unsubscribe: "profileStore/unsubscribe",
    }),
    isSubscribed(user) {
      return user.subscribers.includes(this.profile.id);
    },
    onSubscribe(userId) {
      this.subscribe({ userId, option: 'search' });
    },
    onUnsubscribe(userId) {
      this.unsubscribe({ userId, option: 'search' });
    }
  },
}
</script>

<style scoped>
.link {
  cursor: pointer;
}
</style>