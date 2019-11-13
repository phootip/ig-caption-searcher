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
        { name: 'Rump Baker', sport: 'Basketball', views: 231},
        { name: 'Brad Pitt', sport: 'Acting', views: 443},
        { name: 'Kermit the Frog', sport: 'Frogball', views: 403},
        { name: 'Taylor Swift', sport: 'Singing', views: 8843}
      ]
    }
  },
  computed: {
    getPlayers() {
      
      var players = this.players.filter((player) => {
          return player.name.toLowerCase().includes(this.filter.toLowerCase());
        });
      
      if (this.sort == 'views') {
        return players.sort(function(a, b) {
          return b.views - a.views
        });
      } else {
        return players;
      }
      
    }
  }
})
