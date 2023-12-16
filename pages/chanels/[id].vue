<template>
  <div>
    <ChanelInfo />
    <v-divider></v-divider>
    <ChanelPostList />
    <ModalEditPhoto />
    <ModalEditInfo />
    <ModalEditPrivatSettings />
    <ModalDelete />
    <ModalCommentList />
    <ModalAddPost />
    <Alert />
  </div>
</template>

<script setup>
definePageMeta({
  name: "ChanelCardPage",
})
</script>

<script>
import { mapGetters, mapActions } from "vuex";
import Alert from '../components/Alert.vue';
import ChanelInfo from '../components/chanels/ChanelInfo.vue';
import ChanelPostList from '../components/chanels/ChanelPostList.vue';
import ModalEditPhoto from "~/components/modals/ModalEditPhoto.vue";
import ModalEditInfo from "~/components/modals/ModalEditInfo.vue";
import ModalEditPrivatSettings from "~/components/modals/ModalEditPrivatSettings.vue";
import ModalDelete from "~/components/modals/ModalDelete.vue";
import ModalCommentList from "~/components/modals/ModalCommentList.vue";
import ModalAddPost from '../components/modals/ModalAddPost.vue';

export default {
  components: {
    Alert,
    ChanelInfo,
    ChanelPostList,
    ModalEditPhoto,
    ModalEditInfo,
    ModalEditPrivatSettings,
    ModalDelete,
    ModalCommentList,
    ModalAddPost,
  },
  methods: {
    ...mapActions({
      setChanel: "chanelsStore/setChanel",
    }),
  },
  mounted() {
    this.setChanel({ chanelId: this.$route.params.id });
  }
}
</script>
