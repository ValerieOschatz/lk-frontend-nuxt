<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
      height="500"
      scrollable
    >
      <v-card>
        <v-toolbar color="rgb(220, 205, 235)" density="compact">
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
          <ul class="list mt-2" v-if="commentList.length">
            <li v-for="comment in commentList" :key="comment._id">
              <v-card elevation="4">
                <div class="list__owner-container">
                  <span>{{ comment.owner.name }}</span>
                  <CommentBtn v-if="comment.owner._id === profile._id" :comment="comment" />
                </div>
                <span class="list__date">{{ convertDate(comment.createdAt) }}</span>
                <p class="list__text">{{ comment.text }}</p>
                <div class="list__actions">
                  <div class="list__likes">
                    <v-btn
                      v-if="getOwnLike(comment)"
                      density="compact"
                      icon="mdi-heart"
                      color="#E57373"
                      variant="tonal"
                      @click="deleteLikeComment(comment._id)"
                    ></v-btn>
                    <v-btn
                      v-else
                      density="compact"
                      icon="mdi-heart-outline"
                      color="#E57373"
                      variant="tonal"
                      @click="addLikeComment(comment._id)"
                    ></v-btn>
                    <span class="list__likes-count">{{ comment.likes.length }}</span>
                  </div>
                </div>
              </v-card>
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </v-dialog>
    <ModalAddComment />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { convertDate } from "~/utils/convertDate";
import ModalAddComment from "./ModalAddComment.vue";
import CommentBtn from "~/components/CommentBtn.vue";

export default {
  components: {
    ModalAddComment,
    CommentBtn,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({
      modalCommentList: "modalStore/getModalCommentList",
      commentList: "commentsStore/getCommentList",
      profile: "profileStore/getProfile",
      selectedPost: "postsStore/getSelectedPost",
    }),
    isOpen() {
      return this.modalCommentList.isOpen;
    },
  },
  methods: {
    ...mapMutations({
      setSelectedPost: "postsStore/setSelectedPost",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
      setCommentList: "commentsStore/setCommentList",
      addLikeComment: "commentsStore/addLikeComment",
      deleteLikeComment: "commentsStore/deleteLikeComment",
    }),
    getOwnLike(comment) {
      return comment.likes.includes(this.profile._id);
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
        this.setSelectedPost(null);
      }
    },
    selectedPost() {
      if (this.selectedPost) this.setCommentList({ post: this.selectedPost._id });
    }
  }
}
</script>

<style scoped>
@import url(../../assets/styles/list.css);
</style>
