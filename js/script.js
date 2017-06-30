(function() {
  var queue = new createjs.LoadQueue();
  createjs.Sound.alternateExtensions = ['mp3'];
  queue.installPlugin(createjs.Sound);
  queue.addEventListener('fileload', handleFileLoad);
  queue.addEventListener('complete', handleComplete);
  queue.loadManifest([
    {id: 'BGM', src: 'assets/audio/everyday_emart.mp3'}
  ]);
  function handleFileLoad(event){
    //createjs.Sound.play(event.item.id, {loop: 999});
  }
  function handleComplete(){
    console.log('handleComplete');
  }
}());