var PlaylistEntryView = Backbone.View.extend({

	template: _.template('<div class="listitems"> <%= attributes.title %> <span class="remove <%= cid %>">remove</span> </div>'),

  render: function(){
    return this.$el.html(this.template(this.model));
  }
});

