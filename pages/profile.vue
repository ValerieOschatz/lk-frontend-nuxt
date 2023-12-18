<template>
  <div>
    <ProfileInfo />
    <v-divider></v-divider>
    <ProfilePostList />
    <ModalAddPost />
    <ModalDelete />
    <ModalEditPhoto />
    <ModalEditInfo />
    <ModalEditPrivatSettings />
    <ModalLogout />
    <ModalCommentList />
    <Alert />
  </div>
</template>

<script setup>
definePageMeta({
  name: "ProfilePage",
})
</script>

<script>
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import ProfilePostList from '../components/profile/ProfilePostList.vue';
import ModalAddPost from '../components/modals/ModalAddPost.vue';
import ModalDelete from "~/components/modals/ModalDelete.vue";
import ModalEditPhoto from "~/components/modals/ModalEditPhoto.vue";
import ModalEditInfo from "~/components/modals/ModalEditInfo.vue";
import ModalEditPrivatSettings from "~/components/modals/ModalEditPrivatSettings.vue";
import ModalLogout from "~/components/modals/ModalLogout.vue";
import ModalCommentList from "~/components/modals/ModalCommentList.vue";
import Alert from '../components/Alert.vue';

export default {
  components: {
    ProfileInfo,
    ProfilePostList,
    ModalAddPost,
    ModalDelete,
    ModalEditPhoto,
    ModalEditInfo,
    ModalEditPrivatSettings,
    ModalLogout,
    ModalCommentList,
    Alert,
  }
}
</script>
