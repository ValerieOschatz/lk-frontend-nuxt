<template>
<v-menu activator="parent" location="start">
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
        type: 'modalEditMessage',
      },
      {
        title: 'Удалить',
        type: 'modalDelete',
      },
    ],
  }),
  props: {
    message: {
      type: Object,
      default: null
    }
  },
  methods: {
    ...mapMutations({
      setSelectedMessage: "messagesStore/setSelectedMessage",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
    }),
    setOption(type) {
      this.setSelectedMessage(this.message);
      this.setModal({ type, value: true, option: 'message' });
    }
  }
}
</script>
