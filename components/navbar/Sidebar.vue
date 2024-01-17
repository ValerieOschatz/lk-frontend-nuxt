<template>
<v-navigation-drawer
  v-model="drawer"
  :rail="rail"
  permanent
  class="bg-lime-lighten-5"
  @click="rail = false"
>
  <v-list>
    <v-list-item
      :prepend-avatar="profile.photo ? `http://localhost:3001/${profile.photo}` : '/image2.jpg'"
      :title="profile.name"
      nav
      height="60"
    >
      <template v-slot:append v-if="!rail">
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          color="#DD2C00"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>
  </v-list>

  <v-divider></v-divider>

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
</template>

<script>
import { mapGetters } from "vuex";
import { routes } from "~/utils/navigation";

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
    })
  }
}
</script>
