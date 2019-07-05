// NAME SPACE
var Game = Game || {};

// CLASS TIME
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Time = function(seconds, callback){
        this.initialize(seconds, callback);
    };

    // PROTOTYPE
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
        var shift;

        if (!code) return console.error('error: \'code\' is not defined.');

        if (this.code[0] === code) {
            shift = this.code.shift();

            if (this.event.update) {
                this.event.update(shift);
            }
        }
        else {
            if (this.event.passby) {
                this.event.passby();
            }
        }

        if (this.code[0] === undefined) {
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
            play.event.start(play.clone);
        }

        interval = setInterval(function(){
            play.clone--;

            if (play.clone > -1) {
                if (play.event.update) {
                    play.event.update(play.clone);
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

// 게임 코드
(function(window, document, $, undefined){
    "use strict";

    // 변수 선언
    var time, score, item, play, audio = {}, options = {};

    // 기본 옵션값
    options.timelimit = 60; // 플레이 시간
    options.timeunit = 2; // 시간 증가 단위
    options.scoreunit = 10; // 점수 증가 단위

    // 타이머 생성
    // new Game.Time(time, callback)
    // @time (Number) : 플레이 타임
    // @callback (function) : 이벤트 콜백 함수
    time = new Game.Time(options.timelimit, function(time){
        // 타이머 생성 시 코드
        setTimeView(time.toPercent(), time.toNumber());
    });

    time.callback('reset', function(time){
        // 타이머 리셋 시 코드
        setTimeView(time.toPercent(), time.toNumber());
        $('.time-text').css({
            'background': '#fea201',
            'border-color': '#fea201'
        });
    });

    time.callback('update', function(time){
        // 타이머 업데이트 시 코드
        setTimeView(time.toPercent(), time.toNumber());
    });

    time.callback('increase', function(time){
        // 타이머 값 증가 시 코드
        setTimeView(time.toPercent(), time.toNumber());
    });

    time.callback('complete', function(time){
        // 타이머 종료 시 코드
        setTimeView(time.toPercent(), time.toNumber());
        layerShow('close', true);
        audio.bgm.fade(0.5, 0, 500);
        $('.time-text').css({
            'background': '#333133',
            'border-color': '#333133'
        });
    });

    // 스코어 생성
    // new Game.Score(unit, callback)
    // @unit (Number) : 점수 증가 단위
    // @callback (function) : 이벤트 콜백 함수
    score = new Game.Score(options.scoreunit, function(score){
        // 스코어 생성 시 코드
        $('.score-text').text(score.toFormat());
    });

    score.callback('reset', function(score){
        // 스코어 리셋 시 코드
        $('.score-text').text(score.toFormat());
    });

    score.callback('increase', function(score){
        // 스코어 값 증가 시 코드
        $('.score-text').text(score.toFormat());
    });

    // 아이템 생성
    // new Game.Item(item, callback)
    // @item (jQuery Object) : 레시피 아이템
    // @callback (function) : 이벤트 콜백 함수
    item = new Game.Item($('.list-item'), function(item){
        // 아이템 생성 시 코드
    });

    item.callback('reset', function(item){
        // 아이템 리셋 시 코드
    });

    item.callback('update', function(item, code){
        // 아이템 정답 시 코드
        var index = item.clone.length - item.code.length - 1;

        item.origin.eq(index).remove();
        audio.update.play();
        score.increase(options.scoreunit);
        $('.view-item.' + code).show();
    });

    item.callback('passby', function(item){
        // 아이템 오답 시 코드
        audio.passby.play();
        layerShow('delay', true, 200);

        setTimeout(function(){
            if (time.toNumber() > 0) {
                layerHide(200);
            }
        }, 1600);
    });

    item.callback('complete', function(item){
        // 아이템 사이클 완성 시 코드
        score.increase(options.scoreunit * 10);
        time.increase(options.timeunit);
        layerShow(null, false, 0);

        $('.view-item.C07').fadeIn(1000);

        setTimeout(function(){
            item.reset();
            $('.view-item').hide();
            $('.view-item.C00').show();
            layerHide(0);
        }, 1000);
    });

    // 게임 생성
    // new Game.Play(count, callback)
    // @count (Number) : 게임 시작 시 카운트
    // @callback (function) : 이벤트 콜백 함수
    play = new Game.Play(3, function(play){
        // 게임 생성 시 코드
        var setPaddingTop = function(event){
            var $wrap = $('.layer-item.load'),
            loadHeight = $wrap.outerHeight(),
            logoHeight = $wrap.children().outerHeight();

            $wrap.css('padding-top', loadHeight / 2 - logoHeight / 2);
            $wrap.children().css('visibility', 'visible');
        };

        $('.layer-item.load img').ready(setPaddingTop).load(setPaddingTop);

        play.load(3000);
    });

    play.callback('load', function(play){
        // 리소스(bgm) 로드 되었을 시 코드
        $('.ctlr-wrap').css('margin-top', function(){
            var wrapHeight = $(this).parent().outerHeight(),
            thisHeight = $(this).children().outerHeight(),
            thisTop = $(this).offset().top,
            margin = (wrapHeight - thisTop) / 2 - thisHeight / 2;

            return thisTop + margin > thisTop ? margin : thisTop;
        });

        $('.time-text').css('line-height', function(){
            return $(this).outerHeight() - 1 + 'px';
        });

        layerShow('init', true, 1000);
    });

    play.callback('reset', function(play){
        // 게임 리셋 시 코드
        item.reset();
        score.reset();
        time.reset();

        $('.view-item').hide();
        $('.view-item.C00').show();

        layerShow('count', true, 200);
    });

    play.callback('start', function(play, index){
        // 게임 스타트 시 코드
        $('.layer-item.count img').eq(index).show().siblings().hide();
        layerShow('count', true, 0);
    });

    play.callback('update', function(play, index){
        // 게임 카운트 시 코드
        $('.layer-item.count img').eq(index).show().siblings().hide();
    });

    play.callback('complete', function(play){
        // 게임 카운트 완료 시 코드
        audio.bgm.volume(0.5);
        audio.bgm.play();
        time.update();
        layerHide(0);
    });

    // 라이브러리
    // Howler.js (https://howlerjs.com/)
    // new Howl(options)
    // @options (Object) : src 옵션 필수
    audio.bgm = new Howl({
        src: ['assets/audio/bgm_ricecake.mp3'],
        volume: 0.5,
        loop: true,
        onfade: function(){
            this.stop();
        },
        onload: function(){
            play.setStatus(true);
        }
    });

    audio.update = new Howl({
        src: ['assets/audio/effect_update.mp3'],
        volume: 1
    });

    audio.passby = new Howl({
        src: ['assets/audio/effect_passby.mp3'],
        volume: 1
    });

    // 버튼 이벤트
    $('.ctlr-item').on({
        'touchstart': function(event){
            // 아이템 버튼 터치시작 시 코드
            item.checkCode($(this).data('code'));
            $(this).addClass('on').siblings().removeClass('on');
        },
        'touchend': function(event){
            // 아이템 버튼 터치종료 시 코드
            $(this).removeClass('on');
        },
    });

    $('.layer-item.init').on('touchstart', function(event){
        // 시작 버튼 터치 시 코드
        play.reset();
    });

    $('.layer-item.close').on('touchstart', function(event){
        // 확인 버튼 클릭 시 코드
        layerShow('init', true, 200);
    });

    // 공통 함수
    function setTimeView(width, text){
        $('.time-line-inner').width(width);
        $('.time-text').text(text);
    };

    function layerShow(target, modal, duration){
        var $wrap = $('.layer-wrap'),
        $item = $('.layer-item'),
        $prev = $item.filter('.' + $wrap.data('item')),
        $target = $item.filter('.' + target),
        $modal = $('.layer-modal');

        duration = duration || 200;

        if (modal) {
            $modal.fadeIn(duration);
        }
        else {
            $modal.fadeOut(duration);
        }

        $wrap.fadeIn(duration);
        $prev.fadeOut(duration);
        $target.css({
            'display': 'block',
            'visibility': 'hidden',
            'margin-top': - $target.outerHeight() / 2
        });
        $target.css({
            'display': 'none',
            'visibility': 'visible'
        });
        $target.fadeIn(duration);
        $wrap.data('item', target);
    };

    function layerHide(duration){
        duration = duration || 200;

        $('.layer-modal').fadeOut(duration);
        $('.layer-item').fadeOut(duration);
        $('.layer-wrap').fadeOut(duration);
    };
}(window, document, jQuery));