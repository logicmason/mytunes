var PlayerView = Backbone.View.extend({

  initialize: function(){
    // set up an event listener on the songs collection
    this.collection.on('change', this.handleQueueChange, this);
    this.collection.on('play', this.play, this);
  },

  // templates are a nicer way to put js data into html strings
  template: _.template('<audio src="<%= url %>" controls autoplay class="audioplayer"></audio>'),

  render: function(){
    if(this.model){
      this.$el.html(this.template(this.model.attributes));
    }
    var that = this;
    this.$('audio').on('ended', function() {
      that.endSong();
    });

    return this.$el;
  },

  play: function(model) {
    this.model = model;
    this.render();
  },

  // event listener
  handleQueueChange: function(){
    if(!this.model){
      this.model = this.collection.queued()[0];
      this.render();
    }
  },

  endSong: function() {
    this.model.unset("queuedAt");
    this.model.set("playing", false);
    this.model = undefined;
    this.handleQueueChange();
  }

});
