var Firebase = require('firebase');
var XLSX = require('xlsx');
var fs = require('fs');
var _ = require('underscore')._;
var ref = new Firebase('https://quiniela2014.firebaseio.com');

String.prototype.endsWith = function(suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

ref.auth(process.env.FIREBASE_SECRET, function(err) {
  if (err) console.log("Login Failed!", err);
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
	saveGroupForecasts(sheet, name, 1, 4, 'D', 'F', 'C', 'G');
	saveGroupForecasts(sheet, name, 7, 11, 'D', 'F', 'C', 'G');
	saveGroupForecasts(sheet, name, 13, 18, 'D', 'F', 'C', 'G');
	saveGroupForecasts(sheet, name, 19, 25, 'D', 'F', 'C', 'G');
	saveGroupForecasts(sheet, name, 25, 4, 'U', 'W', 'T', 'X');
	saveGroupForecasts(sheet, name, 31, 11, 'U', 'W', 'T', 'X');
	saveGroupForecasts(sheet, name, 37, 18, 'U', 'W', 'T', 'X');
	saveGroupForecasts(sheet, name, 43, 25, 'U', 'W', 'T', 'X');
	savePlayoffForecasts(sheet, name, 49, 56, 34, 'O', 'Q', 'J', 'R', 'U', 'W');
	savePlayoffForecasts(sheet, name, 57, 60, 44, 'O', 'Q', 'J', 'R', 'U', 'W');
	savePlayoffForecasts(sheet, name, 61, 62, 50, 'O', 'Q', 'J', 'R', 'U', 'W');
	savePlayoffForecasts(sheet, name, 63, 63, 54, 'O', 'Q', 'J', 'R', 'U', 'W');
	savePlayoffForecasts(sheet, name, 64, 64, 57, 'O', 'Q', 'J', 'R', 'U', 'W');
	saveBonusForecasts(sheet, name);
}

saveGroupForecasts = function(sheet, name, numStart, rowStart, locGoalsCol, visGoalsCol,
	locTeamCol, visTeamCol) {
	var row = rowStart;
	for (var i = numStart; i <= numStart + 5; i++) {
		set('matches/' + i + '/forecasts/' + name + '/loc_goals', sheet[locGoalsCol + row].v);
		set('players/' + name + '/forecasts/' + i + '/loc_goals', sheet[locGoalsCol + row].v);
		set('matches/' + i + '/forecasts/' + name + '/vis_goals', sheet[visGoalsCol + row].v);
		set('players/' + name + '/forecasts/' + i + '/vis_goals', sheet[visGoalsCol + row].v);
		set('players/' + name + '/forecasts/' + i + '/loc_team', sheet[locTeamCol + row].v);
		set('players/' + name + '/forecasts/' + i + '/vis_team', sheet[visTeamCol + row].v);
		row++;
	};
};

savePlayoffForecasts = function(sheet, name, numStart, numEnd, rowStart, locGoalsCol, visGoalsCol,
	locTeamCol, visTeamCol, locPenCol, visPenCol) {
	var row = rowStart;
	for (var i = numStart; i <= numEnd; i++) {
		set('matches/' + i + '/forecasts/' + name + '/loc_goals', sheet[locGoalsCol + row].v);
		set('players/' + name + '/forecasts/' + i + '/loc_goals', sheet[locGoalsCol + row].v);
		set('matches/' + i + '/forecasts/' + name + '/vis_goals', sheet[visGoalsCol + row].v);
		set('players/' + name + '/forecasts/' + i + '/vis_goals', sheet[visGoalsCol + row].v);
		set('matches/' + i + '/forecasts/' + name + '/loc_team', sheet[locTeamCol + row].v);
		set('players/' + name + '/forecasts/' + i + '/loc_team', sheet[locTeamCol + row].v);
		set('matches/' + i + '/forecasts/' + name + '/vis_team', sheet[visTeamCol + row].v);
		set('players/' + name + '/forecasts/' + i + '/vis_team', sheet[visTeamCol + row].v);
		if (sheet[locPenCol + row]) {
			set('matches/' + i + '/forecasts/' + name + '/loc_pen', sheet[locPenCol + row].v);
			set('players/' + name + '/forecasts/' + i + '/loc_pen', sheet[locPenCol + row].v);
		}
		if (sheet[visPenCol + row]) {
			set('matches/' + i + '/forecasts/' + name + '/vis_pen', sheet[visPenCol + row].v);
			set('players/' + name + '/forecasts/' + i + '/vis_pen', sheet[visPenCol + row].v);
		}
		row++;
	};
};

saveBonusForecasts = function(sheet, name) {
	set('bonus/1/forecasts/' + name + '/team', sheet['O60'].v);
	set('players/' + name + '/bonus/1/team', sheet['O60'].v);
	set('bonus/2/forecasts/' + name+ '/team', sheet['O62'].v);
	set('players/' + name + '/bonus/2/team', sheet['O62'].v);
	set('bonus/3/forecasts/' + name+ '/team', sheet['O64'].v);
	set('players/' + name + '/bonus/3/team', sheet['O64'].v);
	set('bonus/4/forecasts/' + name+ '/team', sheet['O66'].v);
	set('players/' + name + '/bonus/4/team', sheet['O66'].v);
};

set = function(path, value) {
	ref.child(path).set(value, function(err) {
		if (err) console.log(err);
		console.log(path + ' <- ' + value);
	});
}
