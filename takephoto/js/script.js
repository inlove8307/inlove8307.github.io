// NAMESPACE
this.Game = this.Game || {};

// CLASS VIEW
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var View = function(origin){
        this.init(origin);
    };

    // PROTOTYPE
    var p = View.prototype;

    // DATA
    p.data = {
        'game-inner': { 'width': 800, 'height': 1265 },
        'game-list': { 'width': 0, 'height': 296, 'top': 176, 'left': 0 },
        'game-item-popcorn-muzi': { 'width': 250, 'height': 300 },
        'game-item-popcorn-neo': { 'width': 250, 'height': 300 },
        'game-item-popcorn-frodo': { 'width': 250, 'height': 300 },
        'game-item-popcorn-jayg': { 'width': 250, 'height': 300 },
        'game-item-popcorn-ryan': { 'width': 250, 'height': 300 },
        'game-item-popcorn-con': { 'width': 250, 'height': 300 },
        'game-item-popcorn-apeach': { 'width': 250, 'height': 300 },
        'game-item-popcorn-tube': { 'width': 250, 'height': 300 },
        'game-item-puzzle-muzi': { 'width': 250, 'height': 300 },
        'game-item-puzzle-neo': { 'width': 250, 'height': 300 },
        'game-item-puzzle-frodo': { 'width': 250, 'height': 300 },
        'game-item-puzzle-jayg': { 'width': 250, 'height': 300 },
        'game-item-puzzle-ryan': { 'width': 250, 'height': 300 },
        'game-item-puzzle-apeach': { 'width': 250, 'height': 300 },
        'game-item-puzzle-tube': { 'width': 250, 'height': 300 },
        'game-item-logo-emart': { 'width': 250, 'height': 300 },
        'game-item-logo-popcorn': { 'width': 250, 'height': 300 },
        'game-item-logo-puzzle': { 'width': 250, 'height': 300 },
        'game-phone': { 'width': 800, 'height': 1265, 'top': 0, 'left': 0 },
        'game-success': { 'width': 600, 'height': 370, 'top': 563, 'left': 100 },
        'game-success-popcorn-muzi': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-popcorn-neo': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-popcorn-frodo': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-popcorn-jayg': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-popcorn-ryan': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-popcorn-con': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-popcorn-apeach': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-popcorn-tube': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-puzzle-muzi': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-puzzle-neo': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-puzzle-frodo': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-puzzle-jayg': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-puzzle-ryan': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-puzzle-apeach': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-puzzle-tube': { 'width': 300, 'height': 185, 'top': 0, 'left': 0 },
        'game-success-logo-emart': { 'width': 300, 'height': 185, 'top': 0, 'left': 300 },
        'game-success-logo-popcorn': { 'width': 300, 'height': 185, 'top': 185, 'left': 0 },
        'game-success-logo-puzzle': { 'width': 300, 'height': 185, 'top': 185, 'left': 300 },
        'game-effect': { 'width': 592, 'height': 823, 'top': 106, 'left': 104 },
        'game-focus': { 'width': 260, 'height': 260, 'top': 176, 'left': 270 },
        'game-bubble-01': { 'width': 273, 'height': 97, 'top': 515, 'left': 267 },
        'game-bubble-02': { 'width': 209, 'height': 396, 'top': 869, 'left': 561 },
        'game-button-play': { 'width': 498, 'height': 188, 'top': 973, 'left': 151 },
        'game-button-stop': { 'width': 498, 'height': 188, 'top': 973, 'left': 151 }
    };

    // PROPERTIES
    p.ratio = null;
    p.items = {};

    // FUNCTIONS
    p.init = function(origin){
        this.setRatio(origin);
    };
    p.setRatio = function(origin){
        this.ratio = window.innerWidth / origin;
    };
    p.getRatio = function(){
        return this.ratio;
    };
    p.setItem = function(className, element){
        this.items[className] = element;
    };
    p.getItem = function(className){
        return this.items[className];
    };
    p.setResizeAll = function(dataObject){
        var data, key;

        data = dataObject || this.data;

        for (key in data) {
            this.setResize(key, data[key]);
        }
    };
    p.setResize = function(className, style){
        var ratio, elements, key, i, length;

        elements = document.getElementsByClassName(className);

        if (!elements) return;

        ratio = this.getRatio();

        for (key in style) {
            for (i = 0, length = elements.length; i < length; i++) {
                elements[i].style[key] = style[key] * ratio + 'px';
            }
        }

        this.setItem(className, elements[0]);
    };

    Game.View = View;

    // TEST
    // var view = new View(800);

    // view.setResizeAll(view.data);

    // window.addEventListener('resize', function(event){
    //     view.setRatio(800);
    //     view.setResizeAll(view.data);
    //     console.log(window.innerWidth);
    // });
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
    // var audio = new Game.Audio({
    //     'src': 'https://emartapp.emart.com/upload/regs/sound/everyday_emart.mp3',
    //     'type': 'audio/mpeg',
    //     'range': { 'start': 50, 'end': 55 },
    //     'props': { 'loop': true }
    // });

    // var elConsole = document.getElementsByClassName('game-console-button-wrap')[0],
    // elButtonOnPlay = document.createElement('button'),
    // elButtonOnPause = document.createElement('button');

    // elButtonOnPlay.innerText = 'PLAY';
    // elButtonOnPlay.setAttribute('type', 'button');
    // elButtonOnPlay.setAttribute('class', 'game-audio-play');
    // elButtonOnPlay.addEventListener('touchstart', function(event){
    //     console.log('event : touchstart', event.target);

    //     audio.play();
    // });

    // elButtonOnPause.innerText = 'STOP';
    // elButtonOnPause.setAttribute('type', 'button');
    // elButtonOnPause.setAttribute('class', 'game-audio-pause');
    // elButtonOnPause.addEventListener('touchstart', function(event){
    //     console.log('event : touchstart', event.target);

    //     audio.pause();
    // });

    // elConsole.appendChild(elButtonOnPause);
    // elConsole.appendChild(elButtonOnPlay);
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
        // 리스트 아이템
        'list': [
            // 팝콘
            { 'code': 'P00', 'class': 'game-item-popcorn-ryan' }, // 라이언
            { 'code': 'P01', 'class': 'game-item-popcorn-muzi' }, // 무지
            { 'code': 'P02', 'class': 'game-item-popcorn-con' }, // 콘
            { 'code': 'P03', 'class': 'game-item-popcorn-neo' }, // 네오
            { 'code': 'P04', 'class': 'game-item-popcorn-frodo' }, // 프로도
            { 'code': 'P05', 'class': 'game-item-popcorn-jayg' }, // 제이지
            { 'code': 'P06', 'class': 'game-item-popcorn-apeach' }, // 어피치
            { 'code': 'P07', 'class': 'game-item-popcorn-tube' }, // 튜브
            // 사천성
            { 'code': 'M00', 'class': 'game-item-puzzle-ryan' }, // 라이언
            { 'code': 'M01', 'class': 'game-item-puzzle-muzi' }, // 무지
            { 'code': 'M02', 'class': 'game-item-puzzle-neo' }, // 네오
            { 'code': 'M03', 'class': 'game-item-puzzle-frodo' }, // 프로도
            { 'code': 'M04', 'class': 'game-item-puzzle-jayg' }, // 제이지
            { 'code': 'M05', 'class': 'game-item-puzzle-apeach' }, // 어피치
            { 'code': 'M06', 'class': 'game-item-puzzle-tube' }, // 튜브
            // 로고
            { 'code': 'L00', 'class': 'game-item-logo-emart' }, // 이마트
            { 'code': 'L01', 'class': 'game-item-logo-popcorn' }, // 팝콘
            { 'code': 'L02', 'class': 'game-item-logo-puzzle' } // 사천성
        ],
        // 성공한 아이템
        'success': {
            // 선택
            'user': {
                // 팝콘
                'P00': { 'code': 'P00', 'class': 'game-success-popcorn-ryan' }, // 라이언
                'P01': { 'code': 'P01', 'class': 'game-success-popcorn-muzi' }, // 무지
                'P02': { 'code': 'P02', 'class': 'game-success-popcorn-con' }, // 콘
                'P03': { 'code': 'P03', 'class': 'game-success-popcorn-neo' }, // 네오
                'P04': { 'code': 'P04', 'class': 'game-success-popcorn-frodo' }, // 프로도
                'P05': { 'code': 'P05', 'class': 'game-success-popcorn-jayg' }, // 제이지
                'P06': { 'code': 'P06', 'class': 'game-success-popcorn-apeach' }, // 어피치
                'P07': { 'code': 'P07', 'class': 'game-success-popcorn-tube' }, // 튜브
                // 사천성
                'M00': { 'code': 'M00', 'class': 'game-success-puzzle-ryan' }, // 라이언
                'M01': { 'code': 'M01', 'class': 'game-success-puzzle-muzi' }, // 무지
                'M02': { 'code': 'M02', 'class': 'game-success-puzzle-neo' }, // 네오
                'M03': { 'code': 'M03', 'class': 'game-success-puzzle-frodo' }, // 프로도
                'M04': { 'code': 'M04', 'class': 'game-success-puzzle-jayg' }, // 제이지
                'M05': { 'code': 'M05', 'class': 'game-success-puzzle-apeach' }, // 어피치
                'M06': { 'code': 'M06', 'class': 'game-success-puzzle-tube' } // 튜브
            },
            'logo': [
                // 로고
                { 'code': 'L00', 'class': 'game-success-logo-emart' }, // 이마트
                { 'code': 'L01', 'class': 'game-success-logo-popcorn' }, // 팝콘
                { 'code': 'L02', 'class': 'game-success-logo-puzzle' } // 사천성
            ]
        }
    };

    // PROPERTIES
    p.code = null;
    p.clone = null;

    // FUNCTIONS
    p.init = function(code, clone){
        this.code = code || this.code || null;
        this.clone = clone || this.clone || null;
    };
    p.getItems = function(count){
        var data, items, i, j, length;

        if (!this.data || !this.code || !this.clone) return;

        data = this.data['list'].slice(0);

        items = [];

        for (i = 0; i < data.length; i++) {
            if (this.code === data[i]['code']) {
                // 선택 캐릭터 중복 추가
                for (j = 0; j < this.clone; j++) {
                    items.push(data[i]);
                }
            }
            else {
                items.push(data[i]);
            }
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
    p.getSuccess = function(code){
        var items, data, i, length;

        data = this.data['success']['logo'].slice(0);

        items = [];

        items.push(this.data['success']['user'][code]);

        for (i = 0, length = data.length; i < length; i++) {
            items.push(data[i]);
        }

        return items;
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
    p.view = null;
    p.item = null;
    p.effect = null;

    // FUNCTIONS
    p.init = function(config){
        this.config = config;

        this.view = new Game.View(800);
        this.view.setResizeAll();

        this.item = new Game.Item(this.config.code, this.config.clone);
        this.createItem(this.item.getItems());
        this.createSuccess(this.item.getSuccess(this.config.code));

        this.effect = new Game.Audio({
            'src': 'assets/audio/effect.mp3',
            'type': 'audio/mpeg'
        });

        this.addEventListener();
    };
    p.createItem = function(items){
        var list, item, width, i, length;

        list = this.view.getItem('game-list');

        for (i = 0, length = items.length; i < length; i++) {
            item = document.createElement('span');
            item.setAttribute('class', items[i]['class']);
            item.setAttribute('data-code', items[i]['code']);
            list.appendChild(item);

            this.view.setResize(items[i]['class'], this.view.data[items[i]['class']]);

            if (!width) width = this.view.data[items[i]['class']].width * items.length;
        }

        this.view.setResize(list.getAttribute('class'), { 'width': width });
    };
    p.createSuccess = function(items){
        var list, item, width, i, length;

        list = this.view.getItem('game-success');

        for (i = 0, length = items.length; i < length; i++) {
            item = document.createElement('span');

            if (this.config.success.indexOf(items[i]['code']) === -1) {
                item.setAttribute('class', items[i]['class']);
            }
            else {
                item.setAttribute('class', items[i]['class'] + ' on');
            }

            list.appendChild(item);

            this.view.setResize(items[i]['class'], this.view.data[items[i]['class']]);
        }
    };
    p.animateItem = function($list){
        var me, list, width;

        me = this;
        width = $list.children().width();

        $list.animate({ 'margin-left': - width }, {
            'easing': 'linear',
            'duration': me.config.speed,
            'complete': function(){
                $(this).css('margin-left', 0);
                $(this).append($(this).children().first());
                me.animateItem($(this));
            }
        });
    };
    p.animateTake = function($list, $effect, $focus){
        var check;

        $list.stop(true);

        $effect.fadeIn(200, function(){
            $(this).fadeOut(100);
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
    p.eventHandlerPlay = function(evnet){
        this.animateItem($('.game-list'));
        $(event.target).hide().next().show();
    };
    p.eventHandlerStop = function(event){
        this.effect.play();
        this.animateTake($('.game-list'), $('.game-effect'), $('.game-focus'));
    };
    p.addEventListener = function(){
        $('.game-button-play').on('touchstart', this.eventHandlerPlay.bind(this));
        $('.game-button-stop').on('touchstart', this.eventHandlerStop.bind(this));
    };

    Game.Play = Play;
})(window, document, jQuery);

// GAME TEST
(function(window, document, $, undefined){
    "use strict";

    var play = new Game.Play({
        'code': 'P03', // 선택 캐릭터 코드 (ajax response data)
        'clone': 3, // 선택 캐릭터 중복 출현 빈도
        'speed': 250, // 캐릭터 슬라이드 속도
        'ratio': 0.5, // 캐릭터 영역 내부 체크 비율 (0.0 ~ 1.0)
        'range': 80, // 픽업 시 성공 영역 비율 (0~100)
        'success': [ 'L00', 'L01', 'L02' ] // 성공한 아이템 코드 (ajax response data)
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
                elConsole.scrollTop = elConsole.scrollHeight;
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
})(window, document, jQuery);
