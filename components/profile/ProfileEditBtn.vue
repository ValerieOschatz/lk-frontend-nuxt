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
    >
      <v-list-item-title>{{ item.title }}</v-list-item-title>
    </v-list-item>
  </v-list>
</v-menu>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Изменить фото' },
        { title: 'Изменить данные профиля' },
        { title: 'Изменить настройки приватности' },
        { title: 'Изменить учетные данные' },
        { title: 'Выйти из профиля' },
      ],
    }),
  }
</script>
