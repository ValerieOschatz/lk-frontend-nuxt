<template>
  <div class="post-list">
    <div class="title-container">
      <h2 v-if="postList.length" class="list-title">Список постов:</h2>
      <h2 v-else class="list-title">Список постов пуст</h2>
      <v-btn
        v-if="owner"
        density="compact"
        icon="mdi-plus"
        @click="addPost"
      ></v-btn>
    </div>
    <ul class="list">
      <li v-for="post in postList" :key="post.id">
        <v-card elevation="4">
          <div class="owner-container">
            <span>{{ post.owner.name }}</span>
            <v-btn density="compact" icon="mdi-dots-vertical"></v-btn>
          </div>
          <span class="date">{{ convertDate(post.createdAt) }}</span>
          <img v-if="post.photo" :src="`http://localhost:3001/${post.photo}`" class="image" />
          <p v-if="post.text" class="text">{{ post.text }}</p>
          <div class="actions">
            <div class="likes">
              <v-btn v-if="getOwnLike(post)" density="compact" icon="mdi-heart"></v-btn>
              <v-btn v-else density="compact" icon="mdi-heart-outline"></v-btn>
              <span class="lokes-count">{{ post.likes.length }}</span>
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
    months: [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря'
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
    },
    userId: {
      type: String,
      default: '',
    }
  },
  computed: {
    ...mapGetters({
      postList: "postsStore/getPostList",
      profile: "profileStore/getProfile",
    }),
  },
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
      setPostList: "postsStore/setPostList",
    }),
    addPost() {
      this.setModal({ type: 'modalAddPost', value: true });
    },
    convertDate(value) {
      const date = new Date(value);
      return `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}г. ${date.getHours()}:${date.getMinutes()}`
    },
    getOwnLike(post) {
      return post.likes.includes(this.profile.id);
    }
  },
  watch: {
    userId() {
      this.setPostList({ owner: this.userId });
    }
  },
  mounted() {
    if (this.userId) this.setPostList({ owner: this.userId });
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
  display: flex;
  align-items: center;
}
.lokes-count {
  margin: 0 5px;
}
</style>