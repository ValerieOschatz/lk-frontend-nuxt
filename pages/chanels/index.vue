<template>
  <div>
    <v-tabs
      v-model="tab"
      color="#E57373"
      align-tabs="center"
    >
      <v-tab :value="1">Подписки</v-tab>
      <v-tab :value="2">Поиск каналов</v-tab>
      <v-tab :value="3">Мои каналы</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <ChanelSearch :tab="tab" />
        <ChanelList :tab="tab" option="subscriptions" />
      </v-window-item>
      <v-window-item :value="2">
        <ChanelSearch :tab="tab" />
        <ChanelList :tab="tab" option="search" />
      </v-window-item>
      <v-window-item :value="3">
        <ChanelSearch :tab="tab" />
        <v-btn
          variant="text"
          color="rgb(179, 91, 67)"
          block
          @click="addChanel"
        >
          Создать канал
        </v-btn>
        <ModalAddChanel />
        <ChanelList :tab="tab" option="own" />
      </v-window-item>
    </v-window>
    <Alert />
  </div>
</template>

<script setup>
definePageMeta({
  name: "ChanelListPage",
})
</script>

<script>
import { mapGetters, mapActions } from "vuex";
import Alert from '../components/Alert.vue';
import ChanelSearch from "~/components/chanels/ChanelSearch.vue";
import ChanelList from "~/components/chanels/ChanelList.vue";
import ModalAddChanel from "~/components/modals/ModalAddChanel.vue";

export default {
  components: {
    Alert,
    ChanelSearch,
    ChanelList,
    ModalAddChanel,
  },
  data: () => ({
    tab: null,
  }),
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      ownChanelName: "chanelsStore/getOwnChanelName",
      searchedName: "chanelsStore/getSearchedChanelName",
      subscriptionName: "chanelsStore/getSubscriptionChanelName",
    }),
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      setOwnChanelList: "chanelsStore/setOwnChanelList",
      setSearchedChanelList: "chanelsStore/setSearchedChanelList",
      setSubscriptionChanelList: "chanelsStore/setSubscriptionChanelList",
    }),
    addChanel() {
      this.setModal({ type: 'modalAddChanel', value: true });
    }
  },
  watch: {
    tab() {
      if (this.profile._id) {
        if (this.tab === 1) {
          this.setSubscriptionChanelList({ name: this.subscriptionName, subscriptions: this.profile._id });
        } else if (this.tab === 2) {
          this.setSearchedChanelList({ name: this.searchedName });
        } else if (this.tab === 3) {
          this.setOwnChanelList({ owner: this.profile._id, name: this.ownChanelName });
        }
      }
    },
    profile() {
      if (this.tab === 1) {
        this.setSubscriptionChanelList({ name: this.subscriptionName, subscriptions: this.profile._id });
      }
    }
  }
}
</script>
