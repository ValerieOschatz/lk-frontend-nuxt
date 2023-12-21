<template>
  <div class="posts">
    <div class="posts__title-container">
      <h2 v-if="!postsAccess" class="posts__title">Посты видны только подписчикам</h2>
      <h2 v-else-if="postsAccess && postList.length" class="posts__title">Список постов:</h2>
      <h2 v-else-if="postsAccess && !postList.length" class="posts__title">Список постов пуст</h2>
      <v-btn
        v-if="ownChanel"
        density="compact"
        icon="mdi-plus"
        color="#5C6BC0"
        variant="tonal"
        @click="addPost"
      ></v-btn>
    </div>
    <PostList v-if="postsAccess" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import PostList from "~/components/PostList.vue";

export default {
  components: {
    PostList,
  },
  computed: {
    ...mapGetters({
      postList: "postsStore/getPostList",
      profile: "profileStore/getProfile",
      chanel: "chanelsStore/getChanel",
    }),
    ownChanel() {
      return this.chanel.owner === this.profile._id;
    },
    postsAccess() {
      return this.ownChanel || this.chanel.privatSettings.posts || this.chanel.subscribers.includes(this.profile._id);
    },
  },
  methods: {
    ...mapMutations({
      setLoading: "postsStore/setLoading",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
      setPostList: "postsStore/setPostList",
    }),
    addPost() {
      this.setModal({ type: 'modalAddPost', value: true, option: 'create' });
    },
  },
  watch: {
    chanel() {
      this.setLoading(true);
      if (this.postsAccess) this.setPostList({ ownerChanel: this.chanel._id });
    },
  }
}
</script>

<style scoped>
@import url(../../assets/styles/posts.css);
</style>
