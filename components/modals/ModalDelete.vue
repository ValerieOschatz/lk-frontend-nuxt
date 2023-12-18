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
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
      deletePost: "postsStore/deletePost",
      deleteComment: "commentsStore/deleteComment",
      deleteChanel: "chanelsStore/deleteChanel",
    }),
    onDelete() {
      if (this.option === 'post') {
        if (this.$route.path.split('/')[1] === 'chanels') {
          this.deletePost({ postId: this.selectedPost._id, owner: this.profile.id, ownerChanel: this.chanel.id });
        } else {
          this.deletePost({ postId: this.selectedPost._id, owner: this.profile.id });
        }
        this.setSelectedPost(null);
      } else if (this.option === 'comment') {
        this.deleteComment({ post: this.selectedPost._id, commentId: this.selectedComment._id });
        this.setSelectedComment(null);
      } else {
        this.deleteChanel({ chanelId: this.chanel.id });
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
      }
    }
  }
}
</script>
