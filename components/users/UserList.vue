<template>
<v-list
  item-props
  lines="three"
>
  <div v-for="user in userList" :key="user._id">
    <v-list-item
      :prepend-avatar="user.photo ? `http://localhost:3001/${user.photo}` : '/image2.jpg'"
      :title="user.name"
      :subtitle="`Подписчики: ${user.subscribers.length}`"
      nav
      height="60"
    >
      <template v-slot:append>
        <v-btn
          v-if="isSubscribed(user)"
          variant="text"
          icon="mdi-account-minus"
          color="#E57373"
        ></v-btn>
        <v-btn
        v-else
          variant="text"
          icon="mdi-account-plus"
          color="#E57373"
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
    }),
    isSubscribed(user) {
      return user.subscribers.includes(this.profile.id);
    }
  },
}
</script>
