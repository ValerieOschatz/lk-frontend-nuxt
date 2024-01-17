<template>
<v-menu>
  <template v-slot:activator="{ props }">
    <v-btn
      v-bind="props"
      size="small"
      width="100%"
      max-width="300px"
      color="#E57373"
    >
      Настройки
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
        type: 'modalEditPhoto',
      },
      {
        title: 'Изменить данные профиля',
        type: 'modalEditInfo',
      },
      { 
        title: 'Изменить настройки приватности',
        type: 'modalEditPrivatSettings',
      },
      {
        title: 'Выйти из профиля',
        type: 'modalLogout',
      },
    ],
  }),
  methods: {
    ...mapActions({
      setModal: "modalStore/setModal",
    }),
    setOption(type) {
      this.setModal({ type, value: true, option: 'profile' });
    }
  }
}
</script>
