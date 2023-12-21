<template>
<v-menu>
  <template v-slot:activator="{ props }">
    <v-btn
      v-bind="props"  
      variant="text"
      density="compact"
      icon="mdi-dots-vertical"
      color="#E57373"
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
        title: 'Удалить',
        type: 'modalDelete',
      },
    ],
  }),
  props: {
    chat: {
      type: Object,
      default: null
    }
  },
  methods: {
    ...mapMutations({
      setSelectedChat: "chatsStore/setSelectedChat",
    }),
    ...mapActions({
      setModal: "modalStore/setModal",
    }),
    setOption(type) {
      this.setSelectedChat(this.chat);
      this.setModal({ type, value: true, option: 'chat' });
    }
  }
}
</script>
