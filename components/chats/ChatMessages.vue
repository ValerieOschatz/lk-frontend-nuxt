<template>
  <div class="message-list">
    <v-sheet
      v-if="$route.path !== '/chats/new'"
      v-for="message in messageList"
      :key="message._id"
      rounded="lg"
      :color="`${message.sender._id === profile._id ? '#FFCCBC' : '#fff'}`"
      :class="`message-list__message ${message.sender._id === profile._id && 'message-list__message_own'}`"
    >
      <v-card-text class="py-2">
        {{ message.text }}
      </v-card-text>
      <ChatMessageMenu v-if="message.sender._id === profile._id" :message="message" />
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChatMessageMenu from '~/components/chats/ChatMessageMenu.vue';

export default {
  components: {
    ChatMessageMenu,
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      messageList: "messagesStore/getMessageList",
    }),
  }
}
</script>

<style scoped>
@import url(../../assets/styles/message-list.css);
</style>
