<template>
  <div class="message-list" ref="messageList">
    <v-sheet
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
  },
  methods: {
    scrollDown() {
      const messageList = this.$refs.messageList;
      setTimeout(() => {
        messageList.scrollTop = messageList.scrollHeight;
      })
    }
  },
  watch: {
    messageList() {
      this.scrollDown();
    }
  },
  mounted() {
    this.scrollDown();
  }
}
</script>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  gap: 10px;
  overflow-y: scroll;
  height: calc(100vh - 340px);
  background-color: #f7f7f7;
}
.message-list__message {
  width: fit-content;
  max-width: 80%;
}

.message-list__message_own {
  margin-left: auto;
}
</style>
