var Firebase = require('firebase');
var XLSX = require('xlsx');
var fs = require('fs');
var _ = require('underscore')._;
var ref = new Firebase('https://quiniela2014.firebaseio.com');
var workbook = XLSX.readFile('submissions/Fernando_Romero.xlsx');
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

saveGroup = function(stage, numStart, cellStart, loc, vis) {
	var j = cellStart;
	for (var i = numStart; i <= numStart + 5; i++) {
		ref.child('matches/' + i + '/loc_team').set(sheet[loc + j].v);
		ref.child('matches/' + i + '/vis_team').set(sheet[vis + j].v);
		ref.child('matches/' + i + '/stage').set(stage);
		j++;
	};
};

saveOctavos = function() {
	var numStart = 49;
	for (var i = numStart; i <= numStart + 7; i++) {
		ref.child('matches/' + i + '/stage').set('Octavos');
	};
}

saveCuartos = function() {
	var numStart = 57;
	for (var i = numStart; i <= numStart + 3; i++) {
		ref.child('matches/' + i + '/stage').set('Cuartos');
	};
}

saveSemisAndFinals = function() {
	ref.child('matches/61/stage').set('Semis');
	ref.child('matches/62/stage').set('Semis');
	ref.child('matches/63/stage').set('Tercer lugar');
	ref.child('matches/64/stage').set('Final');
}