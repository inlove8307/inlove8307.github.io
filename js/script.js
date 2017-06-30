(function() {
  // the application
  var MyApp = function() {
    this.init();
  }

  MyApp.prototype = {
    init: function() {
      console.log('mayapp init');
      if (!createjs.Sound.initializeDefaultPlugins()) {return;}

      var audioPath = "assets/audio/";
      var sounds = [
        {id:"Music", src:"everyday_emart.mp3"}
      ];

      createjs.Sound.alternateExtensions = ["mp3"];
      var loadProxy = createjs.proxy(this.handleLoad, this);
      createjs.Sound.addEventListener("fileload", loadProxy);
      createjs.Sound.registerSounds(sounds, audioPath);
    },

    handleLoad: function(event) {
      console.log('handle load');
      createjs.Sound.play(event.src);
    }
  };

  var sound = new MyApp();
}());