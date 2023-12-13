<template>
  <div>
    <FormSearchUser />
    <UserList :userList="userList" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormSearchUser from "~/components/forms/FormSearchUser.vue";
import UserList from "~/components/users/UserList.vue"

export default {
  components: {
    FormSearchUser,
    UserList,
  },
  computed: {
    ...mapGetters({
      profile: "profileStore/getProfile",
      userList: "usersStore/getUserList",
    }),
  },
  methods: {
    ...mapActions({
      setUserList: "usersStore/setUserList",
    }),
  },
  watch: {
    profile() {
      this.setUserList({ subscribers: this.profile.id });
    }
  },
  mounted() {
    this.setUserList({ subscribers: this.profile.id });
  }
}
</script>
