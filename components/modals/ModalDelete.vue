<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card>
        <v-card-text>
          Удалить?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onDelete" color="#5C6BC0">Да</v-btn>
          <v-btn @click="dialog = false" color="#E57373">Нет</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      modalDelete: "modalStore/getModalDelete",
      selectedPost: "postsStore/getSelectedPost",
      selectedComment: "commentsStore/getSelectedComment",
      chanel: "chanelsStore/getChanel",
      selectedMessage: "messagesStore/getSelectedMessage",
      chat: "chatsStore/getChat",
    }),
    isOpen() {
      return this.modalDelete.isOpen;
    },
    option() {
      return this.modalDelete.option;
    },
  },
  methods: {
    ...mapMutations({
      setSelectedPost: "postsStore/setSelectedPost",
      setSelectedComment: "commentsStore/setSelectedComment",
      setSelectedMessage: "messagesStore/setSelectedMessage",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
      deletePost: "postsStore/deletePost",
      deleteComment: "commentsStore/deleteComment",
      deleteChanel: "chanelsStore/deleteChanel",
      deleteMessage: "messagesStore/deleteMessage",
    }),
    onDelete() {
      if (this.option === 'post') {
        if (this.$route.path.split('/')[1] === 'chanels') {
          this.deletePost({ postId: this.selectedPost._id, owner: this.profile._id, ownerChanel: this.chanel._id });
        } else {
          this.deletePost({ postId: this.selectedPost._id, owner: this.profile._id });
        }
        this.setSelectedPost(null);
      } else if (this.option === 'comment') {
        this.deleteComment({ post: this.selectedPost._id, commentId: this.selectedComment._id });
        this.setSelectedComment(null);
      } else if (this.option === 'chanel') {
        this.deleteChanel({ chanelId: this.chanel._id });
      } else if (this.option === 'message') {
        this.deleteMessage({ chat: this.chat._id, messageId: this.selectedMessage._id });
      }
    }
  },
  watch: {
    isOpen() {
      this.dialog = this.isOpen;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalDelete', value: false });
        if (this.option === 'post') this.setSelectedPost(null);
        if (this.option === 'comment') this.setSelectedComment(null);
        if (this.option === 'message') this.setSelectedMessage(null);
      }
    }
  }
}
</script>
