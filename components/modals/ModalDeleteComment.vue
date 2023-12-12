<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card>
        <v-card-text>
          Удалить комментарий?
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
      modalDeleteComment: "modalStore/getModalDeleteComment",
      selectedPost: "postsStore/getSelectedPost",
      selectedComment: "commentsStore/getSelectedComment",
    }),
    isOpen() {
      return this.modalDeleteComment.isOpen;
    },
  },
  methods: {
    ...mapMutations({
      setSelectedComment: "commentsStore/setSelectedComment",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
      deleteComment: "commentsStore/deleteComment",
    }),
    onDelete() {
      this.deleteComment({ post: this.selectedPost._id, commentId: this.selectedComment._id });
      this.setSelectedComment(null);
    }
  },
  watch: {
    isOpen() {
      this.dialog = this.isOpen;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalDeleteComment', value: false });
        this.setSelectedComment(null);
      }
    }
  }
}
</script>
