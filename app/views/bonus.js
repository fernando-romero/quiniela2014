app.Views.Bonus = Backbone.View.extend({

  template: JST['app/templates/bonus.html'],

  initialize: function(options){
    this.ref = app.FirebaseRef.child('bonus/' + options.num);
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