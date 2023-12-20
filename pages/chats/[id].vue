<template>
  <div class="h-100">
    <div class="chat-container">
      <ChatInfo />
      <div>
        <ChatMessages />
        <ChatMessageForm />
      </div>
    </div>
    <Alert />
  </div>
</template>

<script setup>
definePageMeta({
  name: "ChatCardPage",
})
</script>

<script>
import { mapGetters, mapActions } from "vuex";
import Alert from '~/components/Alert.vue';
import ChatInfo from '~/components/chats/ChatInfo.vue';
import ChatMessages from '~/components/chats/ChatMessages.vue';
import ChatMessageForm from '~/components/chats/ChatMessageForm.vue';

export default {
  components: {
    Alert,
    ChatInfo,
    ChatMessages,
    ChatMessageForm,
  },
  methods: {
    ...mapActions({
      setChat: "chatsStore/setChat",
      setMessageList: "messagesStore/setMessageList",
    }),
  },
  mounted() {
    const id = this.$route.params.id;
    this.setChat({ chatId: id });
    this.setMessageList({ chat: id });
  }
}
</script>

<style scoped>
.chat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
