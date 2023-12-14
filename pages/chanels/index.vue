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
        <ChanelSearch />
        <ModalCreateChanel />
        <ChanelList />
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
import ModalCreateChanel from "~/components/modals/ModalCreateChanel.vue";

export default {
  components: {
    Alert,
    ChanelSearch,
    ChanelList,
    ModalCreateChanel,
  },
  data: () => ({
    tab: null,
  }),
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
    }),
  },
  methods: {
    ...mapActions({
    }),
  },
  watch: {
    tab() {
      if (this.tab === 1) {
      } else if (this.tab === 2) {
      } else if (this.tab === 3) {
      }
    }
  }
}
</script>
