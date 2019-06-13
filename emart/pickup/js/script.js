// NAMESPACE
this.Game = this.Game || {};

// CLASS VIEW
(function(window, document, $, undefined){
    "use strict";

    var DATA = {};

    // CONSTRUCTOR
    var View = function(data, width){
        this.init(data);
    };

    // PROTOTYPE
    var p = View.prototype;

    // PROPERTIES
    p.data = null;
    p.info = null;

    // FUNCTIONS
    p.init = function(origin){
        this._origin = origin;

        this.setDevice();
    };
    p.setDevice = function(){
        this.device['width'] = $(window).height();
        this.device['height'] = $(window).width();

        this.setRatio(origin);
    };
    p.setRatio = function(origin){
        this._origin = origin || this._origin;
        this._resize = this.device['width'];
        this._ratio = this._resize / this._origin;
    };
    p.setResize = function(target, top, left, width, height){
        target['origin'] = {};
        target['resize'] = {};

        target['origin']['width'] = width;
        target['origin']['height'] = height;
        target['origin']['top'] = top;
        target['origin']['left'] = left;

        target['resize']['width'] = target['origin']['width'] * this._ratio;
        target['resize']['height'] = target['origin']['height'] * this._ratio;
        target['resize']['top'] = target['origin']['top'] * this._ratio;
        target['resize']['left'] = target['origin']['left'] * this._ratio;
    };
    p.setElements = function(target, className){
        target['class'] = className;
        target['elements'] = $(className);
    };
    p.getElements = function(target){
        return target['elements'];
    };
    p.setStyles = function(target){
        target['elements'].css({
            'width': target['resize']['width'],
            'height': target['resize']['height'],
            'width': target['resize']['top'],
            'height': target['resize']['left']
        });
    };

    Game.View = View;
})(window, document, jQuery);

// CLASS SCORE
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Score = function(score){
        this.init(score);
    };

    // PROTOTYPE
    var p = Score.prototype;

    // PROPERTIES
    p.score;

    // FUNCTIONS
    p.init = function(score){
        this.score = score;
    };
    p.setScore = function(score){
        this.score = score;
    };
    p.getScore = function(){
        return this.score;
    };
    p.addScore = function(score){
        this.score += score;
    };
    p.delScore = function(score){
        this.score -= score;
    };

    Game.Score = Score;
})(window, document, jQuery);

// CLASS AUDIO
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Audio = function(config){
        this.init(config);
    };

    // PROTOTYPE
    var p = Audio.prototype;

    // PROPERTIES
    p.target = null;
    p.config = null;
    p.loaded = null;
    p.playing = null;

    // audioTracks; // Returns an AudioTrackList object representing available audio tracks
    // autoPlay; // Sets or returns whether the audio/video should start playing as soon as it is loaded
    // buffered; // Returns a TimeRanges object representing the buffered parts of the audio/video
    // controller; // Returns the MediaController object representing the current media controller of the audio/video
    // controls; // Sets or returns whether the audio/video should display controls (like play/pause etc.)
    // crossOrigin; // Sets or returns the CORS settings of the audio/video
    // currentSrc; // Returns the URL of the current audio/video
    // currentTime; // Sets or returns the current playback position in the audio/video (in seconds)
    // defaultMuted; // Sets or returns whether the audio/video should be muted by default
    // defaultPlaybackRate; // Sets or returns the default speed of the audio/video playback
    // duration; // Returns the length of the current audio/video (in seconds)
    // ended; // Returns whether the playback of the audio/video has ended or not
    // error; // Returns a MediaError object representing the error state of the audio/video
    // loop; // Sets or returns whether the audio/video should start over again when finished
    // mediaGroup; // Sets or returns the group the audio/video belongs to (used to link multiple audio/video elements)
    // muted; // Sets or returns whether the audio/video is muted or not
    // networkState; // Returns the current network state of the audio/video
    // paused; // Returns whether the audio/video is paused or not
    // playbackRate; // Sets or returns the speed of the audio/video playback
    // played; // Returns a TimeRanges object representing the played parts of the audio/video
    // preload; // Sets or returns whether the audio/video should be loaded when the page loads
    // readyState; // Returns the current ready state of the audio/video
    // seekable; // Returns a TimeRanges object representing the seekable parts of the audio/video
    // seeking; // Returns whether the user is currently seeking in the audio/video
    // src; // Sets or returns the current source of the audio/video element
    // startDate; // Returns a Date object representing the current time offset
    // textTracks; // Returns a TextTrackList object representing the available text tracks
    // videoTracks; // Returns a VideoTrackList object representing the available video tracks
    // volume; // Sets or returns the volume of the audio/video

    // FUNCTIONS
    p.init = function(config){
        if (!config) return;

        this.config = config;

        this.createHtml();
    };
    //
    p.createHtml = function(){
        var audio, source, i, length;

        audio = document.createElement('audio');

        if (this.config['id']) audio.setAttribute('id', this.config['id']);

        source = document.createElement('source');

        if (this.config['src']) source.setAttribute('src', this.config['src']);
        if (this.config['type']) source.setAttribute('type', this.config['type']);

        audio.appendChild(source);

        document.getElementsByTagName('body')[0].appendChild(audio);

        this.target = audio;

        this.setProps();
        this.addEventListener();
    };
    //
    p.setProps = function(obj){
        var props, key;

        props = obj || this.config.props;

        if (!props) return;

        for (key in props) {
            try {
                this.target[key] = props[key];
            }
            catch (error) {
                console.log('Error : ' + error.message);
            }
        }

        this.target.load();
    };
    //
    p.addEventListener = function(){
        this.target.addEventListener('abort', this.handlerAbort.bind(this));
        this.target.addEventListener('canplay', this.handlerCanplay.bind(this));
        this.target.addEventListener('canplaythrough', this.handlerCanplaythrough.bind(this));
        this.target.addEventListener('durationchange', this.handlerDurationchange.bind(this));
        this.target.addEventListener('emptied', this.handlerEmptied.bind(this));
        this.target.addEventListener('ended', this.handlerEnded.bind(this));
        this.target.addEventListener('error', this.handlerError.bind(this));
        this.target.addEventListener('loadeddata', this.handlerLoadeddata.bind(this));
        this.target.addEventListener('loadedmetadata', this.handlerLoadedmetadata.bind(this));
        this.target.addEventListener('loadstart', this.handlerLoadstart.bind(this));
        this.target.addEventListener('pause', this.handlerPause.bind(this));
        this.target.addEventListener('play', this.handlerPlay.bind(this));
        this.target.addEventListener('playing', this.handlerPlaying.bind(this));
        this.target.addEventListener('progress', this.handlerProgress.bind(this));
        this.target.addEventListener('ratechange', this.handlerRatechange.bind(this));
        this.target.addEventListener('seeked', this.handlerSeeked.bind(this));
        this.target.addEventListener('seeking', this.handlerSeeking.bind(this));
        this.target.addEventListener('stalled', this.handlerStalled.bind(this));
        this.target.addEventListener('suspend', this.handlerSuspend.bind(this));
        this.target.addEventListener('timeupdate', this.handlerTimeupdate.bind(this));
        this.target.addEventListener('volumechange', this.handlerVolumechange.bind(this));
        this.target.addEventListener('waiting', this.handlerWaiting.bind(this));
    };
    // Audio/Video Methods
    // p.addTextTrack = function(){
    //     // Adds a new text track to the audio/video
    //     console.log('addTextTrack');
    // };
    // p.canPlayType = function(){
    //     // Checks if the browser can play the specified audio/video type
    //     console.log('canPlayType');
    // };
    // p.load = function(){
    //     // Re-loads the audio/video element
    //     console.log('load');
    // };
    p.play = function(event){
        if (!this.loaded) return;

        this.target.pause();
        this.target.play();
    };
    p.pause = function(evnet){
        this.target.pause();
    };

    // HTML Audio/Video Events
    p.handlerAbort = function(event){
        // Fires when the loading of an audio/video is aborted
        console.log('event : handlerAbort');
    };
    p.handlerCanplay = function(event){
        // Fires when the browser can start playing the audio/video
        console.log('event : handlerCanplay');
    };
    p.handlerCanplaythrough = function(event){
        // Fires when the browser can play through the audio/video without stopping for buffering
        console.log('event : handlerCanplaythrough');

        if (this.target.autoplay) this.target.play();
    };
    p.handlerDurationchange = function(event){
        // Fires when the duration of the audio/video is changed
        console.log('event : handlerDurationchange');
    };
    p.handlerEmptied = function(event){
        // Fires when the current playlist is empty
        console.log('event : handlerEmptied');
    };
    p.handlerEnded = function(event){
        // Fires when the current playlist is ended
        console.log('event : handlerEnded');
    };
    p.handlerError = function(event){
        // Fires when an error occurred during the loading of an audio/video
        console.log('event : handlerError');
    };
    p.handlerLoadeddata = function(event){
        // Fires when the browser has loaded the current frame of the audio/video
        console.log('event : handlerLoadeddata');

        this.loaded = true;
    };
    p.handlerLoadedmetadata = function(event){
        // Fires when the browser has loaded meta data for the audio/video
        console.log('event : handlerLoadedmetadata');
    };
    p.handlerLoadstart = function(event){
        // Fires when the browser starts looking for the audio/video
        console.log('event : handlerLoadstart');
    };
    p.handlerPause = function(event){
        // Fires when the audio/video has been paused
        console.log('event : handlerPause');

        this.playing = false;
    };
    p.handlerPlay = function(event){
        // Fires when the audio/video has been started or is no longer paused
        console.log('event : handlerPlay');

        if (!this.loaded) {
            this.target.pause();
            return;
        }

        if (this.config.range && this.config.range.start) {
            this.target.currentTime = this.config.range.start
        };

        this.playing = true;
    };
    p.handlerPlaying = function(event){
        // Fires when the audio/video is playing after having been paused or stopped for buffering
        console.log('event : handlerPlaying');
    };
    p.handlerProgress = function(event){
        // Fires when the browser is downloading the audio/video
        console.log('event : handlerProgress');
    };
    p.handlerRatechange = function(event){
        // Fires when the playing speed of the audio/video is changed
        console.log('event : handlerRatechange');
    };
    p.handlerSeeked = function(event){
        // Fires when the user is finished moving/skipping to a new position in the audio/video
        console.log('event : handlerSeeked');
    };
    p.handlerSeeking = function(event){
        // Fires when the user starts moving/skipping to a new position in the audio/video
        console.log('event : handlerSeeking');
    };
    p.handlerStalled = function(event){
        // Fires when the browser is trying to get media data, but data is not available
        console.log('event : handlerStalled');
    };
    p.handlerSuspend = function(event){
        // Fires when the browser is intentionally not getting media data
        console.log('event : handlerSuspend');
    };
    p.handlerTimeupdate = function(event){
        // Fires when the current playback position has changed
        console.log('event : handlerTimeupdate');

        if (this.config.range && this.config.range.end) {
            if (this.target.currentTime >= this.config.range.end) {
                this.target.pause();
            }
        };
    };
    p.handlerVolumechange = function(event){
        // Fires when the volume has been changed
        console.log('event : handlerVolumechange');
    };
    p.handlerWaiting = function(event){
        // Fires when the video stops because it needs to buffer the next frame
        console.log('event : handlerWaiting');
    };

    Game.Audio = Audio;

    // TEST
    var audio = new Game.Audio({
        'src': 'https://emartapp.emart.com/upload/regs/sound/everyday_emart.mp3',
        'type': 'audio/mpeg',
        'range': { 'start': 50, 'end': 55 },
        'props': { 'loop': true }
    });

    var elConsole = document.getElementsByClassName('game-console-button-wrap')[0],
    elButtonOnPlay = document.createElement('button'),
    elButtonOnPause = document.createElement('button');

    elButtonOnPlay.innerText = 'PLAY';
    elButtonOnPlay.setAttribute('type', 'button');
    elButtonOnPlay.setAttribute('class', 'game-audio-play');
    elButtonOnPlay.addEventListener('touchstart', function(event){
        console.log('event : touchstart', event.target);

        audio.play();
    });

    elButtonOnPause.innerText = 'STOP';
    elButtonOnPause.setAttribute('type', 'button');
    elButtonOnPause.setAttribute('class', 'game-audio-pause');
    elButtonOnPause.addEventListener('touchstart', function(event){
        console.log('event : touchstart', event.target);

        audio.pause();
    });

    elConsole.appendChild(elButtonOnPause);
    elConsole.appendChild(elButtonOnPlay);
})(window, document, jQuery);

// CLASS ITEM
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Item = function(data, code, clone){
        this.init(data, code, clone);
    };

    // PROTOTYPE
    var p = Item.prototype;

    // DATA
    p.data = {
        'C': [ // 캐릭터
            { 'code': 'C00', 'score': 5, 'class': 'game-item-ryan' }, // 라이언
            { 'code': 'C01', 'score': 5, 'class': 'game-item-muzi' }, // 무지
            { 'code': 'C02', 'score': 5, 'class': 'game-item-con' }, // 콘
            { 'code': 'C03', 'score': 5, 'class': 'game-item-neo' }, // 네오
            { 'code': 'C04', 'score': 5, 'class': 'game-item-frodo' }, // 프로도
            { 'code': 'C05', 'score': 5, 'class': 'game-item-jayg' }, // 제이지
            { 'code': 'C06', 'score': 5, 'class': 'game-item-apeach' }, // 어피치
            { 'code': 'C07', 'score': 5, 'class': 'game-item-tube' } // 튜브
        ],
        'L': [ // 로고
            { 'code': 'L00', 'score': 10, 'class': 'game-item-emart' }, // 이마트
            { 'code': 'L01', 'score': 10, 'class': 'game-item-puzzle' }, // 사천성
            { 'code': 'L02', 'score': 10, 'class': 'game-item-popcorn' } // 팝콘
        ]
    };

    // PROPERTIES
    p.code = null;
    p.clone = null;
    p.count = null;

    // FUNCTIONS
    p.init = function(code, clone){
        this.code = code || this.code || null;
        this.clone = clone || this.clone || null;
        this.count = 0;
    };
    p.getItems = function(count){
        var character, logo, items, i, j, length;

        if (!this.data || !this.code || !this.clone) return;

        character = this.data['C'].slice(0);
        logo = this.data['L'].slice(0);

        items = [];

        this.count++;

        for (i = 0; i < character.length; i++) {
            // 선택 캐릭터 중복 추가
            if (this.code === character[i]['code']) {
                for (j = 0; j < this.clone; j++) {
                    items.push(character[i]);
                }
            }
            // 그 외 캐릭터 추가
            else {
                items.push(character[i]);
            }
        }

        // 로고 추가
        if (!(this.count % logo.length)) {
            items.push(logo[this.getRandom(logo.length)]);
        }

        return this.sortItems(items);
    };
    p.sortItems = function(items){
        var index, temp, random;

        index = items.length;

        while (0 !== index) {
            random = this.getRandom(index);
            index -= 1;

            temp = items[index];
            items[index] = items[random];
            items[random] = temp;
        }

        return items;
    };
    p.getRandom = function(index){
        return Math.floor(Math.random() * index);
    };

    Game.Item = Item;

    // TEST
    // var item = new Game.Item(DATA, 'C05', 3);

    // var elBody = document.getElementsByTagName('body'),
    // elGetItems = document.createElement('button');

    // elGetItems.innerText = 'Get Items';
    // elGetItems.setAttribute('type', 'button');
    // elGetItems.addEventListener('touchstart', function(event){
    //     console.log('event : touchstart', event.target);

    //     console.log(item.getItems());
    // });

    // elBody[0].appendChild(elGetItems);
})(window, document, jQuery);

// CLASS PLAY
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Play = function(config){
        this.init(config);
    };

    // PROTOTYPE
    var p = Play.prototype;

    // PROPERTIES
    p.config = null;
    p.item = null;
    p.score = null;
    p.sound = null;
    p.effect = null;

    // FUNCTIONS
    p.init = function(config){
        this.config = config;

        this.item = new Game.Item(this.config.code, this.config.clone);
        this.createItem(this.item.getItems());

        this.score = new Game.Score(this.config.score);
        this.createScore(this.score.getScore());

        this.sound = new Game.Audio({
            'src': 'https://emartapp.emart.com/upload/regs/sound/everyday_emart.mp3',
            'type': 'audio/mpeg',
            'props': { 'loop': true }
        });
        this.effect = new Game.Audio({
            'src': 'https://emartapp.emart.com/upload/regs/sound/everyday_emart.mp3',
            'type': 'audio/mpeg',
            'range': { 'start': 50, 'end': 50.5 }
        });

        this.addEventListener();
    };
    p.createItem = function(items){
        var $elList, $elItem, i, length;

        $elList = $('.game-list');
        $elList.empty();

        for (i = 0, length = items.length; i < length; i++) {
            $elItem = $('<span>');
            $elItem.attr({
                'class': items[i]['class'],
                'data-code': items[i]['code']
            });
            $elItem.css({
                'left': i * 100
            });
            $elList.append($elItem);
        }
    };
    p.createScore = function(score){

    };
    p.eventHandlerStart = function(evnet){
        if (this.item.count > 1) {
            this.createItem(this.item.getItems());
        }
        else {
            this.item.count++;
        }

        this.animateItem($('.game-list'));
        $(event.target).hide().siblings().show();
    };
    p.eventHandlerPickup = function(event){
        this.animatePickup($(event.target), $('.game-list'), $('.game-pick'));
    };
    p.animateItem = function($elList, $elFirst, $elLast){
        var me, list, items, first, last, temp;

        me = this;
        list = $elList;
        items = list.children();
        first = $elFirst || items.first();
        last = $elLast || items.last();
        temp = parseInt(last.css('left'));

        items.animate({ 'left': '-=' + items.outerWidth() }, {
            'easing': 'linear',
            'duration': me.config.speed,
            'complete': function(){
                if (this === items[0]) {
                    last = first;
                    first = first.next();

                    list.append(last);
                    last.css('left', temp);

                    me.animateItem($(this).parent(), first, last);
                };
            }
        });
    };
    p.animatePickup = function($elButton, $elList, $elPick){
        var check, temp;

        check = this.checkItem($elList, $elPick);
        temp = parseInt($elPick.css('top'));

        $elList.children().stop(true);

        if ($elPick.is(':animated')) return;

        $elPick.animate({ 'top': $elPick.outerHeight() }, {
            'easing': 'linear',
            'duration': 500,
            'complete': function(){
                $(this).animate({ 'top': temp }, {
                    'easing': 'linear',
                    'duration': 500,
                    'complete': function(){
                        $elButton.hide().siblings().show();
                    }
                });

                //if (!check.success) return;

                console.log(check.success, check.code, check.match);
            }
        });
    };
    p.checkItem = function($elList, $elPick){
        var result, item, pick, ratio;

        result = {};
        result.success = false;

        ratio = this.config.ratio;

        pick = $elPick.offset();
        pick.right = pick.left + $elPick.outerWidth();

        $.each($elList.children(), function(){
            var width, widthRatio, widthHalf;

            item = $(this).offset();
            item.right = item.left + $(this).outerWidth();

            width = $(this).outerWidth();
            widthRatio = width * ratio;
            widthHalf = widthRatio / 2;

            if (pick.left > item.left && pick.right < item.right) {
                if (pick.left < item.left + widthHalf) {
                    result.match = (pick.right - (item.left + widthHalf)) / widthRatio * 100;
                }

                if (pick.left > item.left + widthHalf) {
                    result.match = ((item.right - widthHalf) - pick.left) / widthRatio * 100;
                }

                if (pick.left == item.left + widthHalf) {
                    result.match = 100;
                }

                result.item = $(this);
                result.code = result.item.data('code');
            };
        });

        if (result.code && result.code.split(0, 1)[0] === 'L') {
            result.success = result.match >= this.config.range;
        }

        if (result.code && result.code.split(0, 1)[0] === 'C') {
            result.success = result.code === this.config.code && result.match >= this.config.range;
        }

        return result;
    };
    p.addEventListener = function(){
        $('.game-start').on('touchstart', this.eventHandlerStart.bind(this));
        $('.game-pickup').on('touchstart', this.eventHandlerPickup.bind(this));
    };

    Game.Play = Play;
})(window, document, jQuery);

// GAME TEST
(function(window, document, $, undefined){
    "use strict";

    var play = new Game.Play({
        'code': 'C03', // 선택 캐릭터
        'clone': 3, // 선택 캐릭터 중복 출현 빈도
        'speed': 300, // 캐릭터 슬라이드 속도
        'ratio': 0.5, // 캐릭터 영역 내부 체크 비율 (0.0 ~ 1.0)
        'range': 80, // 픽업 시 성공 영역 비율 (0~100)
        'logo': 3, // 로고 출현 카운트
        'score': 0 // 누적 점수
    });

    var console = (function(oldConsole){
        var elConsole, elMessage, elButton, counter = 0;

        elConsole = document.getElementsByClassName('game-console-message')[0];
        elButton = document.getElementsByClassName('game-console-button')[0];

        return {
            log: function(text){
                oldConsole.log(text);

                elMessage = document.createElement('p');
                elMessage.setAttribute('class', 'log');
                elMessage.innerText = text;
                elConsole.appendChild(elMessage);
                elConsole.scrollTop = elConsole.scrollHeight;
                elButton.innerText = 'CONSOLE [' + (counter++) + ']';
            },
            info: function(text){
                oldConsole.info(text);

                elMessage = document.createElement('p');
                elMessage.setAttribute('class', 'info');
                elMessage.innerText = text;
                elConsole.appendChild(elMessage);
                elConsole.scrollTop = elConsole.scrollHeight;
            },
            warn: function(text){
                oldConsole.warn(text);

                elMessage = document.createElement('p');
                elMessage.setAttribute('class', 'warn');
                elMessage.innerText = text;
                elConsole.appendChild(elMessage);
                elConsole.scrollTop = elConsole.scrollHeight;
            },
            error: function(text){
                oldConsole.error(text);

                elMessage = document.createElement('p');
                elMessage.setAttribute('class', 'error');
                elMessage.innerText = text;
                elConsole.appendChild(elMessage);
                elConsole.scrollTop = elConsole.scrollHeight;
            }
        };
    }(window.console));

    window.console = console;

    document.getElementsByClassName('game-console')[0].addEventListener('touchstart', function(event){
        var elOutput, elConsole, elElement;

        elOutput = document.getElementsByClassName('game-console-output')[0];
        elConsole = document.getElementsByClassName('game-console-message')[0];
        elElement = document.getElementsByClassName('game-console-element')[0];

        switch(event.target.getAttribute('data-type')){
            case 'console':
                elConsole.style.display = 'block';
                elElement.style.display = 'none';
                break;
            case 'element':
                elConsole.style.display = 'none';
                elElement.style.display = 'block';
                elElement.innerHTML = '';
                elElement.innerHTML = '<pre>' + ('<html>\n' + document.getElementsByTagName('html')[0].innerHTML + '\n</html>').replace(/[<]/g, '&lt;') + '</pre>';
                break;
            case 'hide':
                elOutput.style.display = 'block';
                event.target.setAttribute('data-type', 'show');
                event.target.innerText = 'HIDE';
                break;
            case 'show':
                elOutput.style.display = 'none';
                event.target.setAttribute('data-type', 'hide');
                event.target.innerText = 'SHOW';
            break;
            default: break;
        }
    });
    // document.getElementsByClassName('game-console-button')[0].addEventListener('touchstart', function(event){
    //     var elConsole = document.getElementsByClassName('game-console-message')[0];

    //     if (!elConsole.style.display || elConsole.style.display === 'none') {
    //         elConsole.style.display = 'block';
    //     }
    //     else {
    //         elConsole.style.display = 'none';
    //     }

    //     elConsole.scrollTop = elConsole.scrollHeight;
    // });
})(window, document, jQuery);
