<template>
  <div>
    <ProfileInfo
      :user="user"
      :owner="false"
    />
    <v-divider></v-divider>
    <ProfilePostList 
      :owner="false"
    />
    <ModalDelete />
    <ModalCommentList />
    <Alert />
  </div>
</template>

<script setup>
definePageMeta({
  name: "UserCardPage",
})
</script>

<script>
import { mapGetters, mapActions } from "vuex";
import Alert from '../components/Alert.vue';
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import ProfilePostList from '../components/profile/ProfilePostList.vue';
import ModalDelete from "~/components/modals/ModalDelete.vue";
import ModalCommentList from "~/components/modals/ModalCommentList.vue";

export default {
  components: {
    Alert,
    ProfileInfo,
    ProfilePostList,
    ModalDelete,
    ModalCommentList,
  },
  computed: {
    ...mapGetters({
      user: "usersStore/getUser",
    }),
  },
  methods: {
    ...mapActions({
      setUser: "usersStore/setUser",
    }),
  },
  mounted() {
    this.setUser({ userId: this.$route.params.id });
  }
}
</script>
