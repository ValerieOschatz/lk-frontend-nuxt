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
      </v-window-item>
      <v-window-item :value="2">
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
    }),
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      setOwnChanelList: "chanelsStore/setOwnChanelList",
    }),
    addChanel() {
      this.setModal({ type: 'modalAddChanel', value: true });
    }
  },
  watch: {
    tab() {
      if (this.tab === 1) {
      } else if (this.tab === 2) {
      } else if (this.tab === 3) {
        this.setOwnChanelList({ owner: this.profile.id, name: this.ownChanelName });
      }
    }
  }
}
</script>
