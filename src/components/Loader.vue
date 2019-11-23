<template>
  <div>
    <ICountUp :delay="delay" :endVal="loaded" :options="{}" ref="counter" />
    / {{total}}
    <el-button @click="fetchInstagramPhotos(username)">Fetch Captions</el-button>
  </div>
</template>

<script>
import axios from "axios";
import ICountUp from "vue-countup-v2";
export default {
  name: "Loader",
  components: {
    ICountUp
  },
  props: {
    username: String
  },
  data: () => {
    return {
      total: 0,
      loaded: 0,
      delay: 0
    };
  },
  methods: {
    changeLoaded() {
      this.loaded = 15;
    },
    async fetchInstagramPhotos(username) {
      this.loaded = 0;
      this.total = 0;
      this.$refs.counter.reset();
      this.$emit("updateItems", []);
      const accountUrl = `https://www.instagram.com/${username}/`;
      const response = await axios.get(accountUrl);
      const data = response.data.match(instagramRegExp)[1];
      const json = JSON.parse(data.slice(0, -1));
      // const edges =
      //   json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media
      //     .edges;
      const user_id = json.entry_data.ProfilePage[0].graphql.user.id;
      const is_private = json.entry_data.ProfilePage[0].graphql.user.is_private;
      console.log("is_private", is_private);
      this.total =
        json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.count;
      const count = 50;

      let page_info = {
        has_next_page: true,
        end_cursor: ""
      };
      let photos = [];
      while (page_info.has_next_page) {
        const graphql = `https://www.instagram.com/graphql/query/?variables=%7B%22id%22%3A%22${user_id}%22%2C%22first%22%3A${count}%2C%22after%22%3A%22${page_info.end_cursor}%22%7D&query_id=17888483320059182`;
        const response_graph = await axios.get(graphql);
        let edges_graph =
          response_graph.data.data.user.edge_owner_to_timeline_media.edges;
        page_info =
          response_graph.data.data.user.edge_owner_to_timeline_media.page_info;
        console.log(page_info);
        photos = photos.concat(
          edges_graph.map(({ node }) => {
            if (node.edge_media_to_caption.edges[0] === undefined) {
              node.edge_media_to_caption.edges[0] = { node: { text: " " } };
            }
            return {
              url: `https://www.instagram.com/p/${node.shortcode}/`,
              thumbnailUrl: node.thumbnail_src,
              caption: node.edge_media_to_caption.edges[0].node.text
            };
          })
        );
        this.loaded = photos.length;
      }
      this.$emit("updateItems", photos);
      return;
    }
  }
};

const instagramRegExp = new RegExp(
  /<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
);
</script>
