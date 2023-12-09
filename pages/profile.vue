<template>
  <v-card class="content">
    <ProfileInfo
      :user="profile"
      :privatSettings="privatSettings"
      :owner="true"
    />
    <v-divider></v-divider>
    <ProfilePostList 
      :privatSettings="privatSettings"
      :owner="true"
      :userId="profile.id"
    />
    <ModalAddPost />
    <ModalEditProfilePhoto />
    <ModalEditProfileInfo />
    <ModalEditPrivatSettings />
    <ModalLogout />
  </v-card>
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
import ModalEditProfilePhoto from "~/components/modals/ModalEditProfilePhoto.vue";
import ModalEditProfileInfo from "~/components/modals/ModalEditProfileInfo.vue";
import ModalEditPrivatSettings from "~/components/modals/ModalEditPrivatSettings.vue";
import ModalLogout from "~/components/modals/ModalLogout.vue";

export default {
  components: {
    ProfileInfo,
    ProfilePostList,
    ModalAddPost,
    ModalEditProfilePhoto,
    ModalEditProfileInfo,
    ModalEditPrivatSettings,
    ModalLogout,
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      privatSettings: "profileStore/getPrivatSettings",
    }),
  },
  methods: {
    ...mapActions({
      setProfile: "profileStore/setProfile",
    }),
  }
}
</script>

<style scoped>
.content {
  width: calc(100% - 20px);
  max-width: 880px;
  margin: 20px auto;
  padding: 40px;
}
</style>