var Firebase = require('firebase');
var XLSX = require('xlsx');
var fs = require('fs');
var _ = require('underscore')._;
var ref = new Firebase('https://quiniela2014.firebaseio.com');
var workbook = XLSX.readFile('../submissions/Fernando_Romero.xlsx');
var sheet = workbook.Sheets['Mundial 2014'];

ref.auth(process.env.FIREBASE_SECRET, function(err) {
  if(err) console.log("Login failed: " + err);
  else init();
});

init = function() {
	saveGroup('Grupo A', 1, 4, 'C', 'G');
	saveGroup('Grupo B', 7, 11, 'C', 'G');
	saveGroup('Grupo C', 13, 18, 'C', 'G');
	saveGroup('Grupo D', 19, 25, 'C', 'G');
	saveGroup('Grupo E', 25, 4, 'T', 'X');
	saveGroup('Grupo F', 31, 11, 'T', 'X');
	saveGroup('Grupo G', 37, 18, 'T', 'X');
	saveGroup('Grupo H', 43, 25, 'T', 'X');
	saveOctavos();
	saveCuartos();
	saveSemisAndFinals();
};

saveGroup = function(stage, numStart, rowStart, locGoalsCol, visGoalsCol) {
	var row = rowStart;
	for (var i = numStart; i <= numStart + 5; i++) {
		set('matches/' + i + '/loc_team', sheet[locGoalsCol + row].v);
		set('matches/' + i + '/vis_team', sheet[visGoalsCol + row].v);
		set('matches/' + i + '/stage', stage);
		row++;
	};
};

saveOctavos = function() {
	var numStart = 49;
	for (var i = numStart; i <= numStart + 7; i++) {
		set('matches/' + i + '/stage', 'Octavos');
	};
}

saveCuartos = function() {
	var numStart = 57;
	for (var i = numStart; i <= numStart + 3; i++) {
		set('matches/' + i + '/stage', 'Cuartos');
	};
}

saveSemisAndFinals = function() {
	set('matches/61/stage', 'Semis');
	set('matches/62/stage', 'Semis');
	set('matches/63/stage', 'Tercer lugar');
	set('matches/64/stage', 'Final');
}

set = function(path, value) {
	ref.child(path).set(value, function(err) {
		if (err) console.log(err);
		console.log(path + ' <- ' + value);
	});
}