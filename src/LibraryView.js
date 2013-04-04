var LibraryView = Backbone.View.extend({

  tagName: "table",

  initialize: function(){
    this.subviews = this.collection.map(function(song){
      return new LibraryEntryView({model: song});
    });
  },

  render: function(){
    return this.$el.html("<h2>Library</h2>").append(
      _(this.subviews).map(function(subview){
        return subview.render();
      })
    );
  }

});
