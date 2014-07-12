app.Views.Bonuses = Backbone.View.extend({

  template: JST['app/templates/bonuses.html'],

  initialize: function(){
    this.ref = app.FirebaseRef.child('bonus');
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