<template>
<v-menu>
  <template v-slot:activator="{ props }">
    <v-btn
      v-bind="props"  
      density="compact"
      icon="mdi-dots-vertical"
      color="#5C6BC0"
      variant="tonal"
    ></v-btn>
  </template>
  <v-list>
    <v-list-item
      v-for="(item, index) in items"
      :key="index"
      :value="index"
      @click="setOption(item.type)"
    >
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    items: [
      { 
        title: 'Редактировать',
        type: 'modalAddPost',
      },
      {
        title: 'Удалить',
        type: 'modalDelete',
      },
    ],
  }),
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  methods: {
    ...mapMutations({
      setSelectedPost: "postsStore/setSelectedPost",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
    }),
    setOption(type) {
      this.setSelectedPost(this.post);

      if (type === 'modalAddPost') {
        this.setModal({ type, value: true, option: 'update' });
      } else {
        this.setModal({ type, value: true, option: 'post' });
      }
    }
  }
}
</script>
