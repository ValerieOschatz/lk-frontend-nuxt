<template>
<div class="info-card">
  <div class="photo-column">
    <v-avatar
      color="#A1887F"
      size="100"
    >
      <v-img
        v-if="chanel.photo"
        :src="`http://localhost:3001/${chanel.photo}`"
        alt="avatar"
        cover
      ></v-img>
      <span v-else class="text-h5">{{ chanel.name && chanel.name[0] }}</span>
    </v-avatar>
    <ChanelEditBtn v-if="chanel.owner === profile.id" />
    <div v-else class="btn-container">
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
  <div class="info-column">
    <v-card-title class="name">
      <span>{{ chanel.name }}</span>
      <span class="subscribers">Подписчики: {{ chanel.subscribers.length }}</span>
    </v-card-title>
    <v-divider></v-divider>
    <div class="info-container">
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
      return this.chanel.subscribers.includes(this.profile.id);
    },
  },
  methods: {
    ...mapActions({
      subscribe: "profileStore/subscribe",
      unsubscribe: "profileStore/unsubscribe",
      setUser: "usersStore/setUser",
    }),
    onSubscribe() {
      this.subscribe({ userId: this.user.id, option: 'card' });
    },
    onUnsubscribe() {
      this.unsubscribe({ userId: this.user.id, option: 'card' });
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.info-card {
  display: flex;
  gap: 40px;
  padding-bottom: 20px;
}
.photo-column {
  display: flex;
  flex-direction: column;
  width: 20%;
  align-items: center;
  gap: 20px;
}
.info-column {
  width: 80%;
}
.info-container {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0;
}
.subscribers {
  font-size: 12px;
}
.btn-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
</style>