<template>
  <div>
    <ChatList />
    <ModalDelete />
    <Alert />
  </div>
</template>

<script setup>
definePageMeta({
  name: "ChatlListPage",
})
</script>

<script>
import { mapGetters, mapActions } from "vuex";
import Alert from '../components/Alert.vue';
import ChatList from '../components/chats/ChatList.vue';
import ModalDelete from "~/components/modals/ModalDelete.vue";

export default {
  components: {
    Alert,
    ChatList,
    ModalDelete,
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
    }),
  },
  methods: {
    ...mapActions({
      setChatList: "chatsStore/setChatList",
    }),
  },
  mounted() {
    this.setChatList();
  }
}
</script>
