<template>
  <div>
    <el-row class="container" style="margin-bottom:0px">
      <a href="https://github.com/phootip/ig-caption-searcher">
        <img
          :src="`${publicPath}GitHub-Mark-64px.png`"
          style="height:30px;margin-left:auto;display:block"
        />
      </a>
    </el-row>
    <el-row class="header">
      <a href="https://github.com/phootip/ig-caption-searcher">
        <img class="middle" :src="`${publicPath}Logo.png`" />
      </a>
    </el-row>
    <el-row class="container a">
      <p>Have you ever wondered "Have I already used this caption before?"</p>
      <p>No more duplicated captions, Try Instagram Caption Searcher!</p>
    </el-row>
    <Table />
  </div>
</template>

<script>
import Table from "./Table";
import fetch from "node-fetch";

export default {
  name: "Main",
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  },
  components: {
    Table
  },
  mounted() {
    console.log("mounted!");
    console.log(process.env.VUE_APP_VISITS);
    fetch(process.env.VUE_APP_VISITS);
  }
};
</script>

<style>
.middle {
  display: block;
  margin: auto;
  text-align: center;
  max-height: 300px;
}
.header {
  background-size: cover;
}
.a {
  text-align: center;
  display: block;
  color: gray;
  margin-bottom: 30px;
}
</style>
