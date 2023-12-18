<template>
  <div class="posts">
    <div class="posts__title-container">
      <h2 v-if="!postsAccess" class="posts__title">Посты видны только подписчикам</h2>
      <h2 v-else-if="postsAccess && postList.length" class="posts__title">Список постов:</h2>
      <h2 v-else-if="postsAccess && !postList.length" class="posts__title">Список постов пуст</h2>
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
          <div class="list__owner-container">
            <NuxtLink v-if="post.owner._id === profile.id" to="/profile" class="list__link">{{ post.owner.name }}</NuxtLink>
            <NuxtLink v-else :to="`/users/${post.owner._id}`" class="list__link">{{ post.owner.name }}</NuxtLink>
            <PostBtn v-if="post.owner._id === profile.id" :post="post" />
          </div>
          <span class="list__date">{{ convertDate(post.createdAt) }}</span>
          <img v-if="post.photo" :src="`http://localhost:3001/${post.photo}`" class="list__image" />
          <p v-if="post.text" class="list__text">{{ post.text }}</p>
          <div class="list__actions">
            <div class="list__likes">
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
              <span class="list__likes-count">{{ post.likes.length }}</span>
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
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import PostBtn from "../PostBtn.vue";
import { convertDate } from "~/utils/convertDate";

export default {
  components: {
    PostBtn,
  },
  computed: {
    ...mapGetters({
      postList: "postsStore/getPostList",
      profile: "profileStore/getProfile",
      user: "usersStore/getUser",
    }),
    owner() {
      return this.$route.path.split('/')[1] === 'profile' ? true : false;
    },
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
@import url(../../assets/styles/posts.css);
@import url(../../assets/styles/list.css);
</style>
