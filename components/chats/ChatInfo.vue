<template>
  <v-list v-if="chat" class="py-0">
    <v-list-item
      class="py-0"
      :prepend-avatar="chat.photo ? `http://158.160.142.248/api/${chat.photo}` : '/image2.jpg'"
      :title="chat.name"
      nav
      height="60"
    >
      <template v-slot:append v-if="chat._id">
        <ChatBtn :chat="currentChat" />
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import ChatBtn from '~/components/chats/ChatBtn.vue';

export default {
  components: {
    ChatBtn,
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      currentChat: "chatsStore/getChat",
    }),
    chat() {
      if (this.$route.path === '/chats/new') {
        const user = JSON.parse(localStorage.getItem('user'));
        return {
          name: user.name,
          photo: user.photo
        }
      } else {
        if (this.currentChat._id) {
          const chat = this.currentChat;
          if (!chat.groupDetails.isGroup) {
            const person = chat.participants.find(item => item._id !== this.profile._id);
            chat.name = person.name;
            chat.photo = person.photo;
          }
          return chat;
        }
      }
    }
  }
}
</script>
