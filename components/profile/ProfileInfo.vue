<template>
    <div class="info">
      <div class="info__photo-column">
        <v-avatar
          color="#A1887F"
          size="100"
        >
          <v-img
            v-if="user.photo"
            :src="`http://localhost:3001/${user.photo}`"
            alt="avatar"
            cover
          ></v-img>
          <span v-else class="text-h5">{{ user.name && user.name[0] }}</span>
        </v-avatar>
        <ProfileEditBtn v-if="owner" />
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
          <v-btn
            size="x-small"
            width="100%"
            color="#E57373"
          >
            Сообщение
          </v-btn>
        </div>
      </div>
      <div class="info__info-column">
        <v-card-title class="info__name">
          <span>{{ user.name }}</span>
          <span class="info__subscribers">Подписчики: {{ user.subscribers.length }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <div class="info__info-container">
          <p class="px-0 py-0 my-3">{{ user.description }}</p>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProfileEditBtn from "./ProfileEditBtn.vue";

export default {
  components: {
    ProfileEditBtn,
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      currentUser: "usersStore/getUser",
    }),
    owner() {
      return this.$route.path.split('/')[1] === 'profile' ? true : false;
    },
    user() {
      if (this.owner) {
        return this.profile;
      } else {
        return this.currentUser;
      }
    },
    isSubscribed() {
      return this.user.subscribers.includes(this.profile.id);
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
  }
}
</script>

<style scoped>
@import url(../../assets/styles/info.css);
</style>
