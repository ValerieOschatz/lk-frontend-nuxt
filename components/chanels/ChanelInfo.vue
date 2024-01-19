<template>
<div class="info">
  <div class="info__photo-column">
    <v-avatar
      color="#A1887F"
      size="100"
    >
      <v-img
        v-if="chanel.photo"
        :src="`http://158.160.142.248/api/${chanel.photo}`"
        alt="avatar"
        cover
      ></v-img>
      <span v-else class="text-h5">{{ chanel.name && chanel.name[0] }}</span>
    </v-avatar>
    <ChanelEditBtn v-if="chanel.owner === profile._id" />
    <div v-else class="info__btn-container">
      <v-btn
        v-if="isSubscribed"
        size="x-small"
        width="100%"
        color="#E57373"
        @click="onUnsubscribe"
      >
        Отписаться
      </v-btn>
      <v-btn
        v-else
        size="x-small"
        width="100%"
        color="#E57373"
        @click="onSubscribe"
      >
        Подписаться
      </v-btn>
    </div>
  </div>
  <div class="info__info-column">
    <v-card-title class="info__name">
      <span>{{ chanel.name }}</span>
      <span class="info__subscribers">Подписчики: {{ chanel.subscribers.length }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <div class="info__info-container">
      <p class="px-0 py-0 my-3">{{ chanel.description }}</p>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ChanelEditBtn from "./ChanelEditBtn.vue";

export default {
  components: {
    ChanelEditBtn,
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      chanel: "chanelsStore/getChanel",
    }),
    isSubscribed() {
      return this.chanel.subscribers.includes(this.profile._id);
    },
  },
  methods: {
    ...mapActions({
      subscribe: "chanelsStore/subscribe",
      unsubscribe: "chanelsStore/unsubscribe",
    }),
    onSubscribe() {
      this.subscribe({ chanelId: this.chanel._id, option: 'card' });
    },
    onUnsubscribe() {
      this.unsubscribe({ chanelId: this.chanel._id, option: 'card' });
    }
  }
}
</script>

<style scoped>
@import url(../../assets/styles/info.css);
</style>
