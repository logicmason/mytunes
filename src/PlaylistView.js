var PlaylistView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('change:queuedAt', this.render, this);
    this.$el.attr("class", "playlist");
  },

  render: function(){
    var modelInfo = this.collection.queued();
    var that = this;
    that.$el.html("<h1>play.</h1>");

      _.each(modelInfo, function(song) {
          var playlistEntryView = new PlaylistEntryView({model: song});
            that.$el.append(playlistEntryView.render());
      });

    this.$el.find('.remove').on('click', function(e) {
      that.remove(e);
    });
    return this.$el;
  },

  remove: function(e) {
    var cid = e.target.classList[1];
    var listItem = this.collection._byCid[cid];
    this.collection._byCid[cid].unset("queuedAt");
  }
});
