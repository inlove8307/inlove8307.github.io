// NAMESPACE
this.Game = this.Game || {};

// CLASS TIMER
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Timer = function(seconds){
        this.init(seconds);
    };

    // PROTOTYPE
    var p = Timer.prototype;

    // PROPERTIES
    p.origin = null;
    p.count = null;
    p.total = null;
    p.time = null;

    // FUNCTIONS
    p.init = function(){};
    p.setTime = function(){};
    p.getTime = function(){};
    p.addSeconds = function(){};
    p.delSeconds = function(){};
    p.interval = function(){};

    Game.Timer = Timer;
})(window, document, jQuery);

// CLASS SCORE
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Score = function(){
        this.init();
    };

    // PROTOTYPE
    var p = Score.prototype;

    // PROPERTIES

    // FUNCTIONS
    p.init = function(){};
    p.setScore = function(){};
    p.getScore = function(){};
    p.addScore = function(){};
    p.delScore = function(){};

    Game.Score = Score;
})(window, document, jQuery);

// CLASS AUDIO
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Audio = function(){
        this.init();
    };

    // PROTOTYPE
    var p = Audio.prototype;

    // PROPERTIES

    // FUNCTIONS
    p.init = function(){};
    p.play = function(){};
    p.stop = function(){};

    Game.Audio = Audio;
})(window, document, jQuery);

// CLASS GRID
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Grid = function(row, col){
        this.init(row, col);
    };

    // PROTOTYPE
    var p = Grid.prototype;

    // PROPERTIES
    p.grid = null;
    p.row = null;
    p.col = null;
    p.total = null;
    p.count = 0;

    // FUNCTIONS
    p.init = function(row, col){
        this.row = row;
        this.col = col;
        this.total = row * col;

        this.setGrid();
    };

    p.setGrid = function(){
        var arr = [], i, j;

        for (i = 0; i < this.row; i++) {
            arr[i] = [];

            for (j = 0; j < this.col; j++) {
                arr[i][j] = false;
            }
        }

        this.grid = arr;
    };

    p.getGrid = function(){
        return this.grid;
    };

    p.setItem = function(row, col, unique){
        this.grid[row][col] = unique;
    };

    p.getItem = function(row, col){
        return this.grid[row][col];
    };

    p.destroy = function(row, col){
        this.grid[row][col] = false;
        this.setCount(-1);
    };

    p.setCount = function(count){
        this.count = this.count + count;
    };

    p.getCount = function(){
        return this.count;
    };

    p.getRandom = function(){
        var result = {};

        if (this.getCount() === this.total) return false;

        do {
            result.row = Math.floor(Math.random() * this.row);
            result.col = Math.floor(Math.random() * this.col);
        }
        while(this.grid[result.row][result.col]);

        this.setCount(+1);

        return result;
    };

    Game.Grid = Grid;

    // TEST
    // var grid = new Game.Grid();
    // grid.setGrid(3, 3);
    // console.log(grid.getRandom());
})(window, document, jQuery);

// CLASS ITEM
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Item = function(duration){
        this.init(duration);
    };

    // PROTOTYPE
    var p = Item.prototype;

    // PROPERTIES
    p.unique = null;
    p.status = null;
    p.current = 0;
    p.duration = 0;
    p.interval = null;

    // FUNCTIONS
    p.init = function(duration){
        this.duration = duration;
        this.status = [
            { value: 0, action: false },
            { value: 1, action: false },
            { value: 2, action: false },
            { value: 3, action: false },
            { value: 4, action: false }
        ];

        this.setUnique();
        this.setInterval();
    };

    p.setUnique = function(){
        this.unique = new Date().valueOf().toString();
    };

    p.getUnique = function(){
        return this.unique;
    };

    p.setStatus = function(index){
        if (this.current === this.status.length) return;

        this.current = index || this.current + 1;
    };

    p.getStatus = function(){
        return this.status[this.current];
    };

    p.setAction = function(index, action){
        this.status[index].action = action;

        console.log(this.status[index]);
    };

    p.getAction = function(){
        return this.status[this.current].action;
    };

    p.setInterval = function(duration){
        var me = this, unique;

        unique = this.getUnique();

        this.interval = setInterval(function(){
            if(me.getStatus().value < me.status.length-1) {
                me.callbackUpdate();
            }
            else {
                me.callbackDestroy();
            };
        }, duration || this.duration);
    };

    p.callbackUpdate = function(){ /* override code */ };

    p.callbackDestroy = function(){ /* override code */ };

    Game.Item = Item;

    // TEST
    // var item = new Game.Item();
    // item.callbackUpdate = function(){
    //     console.log('unique', this.unique);
    //     console.log('callback update', this.getStatus());
    // };
    // item.callbackDelete = function(){
    //     console.log('callback delete', this.getStatus());
    //     clearInterval(this.interval);
    // };
})(window, document, jQuery);

// CLASS VIEW
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var View = function(){
        this.init();
    };

    // PROTOTYPE
    var p = View.prototype;

    // PROPERTIES

    // FUNCTIONS
    p.init = function(){};

    Game.View = View;
})(window, document, jQuery);

// CLASS EVENT HANDLER
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Event = function(){
        this.init();
    };

    // PROTOTYPE
    var p = Event.prototype;

    // PROPERTIES

    // FUNCTIONS
    p.init = function(){};
    p.touchstart = function(){};
    p.touchmove = function(){};
    p.touchend = function(){};

    Game.Event = Event;
})(window, document, jQuery);

// CLASS PLAY
(function(window, document, $, undefined){
    "use strict";

    // CONSTRUCTOR
    var Play = function(){
        this.init();
    };

    // PROTOTYPE
    var p = Play.prototype;

    // PROPERTIES
    p.grid = null;
    p.interval = null;

    // FUNCTIONS
    p.init = function(){};
    p.createGrid = function(){};
    p.createItem = function(){};
    p.eventHandler = function(){};
    p.destroyItem = function(){};
    p.setInterval = function(){};

    Game.Play = Play;
})(window, document, jQuery);

// GAME TEST
(function(window, document, $, undefined){
    "use strict";

    // console.log(new Game.Timer());
    // console.log(new Game.Score());
    // console.log(new Game.Audio());
    // console.log(new Game.Grid());
    // console.log(new Game.Item());
    // console.log(new Game.View());
    // console.log(new Game.Play());

    /* ITEM SIZE SETTING */
    $('.game-grid-row').outerHeight($(window).height()/3);
    $('.game-grid-col').outerWidth($(window).width()/3);

    /* ITEM CREATE */
    var grid = new Game.Grid(3, 3);

    setInterval(function(){
        var index, item, unique, elRow, elCol, elItem;

        index = grid.getRandom();

        if (!index) return;

        item = new Game.Item(2000);

        grid.setItem(index.row, index.col, item);

        elRow = $('.game-grid-row').filter('[data-index='+ index.row +']');
        elCol = elRow.children().filter('[data-index='+ index.col +']');
        elItem = $('<button>');

        elItem.attr({
            'type': 'button',
            'id': item.getUnique(),
            'data-row': index.row,
            'data-col': index.col,
            'data-status': item.getStatus().value
        }).css({
            'display': 'none',
            'width': elCol.width(),
            'height': elCol.height()
        }).text(item.getStatus().value);

        elItem.on('touchstart', function(e){
            var status;

            status = item.getStatus();

            switch(status.value){
                case 1:
                    item.setAction(status.value, true);
                    item.setStatus();
                    clearInterval(item.interval);
                    item.setInterval();
                    break;
                case 3:
                    elItem
                    .css({ 'position': 'absolute' })
                    .animate({
                        'bottom': - elItem.height(),
                        'opacity': 0
                    },
                    {
                        'duration': 200,
                        'complete': function(){
                            grid.destroy(index.row, index.col);
                            elCol.empty();
                            clearInterval(item.interval);
                        }
                    });
                    break;
                case 4:
                    elItem.fadeOut(200, function(){
                        grid.destroy(index.row, index.col);
                        elCol.empty();
                        clearInterval(item.interval);
                    });
                    break;
            }

            $(this).text(item.getStatus().value);
            $(this).attr('data-status', item.getStatus().value);

            e.preventDefault();
        });

        elCol.append(elItem);

        elItem.fadeIn(200);

        item.callbackUpdate = function(){
            var status = this.getStatus();

            switch(status.value){
                case 0: this.setStatus(); break;
                case 1: status.action ? this.setStatus() : this.setStatus(4); break;
                case 2: this.setStatus(); break;
                case 3: status.action ? this.setStatus() : this.setStatus(4); break;
                default: 'unknown status';
            }

            elItem.text(this.getStatus().value);
            elItem.attr('data-status', this.getStatus().value);
        };

        item.callbackDestroy = function(item){
            if (this.getStatus().action) {
                grid.destroy(index.row, index.col);
                elCol.empty();
                clearInterval(this.interval);
            }

            elItem.text(this.getStatus().value);
            elItem.attr('data-status', this.getStatus().value);
        };
    }, 1000);
})(window, document, jQuery);
