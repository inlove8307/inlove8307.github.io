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
        'game-list': { 'width': 4500, 'height': 296, 'top': 176, 'left': 0 },
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
        'game-status': { 'width': 596, 'height': 368, 'top': 563, 'left': 102 },
        'game-status-popcorn-muzi': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-popcorn-neo': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-popcorn-frodo': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-popcorn-jayg': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-popcorn-ryan': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-popcorn-con': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-popcorn-apeach': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-popcorn-tube': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-puzzle-muzi': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-puzzle-neo': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-puzzle-frodo': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-puzzle-jayg': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-puzzle-ryan': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-puzzle-apeach': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-puzzle-tube': { 'width': 298, 'height': 185, 'top': 0, 'left': 0 },
        'game-status-logo-emart': { 'width': 298, 'height': 183, 'top': 0, 'left': 298 },
        'game-status-logo-popcorn': { 'width': 298, 'height': 183, 'top': 185, 'left': 0 },
        'game-status-logo-puzzle': { 'width': 298, 'height': 183, 'top': 185, 'left': 298 },
        'game-effect': { 'width': 592, 'height': 823, 'top': 106, 'left': 104 },
        'game-focus': { 'width': 260, 'height': 260, 'top': 176, 'left': 270 },
        'game-bubble-01': { 'width': 273, 'height': 97, 'top': 515, 'left': 267 },
        'game-bubble-02': { 'width': 209, 'height': 396, 'top': 869, 'left': 561 },
        'game-button-play': { 'width': 498, 'height': 188, 'top': 973, 'left': 151 },
        'game-button-stop': { 'width': 498, 'height': 188, 'top': 973, 'left': 151 },
        'game-load': { 'width': 800, 'height': 2781, 'top': 0, 'left': 0 },
        'game-load-logo': {'width': 400, 'height': 400, 'top': 400, 'left': 200 },
        'game-layer': { 'width': 800, 'height': 2781, 'top': 0, 'left': 0 },
        'game-select': { 'width': 776, 'height': 1328, 'top': 0, 'left': 12 },
        'game-select-popcorn': { 'width': 296, 'height': 202, 'top': 285, 'left': 84 },
        'game-select-puzzle': { 'width': 296, 'height': 202, 'top': 285, 'left': 396 },
        'game-select-list-popcorn': { 'width': 606, 'height': 534, 'top': 532, 'left': 85 },
        'game-select-list-puzzle': { 'width': 606, 'height': 534, 'top': 532, 'left': 85 },
        'game-select-popcorn-muzi': { 'width': 142, 'height': 254, 'top': 0, 'left': 0 },
        'game-select-popcorn-apeach': { 'width': 142, 'height': 254, 'top': 0, 'left': 155 },
        'game-select-popcorn-frodo': { 'width': 142, 'height': 254, 'top': 0, 'left': 310 },
        'game-select-popcorn-neo': { 'width': 142, 'height': 254, 'top': 0, 'left': 464 },
        'game-select-popcorn-tube': { 'width': 142, 'height': 254, 'top': 280, 'left': 0 },
        'game-select-popcorn-jayg': { 'width': 142, 'height': 254, 'top': 280, 'left': 155 },
        'game-select-popcorn-ryan': { 'width': 142, 'height': 254, 'top': 280, 'left': 310 },
        'game-select-popcorn-con': { 'width': 142, 'height': 254, 'top': 280, 'left': 464 },
        'game-select-puzzle-muzi': { 'width': 142, 'height': 254, 'top': 0, 'left': 0 },
        'game-select-puzzle-apeach': { 'width': 142, 'height': 254, 'top': 0, 'left': 155 },
        'game-select-puzzle-frodo': { 'width': 142, 'height': 254, 'top': 0, 'left': 310 },
        'game-select-puzzle-neo': { 'width': 142, 'height': 254, 'top': 0, 'left': 464 },
        'game-select-puzzle-tube': { 'width': 142, 'height': 254, 'top': 280, 'left': 0 },
        'game-select-puzzle-jayg': { 'width': 142, 'height': 254, 'top': 280, 'left': 155 },
        'game-select-puzzle-ryan': { 'width': 142, 'height': 254, 'top': 280, 'left': 310 },
        'game-button-select': { 'width': 349, 'height': 90, 'top': 1125, 'left': 212 },
        'game-success': { 'width': 776, 'height': 514, 'top': 700, 'left': 12 },
        'game-fail': { 'width': 776, 'height': 514, 'top': 700, 'left': 12 },
        'game-button-success-close': { 'width': 349, 'height': 90, 'top': 300, 'left': 224 },
        'game-button-fail-close': { 'width': 349, 'height': 90, 'top': 300, 'left': 224 }
    };

    // PROPERTIES
    p.origin = null;
    p.device = null;
    p.ratio = null;
    p.items = {};

    // FUNCTIONS
    p.init = function(origin){
        this.setOrigin(origin);
        this.setDevice(window.innerWidth);
        this.setRatio(origin);
        this.addEventListener(window, 'resize', 'eventHandlerResize');
    };
    p.setDevice = function(width){
        this.device = width;
    };
    p.getDevice = function(){
        return this.device;
    };
    p.setOrigin = function(origin){
        this.origin = origin;
    };
    p.getOrigin = function(){
        return this.origin;
    };
    p.setRatio = function(origin){
        this.ratio = this.getDevice() / origin;
    };
    p.getRatio = function(){
        return this.ratio;
    };
    p.setData = function(data){
        this.data = data;
    };
    p.getData = function(){
        return this.data;
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
    p.eventHandlerResize = function(event){
        if (this.getDevice() === event.target.innerWidth) return;

        this.setDevice(event.target.innerWidth);
        this.setRatio(this.getOrigin());
        this.setResizeAll(this.getData());
    };
    p.addEventListener = function(target, event, handler){
        target.addEventListener(event, this[handler].bind(this));
    };

    Game.View = View;
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
    p.data = [
        // 팝콘
        { 'code': 'C01', 'item-class': 'game-item-popcorn-ryan', 'status-class': 'game-status-popcorn-ryan' }, // 라이언
        { 'code': 'C02', 'item-class': 'game-item-popcorn-muzi', 'status-class': 'game-status-popcorn-muzi' }, // 무지
        { 'code': 'C03', 'item-class': 'game-item-popcorn-con', 'status-class': 'game-status-popcorn-con' }, // 콘
        { 'code': 'C04', 'item-class': 'game-item-popcorn-neo', 'status-class': 'game-status-popcorn-neo' }, // 네오
        { 'code': 'C05', 'item-class': 'game-item-popcorn-frodo', 'status-class': 'game-status-popcorn-frodo' }, // 프로도
        { 'code': 'C06', 'item-class': 'game-item-popcorn-jayg', 'status-class': 'game-status-popcorn-jayg' }, // 제이지
        { 'code': 'C07', 'item-class': 'game-item-popcorn-apeach', 'status-class': 'game-status-popcorn-apeach' }, // 어피치
        { 'code': 'C08', 'item-class': 'game-item-popcorn-tube', 'status-class': 'game-status-popcorn-tube' }, // 튜브
        // 사천성
        { 'code': 'C09', 'item-class': 'game-item-puzzle-ryan', 'status-class': 'game-status-puzzle-ryan' }, // 라이언
        { 'code': 'C10', 'item-class': 'game-item-puzzle-muzi', 'status-class': 'game-status-puzzle-muzi' }, // 무지
        { 'code': 'C11', 'item-class': 'game-item-puzzle-neo', 'status-class': 'game-status-puzzle-neo' }, // 네오
        { 'code': 'C12', 'item-class': 'game-item-puzzle-frodo', 'status-class': 'game-status-puzzle-frodo' }, // 프로도
        { 'code': 'C13', 'item-class': 'game-item-puzzle-jayg', 'status-class': 'game-status-puzzle-jayg' }, // 제이지
        { 'code': 'C14', 'item-class': 'game-item-puzzle-apeach', 'status-class': 'game-status-puzzle-apeach' }, // 어피치
        { 'code': 'C15', 'item-class': 'game-item-puzzle-tube', 'status-class': 'game-status-puzzle-tube' }, // 튜브
        // 로고
        { 'code': 'LE', 'item-class': 'game-item-logo-emart', 'status-class': 'game-status-logo-emart' }, // 이마트
        { 'code': 'LP', 'item-class': 'game-item-logo-popcorn', 'status-class': 'game-status-logo-popcorn' }, // 팝콘
        { 'code': 'LM', 'item-class': 'game-item-logo-puzzle', 'status-class': 'game-status-logo-puzzle' } // 사천성
    ];

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

        data = this.data.slice(0);

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
    p.getStatus = function(code){
        var items, data, i, length;

        data = this.data.slice(0);

        items = [];

        for (i = 0, length = data.length; i < length; i++) {
            if (data[i]['code'] === code || data[i]['code'][0] === 'L') {
                items.push(data[i]);
            }
        }

        return items;
    };

    Game.Item = Item;
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
    p.loaded = false;
    p.select = null;
    p.interval = null;
    p.view = null;
    p.item = null;
    p.effect = null;
    p.dev = false;

    // FUNCTIONS
    p.init = function(config){
        this.config = config;

        this.view = new Game.View(800);
        this.view.setResizeAll();

        this.effect = new Howl({
            src: ['assets/audio/effect.mp3']
        });

        this.addEventListener();
        this.setIntervalLoad();

        this.dev = true;
    };
    p.createAll = function(){
        this.item = new Game.Item(this.config.code, this.config.clone);
        this.createItem(this.item.getItems());
        this.createStatus(this.item.getStatus(this.config.code));
    };
    p.createItem = function(items){
        var list, item, style, i, length;

        list = this.view.getItem('game-list');

        if (this.dev) $(list).empty();

        for (i = 0, length = items.length; i < length; i++) {
            style = this.view.data[items[i]['item-class']];

            item = document.createElement('span');
            item.setAttribute('class', items[i]['item-class']);
            item.setAttribute('data-code', items[i]['code']);
            list.appendChild(item);

            this.view.setResize(items[i]['item-class'], style);
        }

        this.view.setResize(list.getAttribute('class'), { 'width': style.width * length });
    };
    p.createStatus = function(items){
        var list, item, width, i, length;

        list = this.view.getItem('game-status');

        if (this.dev) $(list).empty();

        for (i = 0, length = items.length; i < length; i++) {
            item = document.createElement('span');

            if (this.config.success[items[i]['code']]) {
                item.setAttribute('class', items[i]['status-class'] + ' on');
            }
            else {
                item.setAttribute('class', items[i]['status-class']);
            }

            list.appendChild(item);

            this.view.setResize(items[i]['status-class'], this.view.data[items[i]['status-class']]);
        }
    };
    p.animateList = function($list){
        var me, list, width;

        me = this;
        width = $list.children().width();

        if (this.dev) $list.css('left', 0);

        $list.animate({ 'left': - width }, {
            'easing': 'linear',
            'duration': me.config.speed,
            'complete': function(){
                $(this).css('left', 0);
                $(this).append($(this).children().first());

                me.animateList($(this));
            }
        });
    };
    p.animateTake = function($list, $effect, $focus){
        var me = this;

        $list.stop(true);

        $effect.fadeIn(200, function(){
            $(this).fadeOut(100, function(){
                me.showLayerPopup($list, $focus);
            });
        });
    };
    p.showLayerSelect = function(){
        $(this.view.getItem('game-layer')).fadeIn();
        $(this.view.getItem('game-select')).fadeIn();

        this.select = 'C02';
    };
    p.showLayerPopup = function($list, $focus){
        var isSuccess;

        isSuccess = this.checkSuccess(this.getSelectCode($list, $focus));

        if (isSuccess) {
            $(this.view.getItem('game-layer')).fadeIn();
            $(this.view.getItem('game-success')).fadeIn();
            this.createStatus(this.item.getStatus(this.config.code));
        }
        else {
            $(this.view.getItem('game-layer')).fadeIn();
            $(this.view.getItem('game-fail')).fadeIn();
        }
    };
    p.getSelectCode = function($list, $focus){
        var result, offset = {}, items;

        offset.focus = {};
        offset.focus.width = $focus.outerWidth();
        offset.focus.left = $focus.offset().left;
        offset.focus.right = offset.focus.left + offset.focus.width;

        offset.focus.left = offset.focus.left - (offset.focus.width * this.config.ratio / 2);
        offset.focus.right = offset.focus.right + (offset.focus.width * this.config.ratio / 2);

        items = $list.children();

        $.each(items, function(index){
            offset.item = {};
            offset.item.width = $(this).outerWidth();
            offset.item.left = $(this).offset().left;
            offset.item.right = offset.item.left + offset.item.width;

            if (offset.item.left > offset.focus.left && offset.item.right < offset.focus.right) {
                result = $(this).data('code');
            }
        });

        return result;
    };
    p.checkSuccess = function(code){
        // 초점이 맞지 않았을 경우
        if (!code) return false;
        // 선택한 캐릭터 또는 로고가 아닌 경우
        if (this.config.success[code] === undefined) return false;
        // 이미 성공한 캐릭터 또는 로고일 경우
        if (this.config.success[code]) return false;

        this.config.success[code] = true;

        return true;
    };
    p.setIntervalLoad = function(){
        this.interval = setInterval(this.eventHandlerInterval.bind(this), 3000);
    };
    p.eventHandlerSelectPopcorn = function(event){
        $(this.view.getItem('game-select-popcorn')).addClass('on');
        $(this.view.getItem('game-select-list-popcorn')).addClass('on');
        $(this.view.getItem('game-select-popcorn-muzi')).addClass('on');

        this.select = 'C02';

        $(this.view.getItem('game-select-puzzle')).removeClass('on');
        $(this.view.getItem('game-select-list-puzzle')).removeClass('on');
        $(this.view.getItem('game-select-list-puzzle')).children().removeClass('on');
    };
    p.eventHandlerSelectPuzzle = function(event){
        $(this.view.getItem('game-select-puzzle')).addClass('on');
        $(this.view.getItem('game-select-list-puzzle')).addClass('on');
        $(this.view.getItem('game-select-puzzle-muzi')).addClass('on');

        this.select = 'C10';

        $(this.view.getItem('game-select-popcorn')).removeClass('on');
        $(this.view.getItem('game-select-list-popcorn')).removeClass('on');
        $(this.view.getItem('game-select-list-popcorn')).children().removeClass('on');
    };
    p.eventHandlerSelectCharacter = function(event){
        $(event.target).addClass('on').siblings().removeClass('on');

        this.select = $(event.target).data('code');
    };
    p.eventHandlerSelectComplete = function(event){
        this.config.code = this.select;
        this.config.success[this.config.code] = false;

        this.createAll();

        $(this.view.getItem('game-layer')).fadeOut();
        $(this.view.getItem('game-select')).fadeOut();
    };
    p.eventHandlerPlay = function(event){
        if (this.dev) {
            this.createItem(this.item.getItems());
            this.createStatus(this.item.getStatus(this.config.code));
        }

        this.animateList($('.game-list'));

        event.target.style.display = 'none';
    };
    p.eventHandlerStop = function(event){
        this.effect.play();

        this.animateTake($('.game-list'), $('.game-effect'), $('.game-focus'));

        if (this.dev) this.view.getItem('game-button-play').style.display = 'inline-block';
    };
    p.eventHandlerClose = function(){
        $(this.view.getItem('game-layer')).fadeOut();
        $(this.view.getItem('game-success')).fadeOut();
        $(this.view.getItem('game-fail')).fadeOut();
    };
    p.eventHandlerInterval = function(){
        if (this.loaded) {
            $(this.view.getItem('game-load')).fadeOut();
            clearInterval(this.interval);

            if (this.config.code) {
                this.createAll();
            }
            else {
                this.showLayerSelect();
            }
        }
    };
    p.eventHandlerLoad = function(event){
        this.loaded = true;
    };
    p.addEventListener = function(){
        this.view.getItem('game-button-play').addEventListener('touchstart', this.eventHandlerPlay.bind(this));
        this.view.getItem('game-button-stop').addEventListener('touchstart', this.eventHandlerStop.bind(this));
        this.view.getItem('game-button-success-close').addEventListener('touchstart', this.eventHandlerClose.bind(this));
        this.view.getItem('game-button-fail-close').addEventListener('touchstart', this.eventHandlerClose.bind(this));
        this.view.getItem('game-select-popcorn').addEventListener('touchstart', this.eventHandlerSelectPopcorn.bind(this));
        this.view.getItem('game-select-puzzle').addEventListener('touchstart', this.eventHandlerSelectPuzzle.bind(this));
        this.view.getItem('game-select-popcorn-muzi').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-popcorn-neo').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-popcorn-frodo').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-popcorn-jayg').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-popcorn-ryan').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-popcorn-con').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-popcorn-apeach').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-popcorn-tube').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-puzzle-muzi').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-puzzle-neo').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-puzzle-frodo').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-puzzle-jayg').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-puzzle-ryan').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-puzzle-apeach').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-select-puzzle-tube').addEventListener('touchstart', this.eventHandlerSelectCharacter.bind(this));
        this.view.getItem('game-button-select').addEventListener('touchstart', this.eventHandlerSelectComplete.bind(this));
        window.addEventListener('load', this.eventHandlerLoad.bind(this));
    };

    Game.Play = Play;
})(window, document, jQuery);

// GAME TEST
(function(window, document, $, undefined){
    "use strict";

    var response, options;

    response = {
        'inToday': 'N',
        'M3C': 'N',
        'LE': 'N',
        'LP': 'N',
        'LM': 'N',
        'missionClear3': 'N'
    };

    options = {
        'code': false, // 선택 캐릭터 코드 (set response data)
        'inToday': false, // 당일 미션 참가 여부 (set response data)
        'missionClear3': false, // 미션 완료 여부 (set response data)
        'success': {
            'LE': false, // 이마트 로고 성공 여부 (set response data)
            'LP': false, // 프렌즈팝콘 로고 성공 여부 (set response data)
            'LM': false // 프렌즈사천성 로고 성공 여부 (set response data)
        },
        'clone': 1, // 선택 캐릭터 중복 출현 빈도
        'speed': 300, // 캐릭터 슬라이드 속도
        'ratio': 0.3 // 캐릭터 체크 비율 (0.0 ~ 1.0)
    };

    // 캐릭터 선택 여부 (code or 'N')
    if (response['M3C'] !== 'N') options['code'] = response['M3C'];
    // 당일 게임 참가 여부 ('Y' or 'N')
    if (response['inToday'] === 'Y') options['inToday'] = true;
    // 미션 완료 여부 ('Y' or 'N')
    if (response['missionClear3'] === 'Y') options['missionClear3'] = true;
    // 캐릭터 선택한 경우 SUCCESS에 코드 추가
    if (options['code']) options.success[options['code']] = false;
    // 선택 캐릭터 성공 여부 ('Y' or 'N')
    if (response[options['code']] === 'Y') options.success[options['code']] = true;
    // 이마트 로고 성공 여부
    if (response['LE'] === 'Y') options.success['LE'] = true;
    // 프렌즈팝콘 로고 성공 여부
    if (response['LP'] === 'Y') options.success['LP'] = true;
    // 프렌즈사천성 로고 성공 여부
    if (response['LM'] === 'Y') options.success['LM'] = true;

    Game.today = new Game.Play(options);

    // var console = (function(oldConsole){
    //     var elConsole, elMessage, elButton, counter = 0;

    //     elConsole = document.getElementsByClassName('game-console-message')[0];
    //     elButton = document.getElementsByClassName('game-console-button')[0];

    //     return {
    //         log: function(text){
    //             oldConsole.log(text);

    //             elMessage = document.createElement('p');
    //             elMessage.setAttribute('class', 'log');
    //             elMessage.innerText = text;
    //             elConsole.appendChild(elMessage);
    //             elConsole.scrollTop = elConsole.scrollHeight;
    //             elButton.innerText = 'CONSOLE [' + (counter++) + ']';
    //         },
    //         info: function(text){
    //             oldConsole.info(text);

    //             elMessage = document.createElement('p');
    //             elMessage.setAttribute('class', 'info');
    //             elMessage.innerText = text;
    //             elConsole.appendChild(elMessage);
    //             elConsole.scrollTop = elConsole.scrollHeight;
    //         },
    //         warn: function(text){
    //             oldConsole.warn(text);

    //             elMessage = document.createElement('p');
    //             elMessage.setAttribute('class', 'warn');
    //             elMessage.innerText = text;
    //             elConsole.appendChild(elMessage);
    //             elConsole.scrollTop = elConsole.scrollHeight;
    //         },
    //         error: function(text){
    //             oldConsole.error(text);

    //             elMessage = document.createElement('p');
    //             elMessage.setAttribute('class', 'error');
    //             elMessage.innerText = text;
    //             elConsole.appendChild(elMessage);
    //             elConsole.scrollTop = elConsole.scrollHeight;
    //         }
    //     };
    // }(window.console));

    // window.console = console;

    // document.getElementsByClassName('game-console')[0].addEventListener('touchstart', function(event){
    //     var elOutput, elConsole, elElement;

    //     elOutput = document.getElementsByClassName('game-console-output')[0];
    //     elConsole = document.getElementsByClassName('game-console-message')[0];
    //     elElement = document.getElementsByClassName('game-console-element')[0];

    //     switch(event.target.getAttribute('data-type')){
    //         case 'console':
    //             elConsole.scrollTop = elConsole.scrollHeight;
    //             elConsole.style.display = 'block';
    //             elElement.style.display = 'none';
    //             break;
    //         case 'element':
    //             elConsole.style.display = 'none';
    //             elElement.style.display = 'block';
    //             elElement.innerHTML = '';
    //             elElement.innerHTML = '<pre>' + ('<html>\n' + document.getElementsByTagName('html')[0].innerHTML + '\n</html>').replace(/[<]/g, '&lt;') + '</pre>';
    //             break;
    //         case 'hide':
    //             elOutput.style.display = 'block';
    //             event.target.setAttribute('data-type', 'show');
    //             event.target.innerText = 'HIDE';
    //             break;
    //         case 'show':
    //             elOutput.style.display = 'none';
    //             event.target.setAttribute('data-type', 'hide');
    //             event.target.innerText = 'SHOW';
    //         break;
    //         default: break;
    //     }
    // });
})(window, document, jQuery);
