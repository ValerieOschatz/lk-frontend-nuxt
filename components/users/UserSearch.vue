<template>
<v-form
  class="mx-auto"
  ref="form"
>
  <v-card-text>
    <v-text-field
      density="compact"
      variant="solo"
      label="Введите имя"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      v-model="name"
      @input="onSearch()"
    ></v-text-field>
  </v-card-text>
</v-form>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: {
    tab: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    name: '',
  }),
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
    }),
  },
  methods: {
    ...mapMutations({
      setSearchedName: "profileStore/setSearchedName",
      setSubscriberName: "profileStore/setSubscriberName",
      setSubscriptionName: "profileStore/setSubscriptionName",
    }),
    ...mapActions({
      setUserList: "usersStore/setUserList",
      setSubscriberList: "usersStore/setSubscriberList",
      setSubscriptionList: "usersStore/setSubscriptionList",
    }),
    onSearch() {
      if (this.tab === 1) {
        this.setSubscriptionName(this.name);
        this.setSubscriptionList({ name: this.name, subscriptions: this.profile.id });
      } else if (this.tab === 2) {
        this.setSubscriberName(this.name);
        this.setSubscriberList({ name: this.name, subscribers: this.profile.id });
      } else if (this.tab === 3) {
        this.setSearchedName(this.name);
        this.setUserList({ name: this.name });
      }
    }
  },
}
</script>
