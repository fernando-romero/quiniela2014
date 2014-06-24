var Firebase = require('firebase');
var XLSX = require('xlsx');
var fs = require('fs');
var _ = require('underscore')._;
var ref = new Firebase('https://quiniela2014.firebaseio.com');

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

ref.auth(process.env.FIREBASE_SECRET, function(err) {
  if(err) console.log("Login Failed!", err);
  else readFiles();
});

readFiles = function() {
	fs.readdir('../submissions', function(err, files) {
		if (err) console.log(err);
		if (files) _.each(files, function(file) {
			if (file.endsWith('.xlsx')) proccessFile(file);
		});
	});
};

proccessFile = function(file) {
	console.log('===' + file + ' ===');
	var sheet = XLSX.readFile('../submissions/' + file).Sheets['Mundial 2014'];
	var name = file.split('.xlsx')[0];
	saveGroupForecasts(sheet, name, 1, 4, 'D', 'F');
	saveGroupForecasts(sheet, name, 7, 11, 'D', 'F');
	saveGroupForecasts(sheet, name, 13, 18, 'D', 'F');
	saveGroupForecasts(sheet, name, 19, 25, 'D', 'F');
	saveGroupForecasts(sheet, name, 25, 4, 'U', 'W');
	saveGroupForecasts(sheet, name, 31, 11, 'U', 'W');
	saveGroupForecasts(sheet, name, 37, 18, 'U', 'W');
	saveGroupForecasts(sheet, name, 43, 25, 'U', 'W');
	savePlayoffForecasts(sheet, name, 49, 56, 34, 'O', 'Q', 'J', 'R', 'U', 'W');
	savePlayoffForecasts(sheet, name, 57, 60, 44, 'O', 'Q', 'J', 'R', 'U', 'W');
	savePlayoffForecasts(sheet, name, 61, 62, 50, 'O', 'Q', 'J', 'R', 'U', 'W');
	savePlayoffForecasts(sheet, name, 63, 63, 54, 'O', 'Q', 'J', 'R', 'U', 'W');
	savePlayoffForecasts(sheet, name, 64, 64, 57, 'O', 'Q', 'J', 'R', 'U', 'W');
}

saveGroupForecasts = function(sheet, name, numStart, rowStart, locGoalsCol, visGoalsCol) {
	var row = rowStart;
	for (var i = numStart; i <= numStart + 5; i++) {
		ref.child('matches/' + i + '/forecasts/' + name + '/loc_goals').set(sheet[locGoalsCol + row].v);
		ref.child('players/' + name + '/forecasts/' + i + '/loc_goals').set(sheet[locGoalsCol + row].v);
		ref.child('matches/' + i + '/forecasts/' + name + '/vis_goals').set(sheet[visGoalsCol + row].v);
		ref.child('players/' + name + '/forecasts/' + i + '/vis_goals').set(sheet[visGoalsCol + row].v);
		row++;
	};
};

savePlayoffForecasts = function(sheet, name, numStart, numEnd, rowStart, locGoalsCol, visGoalsCol,
	locTeamCol, visTeamCol, locPenCol, visPenCol) {
	var row = rowStart;
	for (var i = numStart; i <= numEnd; i++) {
		ref.child('matches/' + i + '/forecasts/' + name + '/loc_goals').set(sheet[locGoalsCol + row].v);
		ref.child('players/' + name + '/forecasts/' + i + '/loc_goals').set(sheet[locGoalsCol + row].v);
		ref.child('matches/' + i + '/forecasts/' + name + '/vis_goals').set(sheet[visGoalsCol + row].v);
		ref.child('players/' + name + '/forecasts/' + i + '/vis_goals').set(sheet[visGoalsCol + row].v);
		ref.child('matches/' + i + '/forecasts/' + name + '/loc_team').set(sheet[locTeamCol + row].v);
		ref.child('players/' + name + '/forecasts/' + i + '/loc_team').set(sheet[locTeamCol + row].v);
		ref.child('matches/' + i + '/forecasts/' + name + '/vis_team').set(sheet[visTeamCol + row].v);
		ref.child('players/' + name + '/forecasts/' + i + '/vis_team').set(sheet[visTeamCol + row].v);
		if (sheet[locPenCol + row]) {
			ref.child('matches/' + i + '/forecasts/' + name + '/loc_pen').set(sheet[locPenCol + row].v);
			ref.child('players/' + name + '/forecasts/' + i + '/loc_pen').set(sheet[locPenCol + row].v);
		}
		if (sheet[visPenCol + row]) {
			ref.child('matches/' + i + '/forecasts/' + name + '/vis_pen').set(sheet[visPenCol + row].v);
			ref.child('players/' + name + '/forecasts/' + i + '/vis_pen').set(sheet[visPenCol + row].v);
		}
		row++;
	};
};