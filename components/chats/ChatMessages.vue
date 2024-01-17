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
.message-list {
  display: flex;
  flex-direction: column-reverse;
  padding: 20px;
  gap: 10px;
  overflow-y: scroll;
  height: calc(100vh - 343px);
  background-color: #f7f7f7;
}
.message-list__message {
  width: fit-content;
  max-width: 80%;
}
.message-list__message_own {
  margin-left: auto;
}

@media screen and (max-width: 990px) {
  .message-list {
    height: calc(100vh - 303px);
  }
}
@media screen and (max-width: 600px) {
  .message-list {
    height: calc(100vh - 343px);
  }
}
</style>
