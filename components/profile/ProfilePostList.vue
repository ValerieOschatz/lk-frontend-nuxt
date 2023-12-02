<template>
  <div class="post-list">
    <div class="title-container">
      <h2 v-if="posts.length" class="list-title">Список постов:</h2>
      <h2 v-else class="list-title">Список постов пуст</h2>
      <v-btn
        v-if="owner"
        density="compact"
        icon="mdi-plus"
        @click="addPost"
      ></v-btn>
    </div>
    <ul class="list">
      <li v-for="post in posts" :key="post.id">
        <v-card elevation="4">
          <div class="owner-container">
            <span>Name</span>
            <v-btn density="compact" icon="mdi-dots-vertical"></v-btn>
          </div>
          <span class="date">{{ post.createdAt }}</span>
          <img v-if="post.photos.length" src="~/assets/images/ricardo-loaiza-p0TX8uYHC5k-unsplash.jpg" class="image" />
          <p v-if="post.text" class="text">{{ post.text }}</p>
          <div class="actions">
            <div class="likes">
              <v-btn density="compact" icon="mdi-heart-outline"></v-btn>
              <span>{{ post.likes.length }}</span>
            </div>
            <v-btn variant="text">Комментарии</v-btn>
          </div>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
data: () => ({
  posts: [
    // {
    //   id: 1,
    //   text: 'text text',
    //   photos: ['~/assets/images/ricardo-loaiza-p0TX8uYHC5k-unsplash.jpg'],
    //   likes: [1,2,3],
    //   createdAt: '11.11.11'
    // },
    // {
    //   id: 2,
    //   text: '123456',
    //   photos: [],
    //   likes: [],
    //   createdAt: '11.11.11'
    // },
    // {
    //   id: 3,
    //   photos: ['~/assets/images/ricardo-loaiza-p0TX8uYHC5k-unsplash.jpg'],
    //   likes: [1],
    //   createdAt: '11.11.11'
    // },
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
    setModalAddPost: "modalStore/setModalAddPost",
  }),
  addPost() {
    this.setModalAddPost(true);
  }
},
watch: {
}
}
</script>

<style scoped>
.post-list {
  padding-top: 20px;
}
.list-title {
  font-size: 18px;
  font-weight: 400;
}
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.owner-container {
  padding: 10px;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.date {
  font-size: 12px;
  color: rgb(117, 117, 117);
  padding: 0 10px;
}
.image {
  margin-top: 10px;
  width: 100%;
  height: 100%;
}
.text {
  padding: 10px;
  padding-bottom: 0;
}
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.likes {
  margin: 10px;
}
</style>