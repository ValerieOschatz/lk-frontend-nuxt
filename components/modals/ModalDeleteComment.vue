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
          <v-btn @click="onDelete" color="#7B1FA2">Да</v-btn>
          <v-btn @click="dialog = false" color="#C2185B">Нет</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <Alert />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Alert from '~/components/Alert.vue';

export default {
  components: {
    Alert,
  },
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
    ...mapActions({
      setModal: "modalStore/setModal",
      deleteComment: "commentsStore/deleteComment",
    }),
    onDelete() {
      this.deleteComment({ post: this.selectedPost._id, commentId: this.selectedComment._id });
    }
  },
  watch: {
    isOpen() {
      this.dialog = this.isOpen;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalDeleteComment', value: false });
      }
    }
  }
}
</script>
