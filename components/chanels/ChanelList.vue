<template>
<v-list
  item-props
  lines="three"
>
  <div v-for="chanel in list" :key="chanel._id">
    <v-list-item
      :prepend-avatar="chanel.photo ? `http://localhost:3001/${chanel.photo}` : '/image2.jpg'"
      nav
      height="60"
    >
    <v-list-item-title class="link" @click="navigateTo(`/chanels/${chanel._id}`)">{{ chanel.name }}</v-list-item-title>
    <v-list-item-subtitle>{{ `Подписчики: ${chanel.subscribers.length}` }}</v-list-item-subtitle>
      <template v-slot:append v-if="chanel.owner !== profile.id">
        <v-btn
          v-if="isSubscribed(chanel)"
          variant="text"
          icon="mdi-minus-box-multiple-outline"
          color="#E57373"
          @click="onUnsubscribe(chanel._id)"
        ></v-btn>
        <v-btn
          v-else
          variant="text"
          icon="mdi-plus-box-multiple-outline"
          color="#E57373"
          @click="onSubscribe(chanel._id)"
        ></v-btn>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</v-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  props: {
    tab: {
      type: Number,
      default: 0,
    },
    option: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      ownChanelList: "chanelsStore/getOwnChanelList",
    }),
    list() {
      if (this.tab === 1) {
      } else if (this.tab === 2) {
      } else if (this.tab === 3) {
        return this.ownChanelList;
      }
    }
  },
  methods: {
    ...mapActions({
      subscribe: "profileStore/subscribe",
      unsubscribe: "profileStore/unsubscribe",
    }),
    isSubscribed(chanel) {
      return chanel.subscribers.includes(this.profile.id);
    },
    onSubscribe(userId) {
      this.subscribe({ userId, profileId: this.profile.id, option: this.option });
    },
    onUnsubscribe(userId) {
      this.unsubscribe({ userId, profileId: this.profile.id, option: this.option });
    }
  },
}
</script>

<style scoped>
.link {
  cursor: pointer;
}
</style>
