<template>
  <v-list>
    <v-list-item
      :prepend-avatar="chat.photo ? `http://localhost:3001/${chat.photo}` : '/image2.jpg'"
      :title="chat.name"
      nav
      height="60"
    >
      <template v-slot:append v-if="chat.id">
        <v-btn
          variant="text"
          icon="mdi-dots-vertical"
          color="#E57373"
        ></v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      user: "usersStore/getUser",
    }),
    chat() {
      if (this.$route.path === '/chats/new') {
        const user = JSON.parse(localStorage.getItem('user'));
        return {
          name: user.name,
          photo: user.photo
        }
      }
    }
  }
}
</script>
