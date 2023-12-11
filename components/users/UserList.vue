<template>
<v-list
  item-props
  lines="three"
>
  <v-list-item
    v-for="user in userList"
    :key="user._id"
    :prepend-avatar="user.photo ? `http://localhost:3001/${user.photo}` : ''"
    :title="user.name"
    nav
    height="60"
  >
    <template v-slot:append v-if="!rail">
      <v-btn
        variant="text"
        icon="mdi-chevron-left"
        color="#E57373"
      ></v-btn>
    </template>
  </v-list-item>
</v-list>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
  }),
  computed: {
    ...mapGetters({
      userList: "usersStore/getUserList",
    }),
  },
  methods: {
    ...mapActions({
      setUserList: "usersStore/setUserList",
    })
  },
}
</script>
