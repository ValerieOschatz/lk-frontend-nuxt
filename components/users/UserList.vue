<template>
<v-list
  item-props
  lines="three"
>
  <div v-for="user in list" :key="user._id">
    <v-list-item
      :prepend-avatar="user.photo ? `http://158.160.142.248/api/${user.photo}` : '/image2.jpg'"
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
          @click="writeMessage(user)"
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
  props: {
    tab: {
      type: Number,
      default: 0,
    },
    option: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      userList: "usersStore/getUserList",
      subscriberList: "usersStore/getSubscriberList",
      subscriptionList: "usersStore/getSubscriptionList",
    }),
    list() {
      if (this.tab === 1) {
        return this.subscriptionList;
      } else if (this.tab === 2) {
        return this.subscriberList;
      } else if (this.tab === 3) {
        return this.userList;
      }
    }
  },
  methods: {
    ...mapActions({
      subscribe: "profileStore/subscribe",
      unsubscribe: "profileStore/unsubscribe",
      checkChat: "chatsStore/checkChat",
    }),
    isSubscribed(user) {
      return user.subscribers.includes(this.profile._id);
    },
    onSubscribe(userId) {
      this.subscribe({ userId, profileId: this.profile._id, option: this.option });
    },
    onUnsubscribe(userId) {
      this.unsubscribe({ userId, profileId: this.profile._id, option: this.option });
    },
    writeMessage(user) {
      this.checkChat(user);
    }
  },
}
</script>

<style scoped>
.link {
  cursor: pointer;
}
</style>
