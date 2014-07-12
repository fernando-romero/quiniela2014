var Firebase = require('firebase');
var ref = new Firebase('https://quiniela2014.firebaseio.com');

ref.auth(process.env.FIREBASE_SECRET, function(err) {
  if(err) console.log("Login Failed!", err);
  else updatePlayerPoints();
});

updatePlayerPoints = function() {
	ref.child('players').once('value', function(playersSnap) {
		playersSnap.forEach(function(playerSnap) {
			var points = 0;
			playerSnap.child('forecasts').forEach(function(forecastSnap) {
				points += forecastSnap.val().points || 0;
			});
			playerSnap.child('bonus').forEach(function(bonusSnap) {
				points += bonusSnap.val().points || 0;
			});
			set('players/' + playerSnap.name() + '/points', points);
			ref.child('players/' + playerSnap.name()).setPriority(1.0 / (1.0 + points));
		});
	});
};

set = function(path, value) {
	ref.child(path).set(value, function(err) {
		if (err) console.log(err);
		console.log(path + ' <- ' + value);
	});
}