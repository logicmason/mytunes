describe('PlayerView', function() {
  var view, songs;

  beforeEach(function() {
    songs = new Songs();
    songs.reset([
      {
        fake: 'data',
        url: '/test/testsong.mp3',
        title:'test song'
      },
      {
        url: "mp3s/04 One In A Million.mp3", //length 271000
        title: "One In A Million",
        artist: "Aaliyah"
      }
    ]);
    view = new PlayerView({collection: songs});
  });

  it('should change when the first song is queued', function(){
    expect(view.model).toBeUndefined();
    var song = songs.models[0];
    song.set('queuedAt', new Date());
    expect(view.model).toEqual(song);
  });

  describe('what happens when the song ends', function(){

    it('should remove the old song from the playlist', function(){
      var song = songs.models[1];
      song.set('queuedAt', new Date());
      view.$('audio').trigger('ended');
      expect(song.get('queuedAt')).toBeFalsy();
    });

    it('should get the next song in the playlist', function() {
      var song1 = songs.models[0];
      var song2 = songs.models[1];
      song1.set('queuedAt', new Date());
      song2.set('queuedAt', new Date());
      view.$('audio').trigger('ended');
      expect(song1.get('queuedAt')).toBeFalsy();
      expect(view.model).toEqual(song2);
    });

  });
});