<template>
  <div>
    <ChanelInfo />
    <v-divider></v-divider>
    <!-- <ProfilePostList 
      :owner="false"
    /> -->
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
// import ProfilePostList from '../components/profile/ProfilePostList.vue';

export default {
  components: {
    Alert,
    ChanelInfo,
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
