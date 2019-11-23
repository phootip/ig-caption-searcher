<template>
  <div>
    <el-button @click="request_token">Login</el-button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    async request_token() {
      console.log("TODO: redirect");
      let client_id = "9163022522";
      let redirect_uri = "lvh.me:8080";
      window.location.href = `https://api.instagram.com/oauth/authorize/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=token`;
      // window.location.href = "https://example.com";
    }
  }
};
</script>
