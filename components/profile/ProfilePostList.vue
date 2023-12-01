<template>
  <div class="post-list">
    <div class="title-container">
      <h2>Список постов:</h2>
      <v-btn density="compact" icon="mdi-plus"></v-btn>
    </div>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <div class="owner-container">
          <span>Name</span>
          <v-btn density="compact" icon="mdi-dots-vertical"></v-btn>
        </div>
        <span>{{ post.createdAt }}</span>
        <img v-if="post.photos.length" src="~/assets/images/ricardo-loaiza-p0TX8uYHC5k-unsplash.jpg" />
        <div class="actions">
          <div class="likes">
            <v-btn density="compact" icon="mdi-heart"></v-btn>
            <span>{{ post.likes.length }}</span>
          </div>
          <v-btn variant="text">Комментарии</v-btn>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
data: () => ({
  posts: [
    {
      id: 1,
      text: 'text text',
      photos: ['~/assets/images/ricardo-loaiza-p0TX8uYHC5k-unsplash.jpg'],
      likes: [1,2,3],
      createdAt: '11.11.11'
    },
    {
      id: 2,
      text: '123456',
      photos: [],
      likes: [],
      createdAt: '11.11.11'
    },
    {
      id: 3,
      text: 'qwer tyui asdf ghjk',
      photos: ['~/assets/images/ricardo-loaiza-p0TX8uYHC5k-unsplash.jpg'],
      likes: [1],
      createdAt: '11.11.11'
    },
  ]
}),
props: {
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
</style>