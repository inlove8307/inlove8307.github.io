// NAME SPACE
var Game = Game || {};

// CLASS TIME
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Time = function(seconds, callback){
        this.initialize(seconds, callback);
    };

    var p = Time.prototype;

    // PROPERTIES
    p.origin = null;
    p.clone = null;
    p.event = { type: ['init', 'reset', 'start', 'update', 'increase', 'complete'] };

    // FUNCTIONS
    p.initialize = function(seconds, callback){
        this.clone = this.origin = seconds || 30;

        if (callback) {
            this.callback('init', callback);
            this.event.init();
        }
    };
    p.toFormat = function(){
        var result = [], hour, minutes, seconds;

        hour = parseInt(this.clone / 60 / 60);
        minutes = parseInt(this.clone / 60 % 60);
        seconds = parseInt(this.clone % 60);

        if (hour) result.push(hour);
        result.push(minutes);
        result.push(seconds);

        result = result.join(':').replace(/\b(\d)\b/g, "0$1");

        return result;
    };
    p.toPercent = function(){
        return (this.clone / this.origin * 100).toFixed(2) + '%';
    };
    p.toNumber = function(){
        return this.clone;
    };
    p.increase = function(seconds){
        this.clone += seconds || 1;

        if (this.clone > this.origin) {
            this.clone = this.origin;
        }

        if (this.event.increase) {
            this.event.increase();
        }
    };
    p.callback = function(event, callback){
        if (this.event.type.indexOf(event) < 0) {
            return console.error('error: \'' + event + '\' is invaild event type.');
        }

        this.event[event] = callback.bind(null, this);
    };
    p.update = function(){
        var time = this, interval;

        if (time.event.start) time.event.start();

        interval = setInterval(function(){
            time.clone--;

            if (time.clone > 0) {
                if (time.event.update) {
                    time.event.update();
                }
            }
            else {
                clearInterval(interval);

                if (time.event.complete) {
                    time.event.complete();
                }
            }
        }, 1000);
    };
    p.reset = function(){
        this.clone = this.origin;

        if (this.event.reset) {
            this.event.reset();
        }
    };

    Game.Time = Time;
}(window, document, jQuery));

// CLASS SCORE
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Score = function(unit, callback){
        this.initialize(unit, callback);
    };

    // PROTOTYPE
    var p = Score.prototype;

    // PROPERTIES
    p.origin = null;
    p.clone = null;
    p.unit = null;
    p.event = { type: ['init', 'reset', 'increase', 'decrease'] };

    // FUNCTIONS
    p.initialize = function(unit, callback){
        this.origin = this.clone = 0;
        this.unit = unit || 1;

        if (callback) {
            this.callback('init', callback);
            this.event.init();
        }
    };
    p.increase = function(unit){
        this.clone += unit || this.unit;

        if (this.event.increase) {
            this.event.increase();
        }
    };
    p.decrease = function(unit){
        this.clone -= unit || this.unit;

        if (this.clone < this.origin) {
            this.clone = this.origin;
        }

        if (this.event.decrease) {
            this.event.decrease();
        }
    };
    p.toFormat = function(){
        return this.clone.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    p.toNumber = function(){
        return this.clone;
    };
    p.callback = function(event, callback){
        if (this.event.type.indexOf(event) < 0) {
            return console.error('error: \'' + event + '\' is invaild event type.');
        }

        this.event[event] = callback.bind(null, this);
    };
    p.reset = function(){
        this.clone = this.origin;

        if (this.event.reset) {
            this.event.reset();
        }
    };

    Game.Score = Score;
}(window, document, jQuery));

// CLASS ITEM
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Item = function(item, callback){
        this.initialize(item, callback);
    };

    // PROTOTYPE
    var p = Item.prototype;

    // PROPERTIES
    p.origin = null;
    p.clone = null;
    p.parent = null;
    p.code = null;
    p.event = { type: ['init', 'reset', 'update', 'passby', 'complete'] };

    // FUNCTIONS
    p.initialize = function(item, callback){
        this.origin = item;
        this.parent = item.parent();
        this.clone = item.toArray();

        if (callback) {
            this.callback('init', callback);
            this.event.init();
        }
    };
    p.sortRandom = function(){
        var index = this.clone.length, temp, random;

        while (0 !== index) {
            random = Math.floor(Math.random() * index);
            index -= 1;

            temp = this.clone[index];
            this.clone[index] = this.clone[random];
            this.clone[random] = temp;
        }
    };
    p.createCode = function(){
        var i, length;

        this.code = [];

        for (i = 0, length = this.clone.length; i < length; i++) {
            this.code.push(this.clone[i].dataset.code);
        }
    };
    p.checkCode = function(code){
        if (!code) return console.error('error: \'code\' is not defined.');

        if (this.code[0] === code) {
            this.code.shift();

            if (this.event.update) {
                this.event.update();
            }
        }
        else {
            if (this.event.passby) {
                this.event.passby();
            }
        }

        if (this.code[0] === undefined) {
            this.reset();

            if (this.event.complete) {
                this.event.complete();
            }
        }
    };
    p.callback = function(event, callback){
        if (this.event.type.indexOf(event) < 0) {
            return console.error('error: \'' + event + '\' is invaild event type.');
        }

        this.event[event] = callback.bind(null, this);
    };
    p.reset = function(){
        this.sortRandom();
        this.createCode();
        this.origin.remove();
        this.parent.append(this.clone);
        this.origin = this.parent.children();

        if (this.event.reset) {
            this.event.reset();
        }
    };

    Game.Item = Item;
}(window, document, jQuery));

// CLASS PLAY
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Play = function(count, callback){
        this.initialize(count, callback);
    };

    // PROTOTYPE
    var p = Play.prototype;

    // PROPERTIES
    p.origin = null;
    p.clone = null;
    p.loaded = null;
    p.event = { type: ['init', 'reset', 'load', 'start', 'update', 'complete'] };

    // FUNCTIONS
    p.initialize = function(count, callback){
        this.clone = this.origin = count || 3;

        if (callback) {
            this.callback('init', callback);
            this.event.init();
        }
    };
    p.setStatus = function(status){
        this.loaded = status || null;
    };
    p.load = function(delay){
        var play = this, delay = delay || 3000, interval;

        interval = setInterval(function(){
            if (play.loaded) {
                clearInterval(interval);

                if (play.event.load) {
                    play.event.load();
                }
            }
        }, delay);
    };
    p.update = function(){
        var play = this, interval;

        if (play.event.start) {
            play.event.start();
        }

        interval = setInterval(function(){
            play.clone--;

            if (play.clone > -1) {
                if (play.event.update) {
                    play.event.update();
                }
            }
            else {
                clearInterval(interval);

                if (play.event.complete) {
                    play.event.complete();
                }
            }
        }, 1000);
    };
    p.callback = function(event, callback){
        if (this.event.type.indexOf(event) < 0) {
            return console.error('error: \'' + event + '\' is invaild event type.');
        }

        this.event[event] = callback.bind(null, this);
    };
    p.reset = function(){
        this.clone = this.origin;

        if (this.event.reset) {
            this.event.reset();
        }

        this.update();
    };

    Game.Play = Play;
}(window, document, jQuery));

// TEST
(function(window, document, $, undefined){
    "use strict";

    // TEST OPTIONS
    var options = {
        count: 3,
        unit: 1,
        time: 30,
        item: $('.list-item'),
    };

    // TEST TIME
    var time = new Game.Time(options.time, function(time){
        // callback initialize
        setTimeView(time.toPercent(), time.toFormat());
    });

    time.callback('reset', function(time){
        setTimeView(time.toPercent(), time.toFormat());
    });

    time.callback('update', function(time){
        setTimeView(time.toPercent(), time.toFormat());
    });

    time.callback('increase', function(time){
        setTimeView(time.toPercent(), time.toFormat());
    });

    time.callback('complete', function(time){
        setTimeView(time.toPercent(), time.toFormat());
        layerShow('close', true);
        audio.bgm.fade(0.2, 0, 500);
    });

    function setTimeView(width, text){
        $('.time-line').width(width);
        $('.time-text').text(text);
    };

    // TEST SCORE
    var score = new Game.Score(options.unit, function(score){
        // callback initialize
        $('.user-score').text(score.toFormat());
    });

    score.callback('reset', function(score){
        $('.user-score').text(score.toFormat());
    });

    score.callback('increase', function(score){
        $('.user-score').text(score.toFormat());
    });

    score.callback('decrease', function(score){
        $('.user-score').text(score.toFormat());
    });

    // TEST ITEM
    var item = new Game.Item(options.item, function(item){
        // callback initialize
    });

    item.callback('reset', function(item){
        // callback reset
    });

    item.callback('update', function(item){
        var index = item.clone.length - item.code.length - 1;
        item.origin.eq(index).remove();
        audio.effect.play();
    });

    item.callback('passby', function(item){
        layerShow('delay', true, 200);

        setTimeout(function(){
            if (time.toNumber() > 0) {
                layerHide(200);
            }
        }, 1600);
    });

    item.callback('complete', function(item){
        score.increase();
        time.increase();
    });

    // TEST PLAY
    var play = new Game.Play(options.count, function(play){
        // callback initialize
        layerShow('load', true, 0);
        play.load(3000);
    });

    play.callback('load', function(play){
        layerShow('init', true, 200);
    });

    play.callback('reset', function(play){
        item.reset();
        score.reset();
        time.reset();

        layerShow('count', true, 200);
    });

    play.callback('start', function(play){
        $('.layer-item.count').text(play.clone);
    });

    play.callback('update', function(play){
        $('.layer-item.count').text(play.clone);
    });

    play.callback('complete', function(play){
        audio.bgm.volume(0.2);
        audio.bgm.play();
        time.update();
        layerHide(0);
    });

    // TEST AUDIO
    var audio = {};

    audio.bgm = new Howl({
        src: ['assets/audio/bgm.mp3'],
        volume: 0.2,
        loop: true,
        onfade: function(){
            this.stop();
        },
        onload: function(){
            play.setStatus(true);
        }
    });

    audio.effect = new Howl({
        src: ['assets/audio/effect.mp3'],
        volume: 1
    });

    // TEST GAME
    $('.ctlr-item').on('touchstart', function(event){
        item.checkCode($(this).data('code'));
    });

    $('.start').on('touchstart', function(event){
        play.reset();
    });

    $('.confirm').on('touchstart', function(event){
        layerShow('init', true, 200);
    });

    function layerShow(target, modal, duration){
        duration = duration || 200;

        if (modal) {
            $('.layer-modal').fadeIn(duration);
        }
        else {
            $('.layer-modal').fadeOut(duration);
        }

        $('.layer-item').filter('.' + target).fadeIn(duration).siblings().fadeOut(duration);
        $('.layer-wrap').fadeIn(duration);
    };

    function layerHide(duration){
        duration = duration || 200;

        $('.layer-modal').fadeOut(duration);
        $('.layer-item').fadeOut(duration);
        $('.layer-wrap').fadeOut(duration);
    };
}(window, document, jQuery));