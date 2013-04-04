var LibraryEntryView = Backbone.View.extend({

  tagName: 'tr',

  // templates are a nicer way to put js data into html strings
  template: _.template(
    '<td class= "artist"><%= artist %></td>' +
    '<td>' +
      '<a href="#<%= url %>" class="play"><%= title %></a>' +
    '</td>' +
    '<td>'+
      '<a href="#" class="queue">Queue me up Scotty!</a>' +
    '</td>'
  ),

  events: {
    'click .play': 'play',
    'click .queue': 'queueSong',
  },

  render: function(){
    return this.$el.html(this.template(this.model.attributes));
  },

  play: function() {
    if (_.contains(this.model.collection.queued(), this.model) ){
      this.model.unset('queuedAt');
    } else {
    }
    var playing = this.model.collection.where('playing');
    _.each(playing, function(x) {
      x.set('playing', false);
    })
    this.model.set('playing', true);
    this.model.collection.trigger('play', this.model, this);
  },

  queueSong: function() {
    this.model.set('queuedAt', new Date());
    //this.$('.remove').on('click', removeSong);
  }
});

