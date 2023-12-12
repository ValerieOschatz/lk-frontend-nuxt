<template>
  <div>
    <ProfileInfo
      :user="profile"
      :owner="true"
    />
    <v-divider></v-divider>
    <ProfilePostList 
      :user="profile"
      :owner="true"
    />
    <ModalAddPost />
    <ModalDeletePostVue />
    <ModalEditProfilePhoto />
    <ModalEditProfileInfo />
    <ModalEditPrivatSettings />
    <ModalLogout />
    <Alert />
  </div>
</template>

<script setup>
definePageMeta({
  name: "ProfilePage",
})
</script>

<script>
import { mapGetters, mapActions } from "vuex";
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import ProfilePostList from '../components/profile/ProfilePostList.vue';
import ModalAddPost from '../components/modals/ModalAddPost.vue';
import ModalDeletePostVue from "~/components/modals/ModalDeletePost.vue";
import ModalEditProfilePhoto from "~/components/modals/ModalEditProfilePhoto.vue";
import ModalEditProfileInfo from "~/components/modals/ModalEditProfileInfo.vue";
import ModalEditPrivatSettings from "~/components/modals/ModalEditPrivatSettings.vue";
import ModalLogout from "~/components/modals/ModalLogout.vue";
import Alert from '../components/Alert.vue';

export default {
  components: {
    ProfileInfo,
    ProfilePostList,
    ModalAddPost,
    ModalDeletePostVue,
    ModalEditProfilePhoto,
    ModalEditProfileInfo,
    ModalEditPrivatSettings,
    ModalLogout,
    Alert,
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
    }),
  },
  methods: {
    ...mapActions({
      setProfile: "profileStore/setProfile",
    }),
  }
}
</script>
