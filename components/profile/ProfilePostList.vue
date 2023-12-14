<template>
  <div class="post-list">
    <div class="title-container">
      <h2 v-if="!postsAccess" class="list-title">Посты видны только подписчикам</h2>
      <h2 v-else-if="postsAccess && postList.length" class="list-title">Список постов:</h2>
      <h2 v-else-if="postsAccess && !postList.length" class="list-title">Список постов пуст</h2>
      <v-btn
        v-if="owner"
        density="compact"
        icon="mdi-plus"
        color="#5C6BC0"
        variant="tonal"
        @click="addPost"
      ></v-btn>
    </div>
    <ul v-if="postsAccess" class="list">
      <li v-for="post in postList" :key="post._id">
        <v-card elevation="4">
          <div class="owner-container">
            <NuxtLink v-if="post.owner._id === profile.id" to="/profile" class="link">{{ post.owner.name }}</NuxtLink>
            <NuxtLink v-else :to="`/users/${post.owner._id}`" class="link">{{ post.owner.name }}</NuxtLink>
            <PostBtn v-if="post.owner._id === profile.id" :post="post" />
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
                @click="deleteLikePost(post._id)"
              ></v-btn>
              <v-btn
                v-else
                density="compact"
                icon="mdi-heart-outline"
                color="#E57373"
                variant="tonal"
                @click="addLikePost(post._id)"
              ></v-btn>
              <span class="likes-count">{{ post.likes.length }}</span>
            </div>
            <v-btn
              v-if="commentsAccess"
              variant="text"
              color="rgb(179, 91, 67)"
              @click="showCommentList(post)"
            >
              Комментарии
            </v-btn>
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
import PostBtn from "../PostBtn.vue";
import { convertDate } from "~/utils/convertDate";

export default {
  components: {
    ModalCommentList,
    PostBtn,
  },
  data: () => ({
  }),
  props: {
    owner: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      postList: "postsStore/getPostList",
      profile: "profileStore/getProfile",
      user: "usersStore/getUser",
    }),
    postsAccess() {
      return this.owner || this.user.privatSettings.posts || this.user.subscribers.includes(this.profile.id);
    },
    commentsAccess() {
      return (this.owner && this.profile.privatSettings.comments) || (!this.owner && this.user.privatSettings.comments);
    },
  },
  methods: {
    ...mapMutations({
      setSelectedPost: "postsStore/setSelectedPost",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
      setPostList: "postsStore/setPostList",
      addLikePost: "postsStore/addLikePost",
      deleteLikePost: "postsStore/deleteLikePost",
    }),
    addPost() {
      this.setModal({ type: 'modalAddPost', value: true, option: 'create' });
    },
    getOwnLike(post) {
      return post.likes.includes(this.profile.id);
    },
    showCommentList(post) {
      this.setSelectedPost(post);
      this.setModal({ type: 'modalCommentList', value: true });
    }
  },
  watch: {
    profile() {
      if (this.owner) this.setPostList({ owner: this.profile.id });
      if (!this.owner && this.postsAccess) this.setPostList({ owner: this.user.id });
    },
    user() {
      if (!this.owner && this.postsAccess) this.setPostList({ owner: this.user.id });
    },
  },
  mounted() {
    if (this.owner && this.profile.id) {
      this.setPostList({ owner: this.profile.id });
    }
  }
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
.link {
  text-decoration: none;
  color: rgb(179, 91, 67);
  /* font-size: 12px; */
}
</style>