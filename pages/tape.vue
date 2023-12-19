<template>
  <div>
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
  }
}
</script>
