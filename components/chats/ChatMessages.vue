<template>
  <div class="message-list" ref="messageList">
    <v-sheet
      v-for="message in messageList"
      :key="message._id"
      rounded="lg"
      :color="`${message.sender._id === profile.id ? '#F3E5F5' : '#ECEFF1'}`"
      :class="`message-list__message ${message.sender._id === profile.id && 'message-list__message_own'}`"
    >
    <v-card-text class="py-2">
      {{ message.text }}
    </v-card-text>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
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
    this.scrollDown()
  }
}
</script>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  overflow-y: scroll;
  max-height: calc(100vh - 340px);
}
.message-list__message {
  width: fit-content;
  max-width: 80%;
}

.message-list__message_own {
  margin-left: auto;
}
</style>
