<template>
  <div class="h-100">
    <div class="chat-container">
      <ChatInfo />
      <ChatMessageForm />
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
import ChatMessageForm from '~/components/chats/ChatMessageForm.vue';

export default {
  components: {
    Alert,
    ChatInfo,
    ChatMessageForm,
  },
  methods: {
    ...mapActions({
      setChat: "chatsStore/setChat",
    }),
  },
  mounted() {
    this.setChat({ chatId: this.$route.params.id });
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
