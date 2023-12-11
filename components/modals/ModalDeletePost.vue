<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card>
        <v-card-text>
          Удалить запись?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onDelete" color="#7B1FA2">Да</v-btn>
          <v-btn @click="dialog = false" color="#C2185B">Нет</v-btn>
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
      modalDeletePost: "modalStore/getModalDeletePost",
      selectedPost: "postsStore/getSelectedPost",
    }),
    isOpen() {
      return this.modalDeletePost.isOpen;
    },
  },
  methods: {
    ...mapMutations({
      setSelectedPost: "postsStore/setSelectedPost",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
      deletePost: "postsStore/deletePost",
    }),
    onDelete() {
      this.deletePost({ postId: this.selectedPost._id, owner: this.profile.id });
      this.setSelectedPost(null);
    }
  },
  watch: {
    isOpen() {
      this.dialog = this.isOpen;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalDeletePost', value: false });
        this.setSelectedPost(null);
      }
    }
  }
}
</script>
