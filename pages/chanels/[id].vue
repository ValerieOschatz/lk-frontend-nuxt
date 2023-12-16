<template>
  <div>
    <ChanelInfo />
    <v-divider></v-divider>
    <!-- <ProfilePostList 
      :owner="false"
    /> -->
    <ModalEditPhoto />
    <ModalEditInfo />
    <ModalEditPrivatSettings />
    <ModalDelete />
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
import ModalEditPhoto from "~/components/modals/ModalEditPhoto.vue";
import ModalEditInfo from "~/components/modals/ModalEditInfo.vue";
import ModalEditPrivatSettings from "~/components/modals/ModalEditPrivatSettings.vue";
import ModalDelete from "~/components/modals/ModalDelete.vue";
// import ProfilePostList from '../components/profile/ProfilePostList.vue';

export default {
  components: {
    Alert,
    ChanelInfo,
    ModalEditPhoto,
    ModalEditInfo,
    ModalEditPrivatSettings,
    ModalDelete,
    // ProfilePostList,
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
