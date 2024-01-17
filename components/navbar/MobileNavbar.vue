<template>
<div>
  <v-app-bar
      color="lime-lighten-5"
      prominent
      :elevation="1"
      density="compact"
    >
      <v-app-bar-nav-icon
        variant="text"
        color="#DD2C00"
        @click.stop="drawer = !drawer">
      </v-app-bar-nav-icon>

      <v-toolbar-title>{{ profile.name }}</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="top"
      temporary
    >
      <v-list density="compact" nav>
        <v-list-item
          v-for="(route, index) in routes"
          :key="index"
          link
          :to="route.link"
          :prepend-icon="route.icon"
          :title="route.name"
          color="#DD2C00"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
import { mapGetters } from "vuex";
import { routes } from "~/utils/navigation";

export default {
  data: () => ({
    drawer: false,
  }),
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
    })
  },
}
</script>
