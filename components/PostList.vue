<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
    <ul v-else class="list">
      <li v-for="post in postList" :key="post._id">
        <v-card elevation="4">
          <div v-if="post.ownerChanel" class="list__owner-container">
            <NuxtLink :to="`/chanels/${post.ownerChanel._id}`" class="list__link">{{ post.ownerChanel.name }}</NuxtLink>
            <PostBtn v-if="post.owner._id === profile._id" :post="post" />
          </div>
          <div v-else class="list__owner-container">
            <NuxtLink v-if="post.owner._id === profile._id" to="/profile" class="list__link">{{ post.owner.name }}</NuxtLink>
            <NuxtLink v-else :to="`/users/${post.owner._id}`" class="list__link">{{ post.owner.name }}</NuxtLink>
            <PostBtn v-if="post.owner._id === profile._id" :post="post" />
          </div>
          <span class="list__date">{{ convertDate(post.createdAt) }}</span>
          <img v-if="post.photo" :src="`http://158.160.142.248/api/${post.photo}`" class="list__image" />
          <p v-if="post.text" class="list__text">{{ post.text }}</p>
          <div class="list__actions">
            <div class="list__likes">
              <v-btn
                v-if="getOwnLike(post)"
                density="compact"
                icon="mdi-heart"
                color="#E57373"
                variant="tonal"
                @click="deleteLike(post._id)"
              ></v-btn>
              <v-btn
                v-else
                density="compact"
                icon="mdi-heart-outline"
                color="#E57373"
                variant="tonal"
                @click="addLike(post._id)"
              ></v-btn>
              <span class="list__likes-count">{{ post.likes.length }}</span>
            </div>
            <v-btn
              v-if="getCommentsAccess(post.ownerChanel ? post.ownerChanel : post.owner)"
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
import PostBtn from "./PostBtn.vue";
import { convertDate } from "~/utils/convertDate";

export default {
  components: {
    PostBtn,
  },
  computed: {
    ...mapGetters({
      postList: "postsStore/getPostList",
      profile: "profileStore/getProfile",
      chanel: "chanelsStore/getChanel",
      loading: "postsStore/getLoading",
    }),
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
    getCommentsAccess(profile) {
      return profile.privatSettings.comments;
    },
    getOwnLike(post) {
      return post.likes.includes(this.profile._id);
    },
    showCommentList(post) {
      this.setSelectedPost(post);
      this.setModal({ type: 'modalCommentList', value: true });
    },
    addLike(postId) {
      if (this.$route.path === '/tape') {
        this.addLikePost({ postId, tape: 1 });
      } else {
        this.addLikePost({ postId, tape: 0 });
      }
    },
    deleteLike(postId) {
      if (this.$route.path === '/tape') {
        this.deleteLikePost({ postId, tape: 1 });
      } else {
        this.deleteLikePost({ postId, tape: 0 });
      }
    }
  }
}
</script>

<style scoped>
@import url(../assets/styles/list.css);
</style>
