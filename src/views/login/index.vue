<template>
  <div>login</div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    this.handleLogin();
  },
  methods: {
    handleLogin() {
      this.$store
        .dispatch("app/signIn", {
          account: "account",
          password: "password"
        })
        .then(() => {
          this.$router.push({
            path: this.redirect || "/",
            query: this.otherQuery
          });
        });
    }
  }
};
</script>

<style></style>
