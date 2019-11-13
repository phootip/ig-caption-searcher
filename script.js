// Thanks Dev Coffee! :) 
// https://www.youtube.com/watch?v=VPUdtEf3oXI
new Vue({
  el: '#app',
  data: function() {
    return { 
      filter: '',
      sort: '',
      options: [
        { label: 'Default', value: 'none' },
        { label: 'Most Viewed', value: 'views' },
      ],
      players: [
        { name: 'Charles Wilson', sport: 'Baseball', views: 312},
        { name: 'Tony Domo', sport: 'Football', views: 23121 },
      ],
      items: [],
      username: 'sunsetwithbubbles',
    }
  },
  computed: {
    getItems() {
      var items = this.items.filter((item) => {
        return item.caption.toLowerCase().includes(this.filter.toLowerCase());
      });
    
      return items
    }
  },
  methods: {
    async publicFetch () {
      console.log("start publicFetch...")
      try {
        this.items = await resolveItems(this.username, this.item)
        console.log(this.items)
      } catch (e) {
        console.error('Fetching Instagram photos failed', e)
      }
      console.log("end publicFetch")
    }
  }
})
