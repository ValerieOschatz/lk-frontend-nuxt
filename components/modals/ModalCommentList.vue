<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
      height="500"
      scrollable
    >
      <v-card>
        <v-toolbar color="rgb(220, 205, 235)">
          <v-toolbar-title>Комментарии</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn variant="text" icon="mdi-close" @click="dialog = false"></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-btn
            variant="text"
            color="#7B1FA2"
            size="small"
            block
            @click="addComment"
            >Написатть комментарий
          </v-btn>
          <ModalAddComment />
          <ul class="list mt-2" v-if="commentList.length">
            <li v-for="comment in commentList" :key="comment._id">
              <v-card elevation="4">
                <div class="owner-container">
                  <span>{{ comment.owner.name }}</span>
                  <v-btn
                    density="compact"
                    icon="mdi-dots-vertical"
                    color="#EA80FC"
                    variant="tonal"
                  ></v-btn>
                </div>
                <span class="date">{{ convertDate(comment.createdAt) }}</span>
                <p class="text">{{ comment.text }}</p>
                <div class="actions">
                  <div class="likes">
                    <v-btn
                      v-if="getOwnLike(comment)"
                      density="compact"
                      icon="mdi-heart"
                      color="#E57373"
                      variant="tonal"
                    ></v-btn>
                    <v-btn
                      v-else
                      density="compact"
                      icon="mdi-heart-outline"
                      color="#E57373"
                      variant="tonal"
                    ></v-btn>
                    <span class="likes-count">{{ comment.likes.length }}</span>
                  </div>
                </div>
              </v-card>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { convertDate } from "~/utils/convertDate";
import ModalAddComment from "./ModalAddComment.vue";

export default {
  components: {
    ModalAddComment,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({
      modalCommentList: "modalStore/getModalCommentList",
      commentList: "commentsStore/getCommentList",
      profile: "profileStore/getProfile",
      selectedPostId: "postsStore/getSelectedPostId",
    }),
    isOpen() {
      return this.modalCommentList.isOpen;
    },
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      setCommentList: "commentsStore/setCommentList",
    }),
    getOwnLike(comment) {
      return comment.likes.includes(this.profile.id);
    },
    addComment() {
      this.setModal({ type: 'modalAddComment', value: true, option: 'create' });
    }
  },
  watch: {
    isOpen() {
      this.dialog = this.isOpen;
    },
    dialog() {
      if (this.dialog === false) {
        this.setModal({ type: 'modalCommentList', value: false });
      }
    },
    selectedPostId() {
      this.setCommentList({ post: this.selectedPostId });
    }
  }
}
</script>

<style scoped>
@import url(../../assets/styles/list.css);
</style>
