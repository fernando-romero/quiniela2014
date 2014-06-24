this["JST"] = this["JST"] || {};

this["JST"]["app/templates/match.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h2>' +
((__t = ( snap.val().stage )) == null ? '' : __t) +
' - ' +
((__t = ( snap.val().loc_team + ' vs ' + snap.val().vis_team )) == null ? '' : __t) +
'</h2>\n<h2>Score: ' +
((__t = ( snap.val().loc_goals + ' - ' + snap.val().vis_goals )) == null ? '' : __t) +
'</h2>\n';
 if (snap.val().loc_pen & snap.val().vis_pen) { ;
__p += '\n<h2>Penalties: ' +
((__t = ( snap.val().loc_pen + ' - ' + snap.val().vis_pen )) == null ? '' : __t) +
'</h2>\n';
 };
__p += '\n<table class="table table-striped table-hover">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Name</th>\n\t\t\t<th>Loc team</th>\n\t\t\t<th>Vis team</th>\n\t\t\t<th>Loc goals</th>\n\t\t\t<th>Vis goals</th>\n\t\t\t<th>Loc pen</th>\n\t\t\t<th>Vis pen</th>\n\t\t\t<th>Points</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t';
 snap.child('forecasts').forEach(function(forecastSnap){ ;
__p += '\n\t\t<tr>\n\t\t\t<td><a href="#players/' +
((__t = ( forecastSnap.name() )) == null ? '' : __t) +
'">' +
((__t = ( forecastSnap.name() )) == null ? '' : __t) +
'</a></td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().loc_team )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().vis_team )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().loc_goals )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().vis_goals )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().loc_pen )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().vis_pen )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().points )) == null ? '' : __t) +
'</td>\n\t\t</tr>\n\t\t';
}) ;
__p += '\n\t</tbody>\n</table>\n\n';

}
return __p
};

this["JST"]["app/templates/matches.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<table class="table table-striped table-hover">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Number</th>\n\t\t\t<th>Stage</th>\n\t\t\t<th>Loc team</th>\n\t\t\t<th>Vis team</th>\n\t\t\t<th>Loc goals</th>\n\t\t\t<th>Vis goals</th>\n\t\t\t<th>Loc pen</th>\n\t\t\t<th>Vis pen</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t';
 snap.forEach(function(matchSnap){ ;
__p += '\n\t\t<tr>\n\t\t\t<td><a href="#matches/' +
((__t = ( matchSnap.name() )) == null ? '' : __t) +
'">' +
((__t = ( matchSnap.name() )) == null ? '' : __t) +
'</a></td>\n\t\t\t<td>' +
((__t = ( matchSnap.val().stage )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( matchSnap.val().loc_team )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( matchSnap.val().vis_team )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( matchSnap.val().loc_goals )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( matchSnap.val().vis_goals )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( matchSnap.val().loc_pen )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( matchSnap.val().vis_pen )) == null ? '' : __t) +
'</td>\n\t\t</tr>\n\t\t';
}) ;
__p += '\n\t</tbody>\n</table>\n\n';

}
return __p
};

this["JST"]["app/templates/player.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<h2>' +
((__t = ( snap.name() )) == null ? '' : __t) +
' - ' +
((__t = ( snap.val().points )) == null ? '' : __t) +
' points</h2>\n<table class="table table-striped table-hover">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Number</th>\n\t\t\t<th>Loc team</th>\n\t\t\t<th>Vis team</th>\n\t\t\t<th>Loc goals</th>\n\t\t\t<th>Vis goals</th>\n\t\t\t<th>Loc pen</th>\n\t\t\t<th>Vis pen</th>\n\t\t\t<th>Points</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t';
 snap.child('forecasts').forEach(function(forecastSnap){ ;
__p += '\n\t\t<tr>\n\t\t\t<td><a href="#matches/' +
((__t = ( forecastSnap.name() )) == null ? '' : __t) +
'">' +
((__t = ( forecastSnap.name() )) == null ? '' : __t) +
'</a></td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().loc_team )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().vis_team )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().loc_goals )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().vis_goals )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().loc_pen )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().vis_pen )) == null ? '' : __t) +
'</td>\n\t\t\t<td>' +
((__t = ( forecastSnap.val().points )) == null ? '' : __t) +
'</td>\n\t\t</tr>\n\t\t';
}) ;
__p += '\n\t</tbody>\n</table>\n';

}
return __p
};

this["JST"]["app/templates/players.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<table class="table table-striped table-hover">\n\t<thead>\n\t\t<tr>\n\t\t\t<th>Name</th>\n\t\t\t<th>Points</th>\n\t\t</tr>\n\t</thead>\n\t<tbody>\n\t\t';
 snap.forEach(function(playerSnap){ ;
__p += '\n\t\t<tr>\n\t\t\t<td><a href="#players/' +
((__t = ( playerSnap.name() )) == null ? '' : __t) +
'">' +
((__t = ( playerSnap.name() )) == null ? '' : __t) +
'</a></td>\n\t\t\t<td>' +
((__t = ( playerSnap.val().points )) == null ? '' : __t) +
'</td>\n\t\t</tr>\n\t\t';
}) ;
__p += '\n\t</tbody>\n</table>\n\n';

}
return __p
};
(function(){
  window.app = {
    Routers: {},
    Models: {},
    Collections: {},
    Views: {},
    FirebaseRef: new Firebase('https://quiniela2014.firebaseio.com')
  };
})();
app.Views.Match = Backbone.View.extend({

  template: JST['app/templates/match.html'],

  initialize: function(options){
    this.ref = app.FirebaseRef.child('matches/' + options.num);
    this.ref.on('value', this._onValue, this._onError, this);
  },

  _onError: function(err){
    console.log(err);
  },

  _onValue: function(snap){
    this.snap = snap;
    this.render();
  },

  render: function(){
    this.$el.html(this.template({ snap: this.snap }));
    return this;
  }

});
app.Views.Matches = Backbone.View.extend({

  template: JST['app/templates/matches.html'],

  initialize: function(){
    this.ref = app.FirebaseRef.child('matches');
    this.ref.on('value', this._onValue, this._onError, this);
  },

  _onError: function(err){
    console.log(err);
  },

  _onValue: function(snap){
    this.snap = snap;
    this.render();
  },

  render: function(){
    this.$el.html(this.template({ snap: this.snap }));
    return this;
  }

});
app.Views.Player = Backbone.View.extend({

  template: JST['app/templates/player.html'],

  initialize: function(options){
    this.ref = app.FirebaseRef.child('players/' + options.name);
    this.ref.on('value', this._onValue, this._onError, this);
  },

  _onError: function(err){
    console.log(err);
  },

  _onValue: function(snap){
    this.snap = snap;
    this.render();
  },

  render: function(){
    this.$el.html(this.template({ snap: this.snap }));
    return this;
  }

});
app.Views.Players = Backbone.View.extend({

  template: JST['app/templates/players.html'],

  initialize: function(){
    this.ref = app.FirebaseRef.child('players');
    this.ref.on('value', this._onValue, this._onError, this);
  },

  _onError: function(err){
    console.log(err);
  },

  _onValue: function(snap){
    this.snap = snap;
    this.render();
  },

  render: function(){
    this.$el.html(this.template({ snap: this.snap }));
    return this;
  }

});
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
