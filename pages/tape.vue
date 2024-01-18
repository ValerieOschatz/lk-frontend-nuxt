<template>
  <div>
    <v-card-title v-if="postList.length" class="title">Лента</v-card-title>
    <v-card-title v-else class="title">Лента пуста</v-card-title>
    <PostList />
    <ModalDelete />
    <ModalCommentList />
    <Alert />
  </div>
</template>

<script setup>
definePageMeta({
  name: "TapePage",
})
</script>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import PostList from "~/components/PostList.vue";
import ModalDelete from "~/components/modals/ModalDelete.vue";
import ModalCommentList from "~/components/modals/ModalCommentList.vue";
import Alert from '../components/Alert.vue';

export default {
  components: {
    PostList,
    ModalDelete,
    ModalCommentList,
    Alert,
  },
  computed: {
    ...mapGetters({
      postList: "postsStore/getPostList",
    }),
  },
  methods: {
    ...mapMutations({
      setLoading: "postsStore/setLoading",
    }),
    ...mapActions({
      setPostList: "postsStore/setPostList",
    })
  },
  mounted() {
    this.setLoading(true);
    this.setPostList({ tape: 1 });
  }
}
</script>

<style scoped>
.title {
  color: #df9696;
}
</style>
