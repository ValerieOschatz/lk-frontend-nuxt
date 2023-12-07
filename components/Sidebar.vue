<template>
<v-navigation-drawer
  v-model="drawer"
  :rail="rail"
  permanent
  @click="rail = false"
>
  <v-list>
    <v-list-item
      :prepend-avatar="profile.photo && `http://localhost:3001/${profile.photo}`"
      :title="profile.name"
      nav
      height="60"
    >
      <template v-slot:append v-if="!rail">
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>
  </v-list>

  <v-divider></v-divider>

  <v-list density="compact" nav>
    <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
    <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
    <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
  </v-list>
</v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      drawer: true,
      rail: true,
    }
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
    }),
    isLarge() {
        return this.$vuetify.breakpoint.name !== 'sm'
    },
  }
}
</script>
