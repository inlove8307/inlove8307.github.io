(function(win, doc, $, undefined){
    "use strict";

    // soundjs & preloadjs
    // var queue = new createjs.LoadQueue();
    // createjs.Sound.alternateExtensions = ["mp3"];
    // queue.installPlugin(createjs.Sound);
    // queue.addEventListener("complete", handleComplete);
    // queue.loadManifest([
    //     {id:"BGM", src:"assets/audio/bgm.mp3"}
    // ]);

    // function handleComplete(event) {
    //     $('.layer-loading').fadeOut();
    //     $('.layer-start').fadeIn();
    // }
    // soundjs & preloadjs

    var Timer = function (seconds){
        this.view = {
            wrap: $('.timer-wrap'),
            bar: $('.timer-bar'),
            ico: $('.timer-ico')
        };

        this.origin = parseInt(seconds);
        this.count = parseInt(seconds);
        this.total = 0;
    };

    Timer.prototype = {
        init: function(){
            this.count = this.origin;
            this.total = 0;
            this.setView();
        },
        getTime: function(){
            var result = [], hour, minutes, seconds;

            hour = parseInt(this.count / 60 / 60);
            minutes = parseInt(this.count / 60 % 60);
            seconds = parseInt(this.count % 60);

            if (hour) {
                result.push(hour);
            }

            result.push(minutes);
            result.push(seconds);

            result = result.join(':').replace(/\b(\d)\b/g, "0$1");

            return result;
        },
        getPercent: function(){
            return this.count / this.origin * 100;
        },
        addSeconds: function(seconds){
            this.count += parseInt(seconds);
            this.setView(this.getTime());
        },
        update: function(milliseconds){
            var timer = this, interval;

            interval = setInterval(function(){
                if (timer.count) {
                    timer.count--;
                    timer.total++;
                    timer.setView();
                }
                else {
                    clearInterval(interval);
                    timer.callback();
                }
            }, 1000);
        },
        setView: function(){
            var temp, width, left;

            temp = this.getPercent();
            width = this.view.ico.width() / this.view.wrap.width() * 100;
            left = (temp <= width) ? 0 : temp - width;

            this.view.bar.css('width', temp - width + '%');
            this.view.ico.css('left', left + '%');
        },
        callback: function(){
            // override
            console.log('Timer End');
        }
    };

    var Score = function(unit){
        this.view = {
            text: $('.score-text')
        };

        this.unit = parseInt(unit);
        this.score = 0;
    };

    Score.prototype = {
        init: function(){
            this.score = 0;
            this.setView();
        },
        addScore: function(score){
            this.score += parseInt(score) || this.unit;
            this.setView();
        },
        getScore: function(score){
            var temp = score || this.score;

            return temp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        setView: function(){
            this.view.text.html(this.getScore());
        }
    };

    var Item = function(length){
        this.origin = [
            {
                'span': { 'tag': 'span', 'class': 'recipe-item', 'data-index': '01' },
                'img': { 'tag': 'img', 'alt': '토마토'}
            },
            {
                'span': { 'tag': 'span', 'class': 'recipe-item', 'data-index': '02' },
                'img': { 'tag': 'img', 'alt': '양상추'}
            },
            {
                'span': { 'tag': 'span', 'class': 'recipe-item', 'data-index': '03' },
                'img': { 'tag': 'img', 'alt': '햄'}
            },
            {
                'span': { 'tag': 'span', 'class': 'recipe-item', 'data-index': '04' },
                'img': { 'tag': 'img', 'alt': '양파'}
            },
            {
                'span': { 'tag': 'span', 'class': 'recipe-item', 'data-index': '05' },
                'img': { 'tag': 'img', 'alt': '치즈'}
            },
            {
                'span': { 'tag': 'span', 'class': 'recipe-item', 'data-index': '06' },
                'img': { 'tag': 'img', 'alt': '계란'}
            }
        ];
        this.static = {
            '00' : {
                'span': { 'tag': 'span', 'class': 'recipe-item', 'data-index': '00' },
                'img': { 'tag': 'img', 'alt': '식빵'}
            },
            '99' : {
                'span': { 'tag': 'span', 'class': 'recipe-item', 'data-index': '99' },
                'img': { 'tag': 'img', 'alt': '식빵'}
            }
        };
        this.count = length;
        this.stack = null;
        this.prev = null;
        this.url = 'assets/images/';
    };

    Item.prototype = {
        init: function(){
            this.stack = this.sortRandom(this.origin.slice());
        },
        getRandom: function(){
            var temp;

            do {
                temp = Math.floor(Math.random() * this.stack.length);

                if (this.prev === null) break;
            }
            while (this.prev === temp);

            return this.prev = temp;
        },
        sortRandom: function(array){
            var index = array.length, temp, random, result;

            while (0 !== index) {
                random = Math.floor(Math.random() * index);
                index -= 1;

                temp = array[index];
                array[index] = array[random];
                array[random] = temp;
            }

            return result = array.splice(0, this.count);
        },
        getRecipe: function(){
            var me = this, result, span, img, i, l;

            result = [];

            for (i = 0, l = this.stack.length; i < l; i++) {
                span = $('<' + this.stack[i]['span']['tag'] + '>');
                span.attr({
                    'class': this.stack[i]['span']['class'],
                    'data-index': this.stack[i]['span']['data-index']
                });

                img = $('<' + this.stack[i]['img']['tag'] + '>');
                img.attr({
                    'src': me.url + 'ico_recipe_' + this.stack[i]['span']['data-index'] + '_v2.png'
                });

                //result[(this.stack.length - 1) - i] = span.append(img);
                result[i] = span.append(img);
            }

            return result;
        },
        getStack: function(type, next){
            var me = this, item, span, img;

            switch(type){
                case '00': item = this.static['00']; break;
                case 'XX': item = this.stack[this.getRandom()]; break;
                case '99': item = this.static['99']; break;
                default: console.log('unknown item');
            }

            if (next) item = next;

            span = $('<' + item['span']['tag'] + '>');
            span.attr({
                'class': item['span']['class'],
                'data-index': item['span']['data-index']
            });

            img = $('<' + item['img']['tag'] + '>');
            img.attr({
                'src': me.url + 'img_item_' + item['span']['data-index'] + '.png'
            });

            return span.append(img);
        },
        callback: function(){
            // override
            console.log('callback');
        }
    };

    var Game = function(){
        this.view = {
            wrap: {
                view: $('.game-wrap'),
                img: $('.game-wrap>img')
            },
            recipe: {
                wrap: $('.recipe-wrap'),
                list: $('.recipe-list')
            },
            stack: {
                wrap: $('.stack-wrap'),
                list: $('.stack-list'),
                wait: $('.stack-wait'),
                next: $('.stack-next')
            },
            layer: {
                wrap: $('.layer-wrap'),
                start: $('.layer-start'),
                error: $('.layer-error'),
                result: $('.layer-result')
            },
            button: {
                wrap: $('.ctlr-wrap'),
                insert: $('.ctlr-insert button'),
                change: $('.ctlr-change button'),
                start: $('.ctlr-start button'),
                confirm: $('.ctlr-confirm button'),
                close: $('.ctlr-close button')
            }
        };

        this.timer = new Timer(60);
        this.score = new Score(100);
        this.item = new Item(6);

        this.next = 0;
        this.step = 0;
        this.combo = 0;
        this.overlap = 0.2;
        this.style = { 'bottom': 0, 'z-index': 0 };
        this.top = 100;
        this.bottom = 0;
        this.wrong = 0;
        this.delay = null;

        this.init(true);
    };

    Game.prototype = {
        init: function(check){
            var me = this;

            this.next = 0;
            this.step = 0;
            this.combo = 0;
            this.wrong = 0;
            this.bottom = 0;
            this.style['bottom'] = 0;
            this.style['z-index'] = 0;
            this.view.wrap.img.css('bottom', 0);

            this.timer.init();
            this.score.init();

            this.view.stack.list.empty();
            this.view.stack.list.append(this.item.getStack('00'));

            if (check) {
                this.item.init();
                this.setRecipe(this.item.stack);
                this.createItem('XX', false, 'init');
                //this.motionInit();
                //openRanking(this, this.view.layer.start);
            }
            this.timer.callback = function(){
                clearTimeout(me.delay);

                me.view.layer.wrap.hide();
                me.view.layer.error.hide();
                me.view.layer.result.show();

                me.view.layer.wrap.clearQueue();
                me.view.layer.wrap.fadeIn(function(){
                    me.view.stack.wait.stop(true, true);
                    me.view.stack.next.empty();
                    me.createItem('99', false);
                });

                //nowScoreInst(me.score.score, me.view.layer.result);
            };
        },
        action: function(action){
            switch(action){
                case 'start':
                    // if(loginCheck()) {
                    //     if(appCheck()) this.start();
                    // }
                    this.start();
                    break;
                case 'insert': this.insert(); break;
                case 'change': this.change(); break;
                case 'confirm': this.confirm(); break;
                case 'close': this.close(); break;
                default: console.log('unknown action');
            }
        },
        start: function(){
            this.init(false);
            this.timer.update();

            this.view.layer.wrap.hide();
            this.view.layer.start.hide();

            this.view.button.insert.attr('disabled', false);
            this.view.button.change.attr('disabled', false);

            // createjs.Sound.stop('BGM');
            // createjs.Sound.play('BGM', {loop: 999});
        },
        motionInit: function(){
            var me = this;

            this.view.button.wrap.children('img').ready(function(){
                me.view.stack.wrap.css('bottom', me.view.button.wrap.height());
            });
        },
        motionRecipe: function(){
            var items, height;

            items = this.view.recipe.list.children();
            height = parseInt(items.height());

            this.view.recipe.list.animate({ 'top' : - height }, 200, 'swing', function(){
                $(this).children().first().remove();
                $(this).children().first().children().attr('src', function(){
                    var arr = $(this).attr('src').split('.png');
                    return arr[0] + '_on.png';
                });
                $(this).append($(this).children().first().clone());
                $(this).children().last().children().attr('src', function(){
                    var arr = $(this).attr('src').split('_on.png');
                    return arr[0] + '.png';
                });
                $(this).css('top', 0);
            });
        },
        motionStack: function(type){
            var me = this, wait, stack, list, item, top, offset, height;

            list = me.view.stack.list;
            wait = me.view.stack.wait;
            top = wait.css('top');
            stack = wait.children();
            height = stack.height() * this.overlap;

            offset = parseInt(list.children().first().offset().top) - height;

            me.style['z-index'] += 1;
            me.style['bottom'] += height;

            me.view.stack.wait.animate({ 'top': offset }, 200, 'swing', function(){
                list.prepend(stack.css(me.style));
                wait.empty().css('top', top);

                if (type === 'XX') me.createItem('XX', false, 'insert');
            });
        },
        motionList: function(){
            var me = this, stacks, height;

            stacks = me.view.stack.list.children();
            height = stacks.height() * this.overlap;

            //me.view.stack.list.height(height * me.item.count);
            me.style['bottom'] = parseInt(stacks.first().css('bottom'));

            stacks.animate({ 'bottom': '-=' + height }, 200, 'swing', function(){
                if (stacks.size() >= 10) stacks.last().remove();
            });
        },
        motionBackground: function(){
            var height;

            if (this.view.wrap.img.offset().top >= -100) return;

            height = this.view.stack.wait.children().height() * this.overlap * 1.5;
            this.bottom -= height;

            this.view.wrap.img.animate({ 'bottom': this.bottom }, 200);
        },
        insert: function(){
            var me = this, score;

            if (me.view.stack.wait.is(':animated')) return;

            if (!me.checkItem()) {
                me.combo = 0;
                me.error(2000);
                return;
            }

            score = me.score.unit;
            me.step++;
            me.combo++;
            me.wrong = 0;

            this.motionStack('XX');
            this.motionRecipe();

            if (me.step >= me.item.count) {
                this.motionList();
                this.motionBackground();
            }

            if (me.combo % 10 === 0) {
                score += Math.floor(Math.random() * me.score.unit) + 1;
                me.timer.addSeconds(5);
            }

            me.score.addScore(score);

            (me.next === me.item.count - 1) ? me.next = 0 : me.next++;
        },
        change: function(){
            if (this.wrong === this.item.count -1){
                this.createItem('XX', this.item.stack[this.next], 'change');
                this.wrong = 0;
            }
            else {
                this.createItem('XX', false, 'change');
                this.wrong++;
            }
        },
        confirm: function(){
            this.init(true);
            this.view.layer.result.hide();
            this.view.layer.start.show();
        },
        close: function(){
            location.assign('${HTTP_URL}/event/appEvent/sandwichMain.do');
        },
        setRecipe: function(){
            var me = this, list, item;

            list = this.view.recipe.list;
            list.empty().append(this.item.getRecipe());

            item = list.children().first();

            list.append(item.clone());

            item.children('img').attr('src', function(){
                var arr = $(this).attr('src').split('.png');
                return arr[0] + '_on.png';
            });
        },
        createItem: function(type, next, action){
            var me = this, tempWait, tempNext;

            if (this.view.stack.wait.is(':animated') || this.view.stack.next.is(':animated')) return;

            tempWait = parseInt(this.view.stack.wait.css('right'));
            tempNext = parseInt(this.view.stack.next.css('right'));

            if (type === '99') {
                this.view.stack.wait.empty();
                this.view.stack.wait.append(me.item.getStack(type, next));
                this.motionStack(type);
                return;
            }

            if (action === 'init') {
                this.view.stack.next.append(this.item.getStack(type, next));
            }

            this.view.stack.wait.stop(true, true).fadeOut(200);

            this.view.stack.next.stop(true, true).animate({ 'right': tempWait }, 200, 'swing', function(){
                me.view.stack.wait.empty();
                me.view.stack.wait.append(me.view.stack.next.children());
                me.view.stack.wait.show();

                me.view.stack.next.hide();
                me.view.stack.next.empty();
                me.view.stack.next.css('right', tempNext);

                me.view.stack.next.append(me.item.getStack(type, next));
                me.view.stack.next.show();
            });
        },
        checkItem: function(){
            var wait, index;

            wait = Number(this.view.stack.wait.children().data('index'));
            index = Number(this.item.stack[this.next]['span']['data-index']);

            return wait === index;
        },
        error: function(milliseconds){
            var me = this;

            this.view.layer.error.show();
            this.view.layer.wrap.show();

            this.delay = setTimeout(function(){
                me.view.layer.error.hide();
                me.view.layer.wrap.hide();
            }, milliseconds);
        }
    };

    var game = new Game();

    $('.game-wrap').on('touchstart', 'button' , function(e){
        game.action($(this).data('action'));
        e.preventDefault();
    });

    // function loginCheck() {
    //     if(!isLogin) {
    //         if(confirm('로그인이 필요합니다.\r\n로그인 하시겠습니까?')) {
    //             if(window.isApp){
    //                 emart.app.cmd('open_main_webpage', 'link=${HTTP_URL}/login/login.do?retUrl=/event/appEvent/sandwichMain.do');
    //             } else {
    //                 location.href = '${HTTP_URL}/login/login.do?retUrl=/event/appEvent/sandwichMain.do';
    //             }
    //         }
    //         return false;
    //     }else return true;
    // }

    // function appCheck() {
    //     // return true; //테스트시만 사용
    //     if(!isApp) {
    //          if(confirm('이마트앱에서만 참여가 가능합니다.\r\n이마트앱으로 이동 하시겠습니까?'))
    //          {
    //               event.preventDefault();

    //               emart.mobile.openApp({
    //                ios: {
    //                 uid: 'id397728319',
    //                 command: 'emart-today://open_main_webpage/?link=${HTTP_URL}/event/appEvent/sandwichMain.do'
    //                },
    //                android: {
    //                 uid: 'com.emart.today',
    //                 command: 'emart-today://open_main_webpage/?link=${HTTP_URL}/event/appEvent/sandwichMain.do'
    //                }
    //               });
    //          }
    //          return false;
    //     } else  return true;
    // }

    // function nowScoreInst(score, layer) {
    //     var f = document.f;
    //     f.target = '_self';
    //     f.action = '/event/appEvent/insertGame.do';
    //     f.etc1.value = score;

    //     var options = {
    //         url         :   f.action,
    //         dataType    :   'json',
    //         async       :   false,
    //         success :   function(data) {
    //             var jsonData= emart.isString(data) ? $.parseJSON(data) : data;
    //             if(jsonData.checkStatus == 'ok') {
    //                 layer.children('.layer-message').html(game.score.getScore());
    //             } else {
    //                 alert("점수등록이 되지 못했습니다.f5를 눌러 새로고침 후 게임을 진행해주세요!");
    //             }
    //         },
    //         error   :   function(data, status, xhr){
    //             alert('오류가 발생했습니다.\r\n잠시후 다시 이용해주세요.');
    //         }
    //     };
    //     $('#f').ajaxForm(options).submit();
    // }

    // function openRanking(game, layer) {
    //     var f, jsonData, userMap;

    //     if(!loginCheck()) return;

    //     f = document.f;
    //     f.target = '_self';
    //     f.action = '/event/appEvent/selectRank.do';

    //     $('#f').ajaxForm({
    //         url: f.action,
    //         dataType: 'json',
    //         async: false,
    //         success:   function(data) {
    //             var jsonData, userMap;

    //             jsonData = emart.isString(data) ? $.parseJSON(data) : data;
    //             userMap = jsonData.userMap;

    //             if(userMap && userMap.WIN_SCORE) {
    //                 layer.find('.layer-text').html(function(){
    //                     var result = '';

    //                     result += '나의 최고 점수는<br>';
    //                     result += '<em>' + game.score.getScore(userMap.WIN_SCORE) + '점</em> 입니다';

    //                     return result;
    //                 });
    //             }
    //         },
    //         error: function(data, status, xhr){
    //             alert('오류가 발생했습니다.\r\n잠시후 다시 이용해주세요.');
    //         }
    //     }).submit();
    // }
})(window, document, jQuery);