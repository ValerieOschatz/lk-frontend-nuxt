<template>
<v-menu>
  <template v-slot:activator="{ props }">
    <v-btn
      v-bind="props"  
      density="compact"
      icon="mdi-dots-vertical"
      color="#EA80FC"
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
        type: 'modalAddComment',
      },
      {
        title: 'Удалить',
        type: 'modalDeleteComment',
      },
    ],
  }),
  props: {
    comment: {
      type: Object,
      default: null
    }
  },
  methods: {
    ...mapMutations({
      setSelectedComment: "commentsStore/setSelectedComment",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
    }),
    setOption(type) {
      this.setSelectedComment(this.comment);

      if (type === 'modalAddComment') {
        this.setModal({ type, value: true, option: 'update' });
      }
      this.setModal({ type, value: true });
    }
  }
}
</script>
