<template>
  <div class="post-list">
    <div class="title-container">
      <h2 v-if="postList.length" class="list-title">Список постов:</h2>
      <h2 v-else class="list-title">Список постов пуст</h2>
      <v-btn
        v-if="owner"
        density="compact"
        icon="mdi-plus"
        color="#EA80FC"
        variant="tonal"
        @click="addPost"
      ></v-btn>
    </div>
    <ul class="list">
      <li v-for="post in postList" :key="post._id">
        <v-card elevation="4">
          <div class="owner-container">
            <span>{{ post.owner.name }}</span>
            <v-btn
              density="compact"
              icon="mdi-dots-vertical"
              color="#EA80FC"
              variant="tonal"
            ></v-btn>
          </div>
          <span class="date">{{ convertDate(post.createdAt) }}</span>
          <img v-if="post.photo" :src="`http://localhost:3001/${post.photo}`" class="image" />
          <p v-if="post.text" class="text">{{ post.text }}</p>
          <div class="actions">
            <div class="likes">
              <v-btn
                v-if="getOwnLike(post)"
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
              <span class="likes-count">{{ post.likes.length }}</span>
            </div>
            <v-btn variant="text" color="#7B1FA2" @click="showCommentList(post._id)">Комментарии</v-btn>
          </div>
        </v-card>
      </li>
    </ul>
    <ModalCommentList />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import ModalCommentList from "~/components/modals/ModalCommentList.vue";
import { convertDate } from "~/utils/convertDate";

export default {
  components: {
    ModalCommentList,
  },
  data: () => ({
  }),
  props: {
    privatSettings: {
      type: Object,
      default() {
        return {
          comments: null,
          profileInfo: null,
        }
      },
    },
    owner: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      default: '',
    }
  },
  computed: {
    ...mapGetters({
      postList: "postsStore/getPostList",
      profile: "profileStore/getProfile",
    }),
  },
  methods: {
    ...mapMutations({
      setSelectedPostId: "postsStore/setSelectedPostId",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
      setPostList: "postsStore/setPostList",
    }),
    addPost() {
      this.setModal({ type: 'modalAddPost', value: true });
    },
    getOwnLike(post) {
      return post.likes.includes(this.profile.id);
    },
    showCommentList(id) {
      this.setSelectedPostId(id);
      this.setModal({ type: 'modalCommentList', value: true });
    }
  },
  watch: {
    userId() {
      this.setPostList({ owner: this.userId });
    }
  },
}
</script>

<style scoped>
@import url(../../assets/styles/list.css);
.post-list {
  padding-top: 20px;
}
.list-title {
  font-size: 18px;
  font-weight: 400;
}
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>