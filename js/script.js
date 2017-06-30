(function() {
  // the application
  var SountJS = function() {
    this.src = null;
    this.soundInstance = null;
    this.loadProxy = null;
  };

  SountJS.prototype = {
    init: function() {
      console.log('init()');
      if (!createjs.Sound.initializeDefaultPlugins()) {return;}

      var assetsPath = "assets/audio/";
      this.src = assetsPath + 'everyday_emart.mp3';

      this.loadProxy = createjs.proxy(this.handleLoad, this);
      createjs.Sound.alternateExtensions = ["mp3"];
      createjs.Sound.addEventListener("fileload", this.loadProxy);
      createjs.Sound.registerSound(this.src);

      return this;
    },

    handleLoad: function(event) {
      console.log('handleLoad()');
      this.soundInstance = createjs.Sound.play(event.src, {loop: 999});
      createjs.Sound.removeEventListener("fileload", this.loadProxy);
    }
  };

  var sound = new SountJS();
  sound.init();  
}());