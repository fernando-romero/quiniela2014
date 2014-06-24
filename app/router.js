app.vent = new Backbone.Model();

app.Routers.Main = Backbone.Router.extend({

	routes: {
    '': 'players',
    'players': 'players',
    'players/:name': 'player',
    'matches': 'matches',
    'matches/:num': 'match'
  },

  prepare: function() {
  	if (this.view) this.view.remove();
  	$('div#app').html('<div class="container app_content"></div>');
  },

  players: function(){
  	this.prepare();
  	this.view = new app.Views.Players({ el: 'div.app_content' });
  },

  player: function(name) {
  	this.prepare();
  	this.view = new app.Views.Player({ el: 'div.app_content', name: name });
  },

  matches: function(){
  	this.prepare();
  	this.view = new app.Views.Matches({ el: 'div.app_content' });
  },

  match: function(num) {
  	this.prepare();
  	this.view = new app.Views.Match({ el: 'div.app_content', num: num });
  }

});

new app.Routers.Main();
Backbone.history.start();
