function init() {
  if (!createjs.Sound.initializeDefaultPlugins()) {return;}

  var audioPath = "assets/audio/";
  var sounds = [
    {id:"BGM", src:"everyday_emart.mp3"}
  ];

  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.on("fileload", handleLoad);
  createjs.Sound.registerSounds(sounds, audioPath);
}

function handleLoad(event) {
  createjs.Sound.play(event.src, {delay: 0, loop: 0});
}

function handlePlay(event) {
  createjs.Sound.play('BGM');
}

function handleStop(event) {
  createjs.Sound.stop('BGM');
}