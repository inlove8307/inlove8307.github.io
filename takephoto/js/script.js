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
        'game-load-inner': {'width': 400, 'height': 400 },
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
        'game-button-stop': { 'width': 498, 'height': 188, 'top': 973, 'left': 151 }
    };

    // PROPERTIES
    p.origin = null;
    p.ratio = null;
    p.items = {};

    // FUNCTIONS
    p.init = function(origin){
        this.setOrigin(origin);
        this.setRatio(origin);
        // this.addEventListener(window, 'resize', 'eventHandlerResize');
    };
    p.setOrigin = function(origin){
        this.origin = origin;
    };
    p.getOrigin = function(){
        return this.origin;
    };
    p.setRatio = function(origin){
        this.ratio = window.innerWidth / origin;
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
        { 'code': 'P00', 'item-class': 'game-item-popcorn-ryan', 'status-class': 'game-status-popcorn-ryan' }, // 라이언
        { 'code': 'P01', 'item-class': 'game-item-popcorn-muzi', 'status-class': 'game-status-popcorn-muzi' }, // 무지
        { 'code': 'P02', 'item-class': 'game-item-popcorn-con', 'status-class': 'game-status-popcorn-con' }, // 콘
        { 'code': 'P03', 'item-class': 'game-item-popcorn-neo', 'status-class': 'game-status-popcorn-neo' }, // 네오
        { 'code': 'P04', 'item-class': 'game-item-popcorn-frodo', 'status-class': 'game-status-popcorn-frodo' }, // 프로도
        { 'code': 'P05', 'item-class': 'game-item-popcorn-jayg', 'status-class': 'game-status-popcorn-jayg' }, // 제이지
        { 'code': 'P06', 'item-class': 'game-item-popcorn-apeach', 'status-class': 'game-status-popcorn-apeach' }, // 어피치
        { 'code': 'P07', 'item-class': 'game-item-popcorn-tube', 'status-class': 'game-status-popcorn-tube' }, // 튜브
        // 사천성
        { 'code': 'M00', 'item-class': 'game-item-puzzle-ryan', 'status-class': 'game-status-puzzle-ryan' }, // 라이언
        { 'code': 'M01', 'item-class': 'game-item-puzzle-muzi', 'status-class': 'game-status-puzzle-muzi' }, // 무지
        { 'code': 'M02', 'item-class': 'game-item-puzzle-neo', 'status-class': 'game-status-puzzle-neo' }, // 네오
        { 'code': 'M03', 'item-class': 'game-item-puzzle-frodo', 'status-class': 'game-status-puzzle-frodo' }, // 프로도
        { 'code': 'M04', 'item-class': 'game-item-puzzle-jayg', 'status-class': 'game-status-puzzle-jayg' }, // 제이지
        { 'code': 'M05', 'item-class': 'game-item-puzzle-apeach', 'status-class': 'game-status-puzzle-apeach' }, // 어피치
        { 'code': 'M06', 'item-class': 'game-item-puzzle-tube', 'status-class': 'game-status-puzzle-tube' }, // 튜브
        // 로고
        { 'code': 'L00', 'item-class': 'game-item-logo-emart', 'status-class': 'game-status-logo-emart' }, // 이마트
        { 'code': 'L01', 'item-class': 'game-item-logo-popcorn', 'status-class': 'game-status-logo-popcorn' }, // 팝콘
        { 'code': 'L02', 'item-class': 'game-item-logo-puzzle', 'status-class': 'game-status-logo-puzzle' } // 사천성
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
    p.view = null;
    p.item = null;
    p.effect = null;
    p.dev = false;

    // FUNCTIONS
    p.init = function(config){
        this.config = config;

        this.view = new Game.View(800);
        this.view.setResizeAll();

        this.item = new Game.Item(this.config.code, this.config.clone);
        this.createItem(this.item.getItems());
        this.createStatus(this.item.getStatus(this.config.code));

        this.effect = new Howl({
            src: ['assets/audio/effect.mp3']
        });

        this.addEventListener();

        this.dev = true;
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

            if (this.config.success.indexOf(items[i]['code']) === -1) {
                item.setAttribute('class', items[i]['status-class']);
            }
            else {
                item.setAttribute('class', items[i]['status-class'] + ' on');
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
        var isTake;

        isTake = this.checkSuccess(this.getSelectCode($list, $focus));

        $list.stop(true);

        $effect.fadeIn(200, function(){
            $(this).fadeOut(100);
        });

        if (isTake.success) {
            this.createStatus(this.item.getStatus(this.config.code));
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
        var result = {}, check;

        check = [this.config.code, 'L00', 'L01', 'L02'];

        result.success = false;
        result.message = '[실패] 초점이 맞지 않습니다';

        if (!code) return result;

        result.message = '[실패] 선택한 캐릭터가 아닙니다';

        if (check.indexOf(code) < 0) return result;

        result.message = '[실패] 이미 카메라에 담은 캐릭터 또는 로고 입니다';

        if (this.config.success.indexOf(code) >= 0) return result;

        result.success = true;
        result.message = '[성공] 어쭈?';

        this.config.success.push(code);

        return result;
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
    p.eventHandlerLoad = function(event){
        $('.game-wrap').fadeIn();
        $('.game-load').fadeOut();
    };
    p.addEventListener = function(){
        this.view.getItem('game-button-play').addEventListener('touchstart', this.eventHandlerPlay.bind(this));
        this.view.getItem('game-button-stop').addEventListener('touchstart', this.eventHandlerStop.bind(this));
        window.addEventListener('load', this.eventHandlerLoad.bind(this));
    };

    Game.Play = Play;
})(window, document, jQuery);

// GAME TEST
(function(window, document, $, undefined){
    "use strict";

    var play = new Game.Play({
        'status': false, // 이벤트 참여 여부 (set response data)
        'code': 'P03', // 선택 캐릭터 코드 (set response data)
        'clone': 1, // 선택 캐릭터 중복 출현 빈도
        'speed': 250, // 캐릭터 슬라이드 속도
        'ratio': 0.3, // 캐릭터 영역 내부 체크 비율 (0.0 ~ 1.0)
        'success': [] // 성공한 아이템 코드 (set response data)
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
