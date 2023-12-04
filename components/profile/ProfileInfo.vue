<template>
    <div class="info-card">
      <div class="photo-column">
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
      </div>
      <div class="info-column">
        <v-card-title class="name">
          <span>{{ user.name }}</span>
          <span class="subscribers">Подписчиков {{ user.subscribers.length }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <div class="info-container">
          <p class="px-0 py-0 my-3">{{ user.description }}</p>
          <div class="d-flex justify-space-evenly">
            <NuxtLink to="" class="link">Подписки на каналы</NuxtLink>
            <NuxtLink to="" class="link">Подписки на людей</NuxtLink>
            <NuxtLink to="" class="link">Подписчики</NuxtLink>
          </div>
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
  data: () => ({
  }),
  props: {
    user: {
      type: Object,
      default() {
        return {
          id: '',
          name: '',
          photo: '',
          description: '',
          subscribers: [],
        }
      },
    },
    privatSettings: {
      type: Object,
      default() {
        return {
          comments: null,
          profileInfo: null,
        }
      },
    },
    owner: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
    }),
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
.link {
  text-decoration: none;
  color: rgb(102, 92, 110);
  font-size: 12px;
}
</style>