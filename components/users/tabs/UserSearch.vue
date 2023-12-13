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
      userList: "usersStore/getUserList",
    }),
  },
}
</script>
