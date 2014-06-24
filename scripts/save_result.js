var Firebase = require('firebase');
var ref = new Firebase('https://quiniela2014.firebaseio.com');

var num = parseInt(process.argv[2], 10);
var loc_goals = parseInt(process.argv[3], 10);
var vis_goals = parseInt(process.argv[4], 10);
var loc_team = process.argv[5] ? process.argv[5].replace('_', ' ') : undefined;
var vis_team = process.argv[6] ? process.argv[6].replace('_', ' ') : undefined;
var loc_pen = process.argv[7] ? parseInt(process.argv[7], 10) : undefined;
var vis_pen = process.argv[8] ? parseInt(process.argv[8], 10) : undefined;

ref.auth(process.env.FIREBASE_SECRET, function(err) {
  if(err) console.log("Login Failed!", err);
  else updateMatch();
});

updateMatch = function() {
	set('matches/' + num + '/loc_goals', loc_goals);
	set('matches/' + num + '/vis_goals', vis_goals);
	if (loc_team) set('matches/' + num + '/loc_team', loc_team);
	if (vis_team) set('matches/' + num + '/vis_team', vis_team);
	if (loc_pen) set('matches/' + num + '/loc_pen', loc_pen);
	if (vis_pen) set('matches/' + num + '/vis_pen', vis_pen);
}

set = function(path, value) {
	ref.child(path).set(value, function(err) {
		if (err) console.log(err);
		console.log(path + ' <- ' + value);
	});
}