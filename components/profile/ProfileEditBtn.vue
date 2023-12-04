<template>
<v-menu>
  <template v-slot:activator="{ props }">
    <v-btn
      v-bind="props"
      size="x-small"
      width="100%"
      color="#B388FF"
    >
      Управление профилем
    </v-btn>
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
import { mapActions } from "vuex";

export default {
  data: () => ({
    items: [
      {
        title: 'Изменить фото',
        type: 'modalEditProfilePhoto',
      },
      {
        title: 'Изменить данные профиля',
        type: '',
      },
      { 
        title: 'Изменить настройки приватности',
        type: '',
      },
      {
        title: 'Изменить учетные данные',
        type: '',
      },
      {
        title: 'Выйти из профиля',
        type: '',
      },
    ],
  }),
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
    }),
    setOption(type) {
      this.setModal({ type, value: true });
    }
  }
}
</script>
