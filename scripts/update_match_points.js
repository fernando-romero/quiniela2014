var Firebase = require('firebase');
var ref = new Firebase('https://quiniela2014.firebaseio.com');

ref.auth(process.env.FIREBASE_SECRET, function(err) {
  if(err) console.log("Login Failed!", err);
  else updateMatchPoints();
});

getResultPoints = function(num) {
	if (num <= 48) return 3;
	else if (num >= 49 && num <= 56) return 6;
	else if ((num >= 57 && num <= 60) || num == 63) return 9;
	else if (num >= 61 && num <= 62) return 12;
	else return 15;
}

getScorePoints = function(num) {
	if (num <= 48) return 2;
	else if (num >= 49 && num <= 56) return 4;
	else if ((num >= 57 && num <= 60) || num == 63) return 6;
	else if (num >= 61 && num <= 62) return 8;
	else return 10;
}

gotResultRight = function(loc_goals, vis_goals, f_loc_goals, f_vis_goals) {
	return (
		(loc_goals > vis_goals && f_loc_goals > f_vis_goals) ||
		(loc_goals < vis_goals && f_loc_goals < f_vis_goals) ||
		(loc_goals == vis_goals && f_loc_goals == f_vis_goals)
		);
}

updateMatchPoints = function() {
	ref.child('matches').once('value', function(matchesSnap) {
		matchesSnap.forEach(function(matchSnap) {
			var num = parseInt(matchSnap.name(), 10);
			var loc_goals = parseInt(matchSnap.val().loc_goals, 10);
			var vis_goals = parseInt(matchSnap.val().vis_goals, 10);
			var loc_team = matchSnap.val().loc_team;
			var vis_team = matchSnap.val().vis_team;
			var loc_pen = matchSnap.val().loc_pen ? parseInt(matchSnap.val().loc_pen, 10) : undefined;
			var vis_pen = matchSnap.val().vis_pen ? parseInt(matchSnap.val().vis_pen, 10) : undefined;
			var resultPoints = getResultPoints(num);
			var scorePoints = getScorePoints(num);

			matchSnap.child('forecasts').forEach(function(forecastSnap){
				var points = 0;
				var name = forecastSnap.name();
				var f_loc_goals = parseInt(forecastSnap.val().loc_goals, 10);
				var f_vis_goals = parseInt(forecastSnap.val().vis_goals, 10);
				var f_loc_team = forecastSnap.val().loc_team;
				var f_vis_team = forecastSnap.val().vis_team;
				var f_loc_pen = forecastSnap.val().loc_pen ? parseInt(forecastSnap.val().loc_pen, 10) : undefined;
				var f_vis_pen = forecastSnap.val().vis_pen ? parseInt(forecastSnap.val().vis_pen, 10) : undefined;

				if ((loc_team == f_loc_team && vis_team == f_vis_team) || num <= 48) {
					if (gotResultRight(loc_goals, vis_goals, f_loc_goals, f_vis_goals)) {
						points += resultPoints;
						if (loc_goals == f_loc_goals && vis_goals == f_vis_goals)
							points += scorePoints;
					}
				}

				set('matches/' + num + '/forecasts/' + name + '/points', points);
				set('players/' + name + '/forecasts/' + num + '/points', points);
			});

		});
	});
};

set = function(path, value) {
	ref.child(path).set(value, function(err) {
		if (err) console.log(err);
		console.log(path + ' <- ' + value);
	});
}