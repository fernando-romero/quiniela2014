var Firebase = require('firebase');
var ref = new Firebase('https://quiniela2014.firebaseio.com');

var num = parseInt(process.argv[2], 10);
var team = process.argv[3];

ref.auth(process.env.FIREBASE_SECRET, function(err) {
  if(err) console.log("Login Failed!", err);
  else updateBonus();
});

updateBonus = function() {
	set('bonus/' + num + '/team', team);
}

set = function(path, value) {
	ref.child(path).set(value, function(err) {
		if (err) console.log(err);
		console.log(path + ' <- ' + value);
	});
}