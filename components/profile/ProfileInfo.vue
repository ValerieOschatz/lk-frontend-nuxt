<template>
    <div class="info-card">
      <div class="photo-column">
        <v-avatar
          color="#A1887F"
          size="100"
        >
          <v-img
            v-if="photo"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="avatar"
          ></v-img>
          <span v-else class="text-h5">NM</span>
        </v-avatar>
        <v-btn
          size="x-small"
          width="100%"
          color="#B388FF"
        >
          Редактировать
        </v-btn>
      </div>
      <div class="info-column">
        <v-card-title class="name">
          <span>Name</span>
          <span class="subscribers">0 подписчиков</span>
        </v-card-title>
        <v-divider></v-divider>
        <div class="info-container">
          <p class="px-0 py-0 my-3">text</p>
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

export default {
  data: () => ({
    photo: null,
  }),
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
  font-size: 14px;
}
.link {
  text-decoration: none;
  color: rgb(102, 92, 110);
  font-size: 12px;
}
</style>