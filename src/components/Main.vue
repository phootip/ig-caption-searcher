<template>
  <div class="container">
    <el-row class="search-wrapper" :gutter="10">
      <el-row>
        <el-col :lg="12" :md="12" :sm="12" :xs="20">
          <el-input
            placeholder="Enter Your Instagram ID"
            icon="search"
            value="sunsetwithbubbles"
            v-model="username"
          />
        </el-col>

        <el-col class="col-space" :lg="6" :md="6" :sm="6" :xs="24">&nbsp;</el-col>

        <el-col :lg="6" :md="6" :sm="6" :xs="4">
          <el-button @click="fetchData">Fetch Data</el-button>
        </el-col>
      </el-row>

      <el-row>
        <el-col :lg="12" :md="12" :sm="12" :xs="24">
          <el-input placeholder="Filter by Name" icon="search" v-model="filter" />
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
        <el-row
          v-if="preview"
          class="box"
          style="cursor: pointer;"
          @click.native="redirect(item.url)"
        >
          <el-col class="box-item" :lg="6" :md="6" :sm="6" :xs="6">
            <img :src="item.thumbnailUrl" class="thumpnail" />
          </el-col>
          <el-col :lg="18" :md="18" :sm="18" :xs="18">
            <div>{{ item.caption }}</div>
          </el-col>
        </el-row>

        <el-row v-else class="box" style="cursor: pointer;" @click.native="redirect(item.url)">
          <el-col :lg="24" :md="24" :sm="24" :xs="24">
            <div>{{ item.caption }}</div>
          </el-col>
        </el-row>
      </el-col>

      <el-col v-if="getItems.length === 0" :xs="24" :sm="24" :md="24">
        <div class="box box__empty">No Match Found</div>
      </el-col>
    </el-row>
    <!-- results -->
  </div>
  <!-- container -->
</template>

<script>
import { resolveItems } from "./resolve.js";

export default {
  name: "Main",
  props: {
    msg: String
  },
  components: {},
  data: function() {
    return {
      filter: "",
      sort: "",
      preview: false,
      options: [
        { label: "Default", value: "none" },
        { label: "Most Viewed", value: "views" }
      ],
      items: [],
      username: "sunsetwithbubbles"
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
    async fetchData() {
      console.info("start publicFetch...");
      try {
        this.items = await resolveItems(this.username, this.item);
        console.info(this.items.length);
      } catch (e) {
        console.error("Fetching Instagram photos failed", e);
      }
      console.info("end publicFetch");
    },
    redirect(url) {
      window.location.href = url;
    }
  },
  mounted() {
    var text =
      '[{"url":"https://www.instagram.com/p/B4xaHiQlAzE/","thumbnailUrl":"https://instagram.fbkk22-1.fna.fbcdn.net/vp/cbca723428f047ae633270456bab0593/5E530FAF/t51.2885-15/sh0.08/e35/s640x640/73239271_142248787108510_1952846645581972998_n.jpg?_nc_ht=instagram.fbkk22-1.fna.fbcdn.net&_nc_cat=110","caption":"Viking Line Ferry to Stockholm passing through the narrow Kustaanmiekka Strait.\\n\\n#vikingline #kustaanmiekka #suomenlinna #vallisaari #kuninkaansaari #thisisfinland #thebestoffinland #helsinki #finland #scandinavia #myhelsinki #nature #visithelsinki #visitfinland #helsinkiarchipelago #ferry #cruiseship #strait"},{"url":"https://www.instagram.com/p/B4u7HzeFWoj/","thumbnailUrl":"https://instagram.fbkk22-1.fna.fbcdn.net/vp/a0cf0967194314c1d85720c688c7b3f3/5E484860/t51.2885-15/sh0.08/e35/s640x640/71730166_956044551449026_6815976845732364733_n.jpg?_nc_ht=instagram.fbkk22-1.fna.fbcdn.net&_nc_cat=110","caption":"Does it sound good to stay a night in a tree camp at the old military island which has been closed for the public until the year 2016? At Vallisaari in Finland, this is possible.\\n\\nCheck out our latest blog post for more information: https://sunsetwithbubbles.com/vallisaari\\n\\n#tentsile #vallisaari #kuninkaansaari #tentsilecamp #tentsileexperience #treetent #ecocamp #tent #camping #thisisfinland #thebestoffinland #helsinki #finland #scandinavia #myhelsinki #nature #visithelsinki #visitfinland #outdoors #helsinkiarchipelago"},{"url":"https://www.instagram.com/p/B4jzRutFXbT/","thumbnailUrl":"https://instagram.fbkk22-2.fna.fbcdn.net/vp/84d27a312b43d3c206fc3f9ae85e30b8/5E521AB7/t51.2885-15/sh0.08/e35/s640x640/73288872_704951353346378_1932010000177081148_n.jpg?_nc_ht=instagram.fbkk22-2.fna.fbcdn.net&_nc_cat=102","caption":"Another Ponte de Dom Luís I bridge view from Escadas dos Guindais.\\n\\n#escadasdosguindais #pontededomluis #douro #douroriver #porto #oporto #portolovers #amar_porto #portugal #visitporto #visitportugal #exploringportugal #travelportugal  #traveleurope #instatravel #instatraveller #igtravel  #thisisportugal #travelphotography #loves_portugal #iamtb #besteurope #visiteurope #travellingthroughtheworld #bestplacestogo #wonderful_places #raw_portugal #super_portugal #sunsetwithbubbles"},{"url":"https://www.instagram.com/p/B4iEVOVlysB/","thumbnailUrl":"https://instagram.fbkk22-2.fna.fbcdn.net/vp/ebb2202635ec37d7b72bf354a201e880/5E8C637A/t51.2885-15/sh0.08/e35/c0.135.1080.1080a/s640x640/71704828_171252204064795_8260761020905651358_n.jpg?_nc_ht=instagram.fbkk22-2.fna.fbcdn.net&_nc_cat=107","caption":"Sparkling Wine Time.\\n\\n#portaldacalçada #sparklingwine #wine #winelover #espumante #douro #douroriver #porto #oporto #portolovers #amar_porto #portugal #visitporto #visitportugal #exploringportugal #travelportugal  #traveleurope #instatravel #igtravel  #thisisportugal #travelphotography #loves_portugal #iamtb #besteurope #visiteurope #travellingthroughtheworld #raw_portugal #super_portugal #sunsetwithbubbles"},{"url":"https://www.instagram.com/p/B4fad6OlCMc/","thumbnailUrl":"https://instagram.fbkk22-2.fna.fbcdn.net/vp/7079708cef7a3f14803a43ffd41d7c62/5E564459/t51.2885-15/sh0.08/e35/s640x640/74659553_185629275937951_9060468014706481708_n.jpg?_nc_ht=instagram.fbkk22-2.fna.fbcdn.net&_nc_cat=107","caption":"Ribeira district and Ponte de Dom Luís I Bridge.\\n\\n#ribeira #ribeiraporto #pontededomluis #douro #douroriver #porto #oporto #portolovers #amar_porto #portugal #visitporto #visitportugal #exploringportugal #travelportugal #traveleurope #instatravel #igtravel #thisisportugal #travelphotography #loves_portugal #iamtb #besteurope #visiteurope #travellingthroughtheworld #bestplacestogo #raw_portugal #super_portugal #traveltheworld #travelgram #sunsetwithbubbles"},{"url":"https://www.instagram.com/p/B4cwo4UFVMi/","thumbnailUrl":"https://instagram.fbkk22-1.fna.fbcdn.net/vp/d5e32f2d26e9cb650fa49778d61c8eb8/5E8B6E22/t51.2885-15/sh0.08/e35/s640x640/72777585_427807541252260_1495412556463283043_n.jpg?_nc_ht=instagram.fbkk22-1.fna.fbcdn.net&_nc_cat=104","caption":"View of the Douro River from behind the Calem Port Wine cellar.\\n\\n#douro #douroriver #calem #vilanovadegaia #porto \\n#oporto #portolovers #amar_porto #portugal #visitporto #visitportugal #exploringportugal #travelportugal  #traveleurope #instatravel #igtravel  #thisisportugal #travelphotography #loves_portugal #iamtb #besteurope #visiteurope #travellingthroughtheworld #bestplacestogo #wonderful_places #raw_portugal #super_portugal #sunsetwithbubbles"},{"url":"https://www.instagram.com/p/B4ZjQXxFUfk/","thumbnailUrl":"https://instagram.fbkk22-1.fna.fbcdn.net/vp/22a91bee09627a08f582e5598dbf2696/5E674779/t51.2885-15/sh0.08/e35/s640x640/75243113_507587530089608_824323881518137724_n.jpg?_nc_ht=instagram.fbkk22-1.fna.fbcdn.net&_nc_cat=108","caption":"Sunset over Douro River viewed from the viewpoint Miradouro da Serra do Pilar.\\n\\n#sunset #sunsets #sunset_pics #sunsetlovers #douro #douroriver #porto #oporto #portolovers #amar_porto #portugal #visitporto #visitportugal #exploringportugal #travelportugal #traveleurope #instatravel #igtravel #thisisportugal #travelphotography #loves_portugal #iamtb #besteurope #visiteurope #travellingthroughtheworld #bestplacestogo #wonderful_places #raw_portugal #super_portugal #sunsetwithbubbles"},{"url":"https://www.instagram.com/p/B4XRyFqldYr/","thumbnailUrl":"https://instagram.fbkk22-1.fna.fbcdn.net/vp/c65b00973e16e5d28d4e03a510c4fd5e/5E686935/t51.2885-15/sh0.08/e35/s640x640/72488116_549019972528729_7772659263582030924_n.jpg?_nc_ht=instagram.fbkk22-1.fna.fbcdn.net&_nc_cat=101","caption":"Felgueiras Lighthouse at Foz do Douro.\\n\\n#fozdodouro #felgueiraslighthouse #porto #oporto #lighthouse #portolovers #amar_porto #portugal #visitporto #visitportugal #exploringportugal #exploreportugal #travelportugal #traveleurope #instatravel #igtravel #thisisportugal #travel #travelphotography #loves_portugal #iamtb #besteurope #visiteurope #travellingthroughtheworld #bestplacestogo #wonderful_places #raw_portugal #super_portugal #sunsetwithbubbles"}]';
    this.items = JSON.parse(text);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
