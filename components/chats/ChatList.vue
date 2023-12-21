<template>
<div class="list-container">
  <p v-if="!list.length" class="empty">Чатов пока нет</p>
  <div v-else>
    <v-card-title>Список чатов:</v-card-title>
    <v-list
      item-props
      lines="three"
    >
      <div v-for="chat in list" :key="chat._id">
        <v-list-item
          :prepend-avatar="chat.photo ? `http://localhost:3001/${chat.photo}` : '/image2.jpg'"
          nav
          height="60"
        >
        <v-list-item-title class="link" @click="navigateTo(`/chats/${chat._id}`)">{{ chat.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ `Обновлен: ${convertDate(chat.updatedAt)}` }}</v-list-item-subtitle>
          <template v-slot:append>
            <ChatBtn :chat="chat" />
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</div>
</template>
  
  <script>
  import { mapGetters } from "vuex";
  import ChatBtn from '~/components/chats/ChatBtn.vue';
  import { convertDate } from "~/utils/convertDate";
  
  export default {
    components: {
      ChatBtn,
    },
    computed: {
      ...mapGetters({
        profile: "profileStore/getProfile",
        chatList: "chatsStore/getChatList",
      }),
      list() {
        return this.chatList;
      }
    }
  }
  </script>
  
  <style scoped>
  .link {
    cursor: pointer;
  }
  .empty {
    text-align: center;
  }
  </style>
  