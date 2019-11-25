<template>
  <div class="container">
    <el-row class="search-wrapper" :gutter="10">
      <el-row style="margin-bottom:10px">
        <el-col :lg="12" :md="12" :sm="12" :xs="20">
          <el-input placeholder="Enter Instagram ID" icon="search" v-model="username" />
        </el-col>

        <el-col class="col-space" :lg="6" :md="6" :sm="6" :xs="24">&nbsp;</el-col>

        <el-col :lg="6" :md="6" :sm="6" :xs="4">
          <Loader
            :username="username"
            v-on:updateItems="updateItems"
            @private_account="updatePrivate"
            @notFound="notFound"
          />
        </el-col>
      </el-row>

      <el-row>
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-input placeholder="Search Captions" icon="search" v-model="filter" />
        </el-col>

        <el-col class="col-space" :lg="6" :md="6" :sm="6" :xs="24">&nbsp;</el-col>

        <el-col :lg="6" :md="6" :sm="6" :xs="24">
          <el-checkbox v-model="preview" border>Show Image</el-checkbox>
        </el-col>
      </el-row>
    </el-row>
    <!-- search wrapper -->

    <el-row :gutter="10">
      <el-col v-for="item in getItems" :key="item.thumbnailUrl">
        <a :href="item.url" style="text-decoration:none !important">
          <el-row v-if="preview" class="box">
            <el-col class="box-item" :lg="6" :md="6" :sm="6" :xs="6">
              <img :src="item.thumbnailUrl" class="thumpnail" />
            </el-col>
            <el-col :lg="18" :md="18" :sm="18" :xs="18">
              <div>{{ item.caption }}</div>
            </el-col>
          </el-row>

          <el-row v-else class="box">
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <div>{{ item.caption }}</div>
            </el-col>
          </el-row>
        </a>
      </el-col>

      <el-col v-if="getItems.length === 0" :xs="24" :sm="24" :md="24">
        <div v-if="empty">Fetch some captions or try 'facebook'</div>
        <div v-else-if="items.length === 0">
          <i class="el-icon-loading" style="margin-right:10px"></i>Loading...
        </div>
        <div v-else class="box box__empty">No Match Found</div>
      </el-col>
    </el-row>
    <!-- results -->
  </div>
  <!-- container -->
</template>

<script>
import Loader from "./Loader";

export default {
  name: "Table",
  props: {
    msg: String
  },
  components: {
    Loader
  },
  data: function() {
    return {
      filter: "",
      preview: false,
      options: [
        { label: "Default", value: "none" },
        { label: "Most Viewed", value: "views" }
      ],
      items: [],
      username: "",
      empty: true
    };
  },
  computed: {
    getItems() {
      var items = this.items.filter(item => {
        return item.caption.toLowerCase().includes(this.filter.toLowerCase());
      });

      return items;
    }
  },
  methods: {
    updateItems(value) {
      this.items = value;
      this.empty = false;
    },
    updatePrivate() {
      this.$message.error(
        "The account is private, you have to public your account"
      );
      this.empty = true;
    },
    notFound(status) {
      this.$message.error("Account not founded: " + status);
      this.empty = true;
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
.el-message--error {
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: red;
  max-height: 100%;
}
.el-message__icon {
  display: none;
}
</style>
