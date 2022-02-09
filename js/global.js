var namespace = 'ROOT';

window[namespace] = window[namespace] || {};

(function(global){
  'use strict';

  var string = {};

  string.trim = function(value, type){
    var regexp = type
      ? { before: /^\s+/g, after: /\s+$/g, all: /\s/g }
      : /^\s+|\s+$/g;

    return value.replace(type ? regexp[type] : regexp, '');
  };

  string.pad = function(value, char, length, after){
    var result = String(value);

    while (result.length < length) {
      result = after
        ? result + String(char)
        : String(char) + result;
    }

    return result;
  };

  string.price = function(value){
    var result = String(value).split('.')
      , regexp = /\B(?=(\d{3})+(?!\d))/g;

    result[0] = result[0].replace(regexp, ',');

    return result.join('.');
  };

  global.string = string;
}(window[namespace]));

(function(global){
  'use strict';

  var location = (function(location){
    var parameters;

    parameters = (function(search){
      var array = !!search ? search.substr(1).split('&') : []
        , object = {};

      while (array.length) {
        array[0] = array[0].split('=');
        object[array[0][0]] = array[0][1];
        array.shift();
      }

      return object;
    }(location.search));

    return {
      parameters: parameters
    }
  }(window.location));

  global.location = location;
}(window[namespace]));

(function(global){
  'use strict';

  var json = (function(json){
    return {
      set: json.stringify,
      get: json.parse
    }
  }(window.JSON));

  global.json = json;
}(window[namespace]));

(function(global){
  'use strict';

  var observer = (function(){
    var object = {}
      , config = {
        attributes: true,
        childList: true,
        subtree: true
      };

    return {
      set: function(name, callback){
        object[name] = new MutationObserver(callback.bind(this));
      },
      get: function(name){
        return object[name]
      },
      add: function(name, target, option){
        var target = Array.isArray(target) ? target : [target]
          , key;

        while (target.length) {
          if (option) {
            for (key in config) {
              option[key] = option[key]
                ? option[key]
                : config[key];
            }
          }

          object[name].observe(target[0], option);
          target.shift();
        }
      },
      del: function(name){
        object[name].disconnect();
      },
    }
  }());

  global.observer = observer;
}(window[namespace]));

(function(global){
  'use strict';

  var console = (function(console){
    var $wrap = $('<section>', { class: 'debug' })
      , $inner = $('<article>', { class: 'debug-inner' })
      , $title = $('<h2>', { class: 'debug-title', text: 'DEBUG' })
      , $text = $('<div>', { class: 'debug-text' })
      , $button = $('<button>', { class: 'debug-button', text: 'D' })
      , $clear = $('<button>', { class: 'debug-clear', text: 'CLEAR' })
      , $style = $('<style>', {
        text: '\
          .debug{position:fixed;bottom:0;left:0;z-index:9999;width:100%;height:0vh;}\
          .debug-inner{display:flex;flex-flow:column;position:relative;width:100%;height:100%;border-top:1px solid rgba(0, 0, 0, 1);background-color:rgba(255, 255, 255, 0.95);}\
          .debug-title{margin:0;padding:2.77vw;border-bottom:1px solid rgba(0, 0, 0, 1);font-family:\'Noto Sans KR\';font-size:1.66vw;color:rgba(0, 0, 0, 1);}\
          .debug-text{overflow-x:hidden;overflow-y:auto;flex:1;margin:0;padding:2.77vw;}\
          .debug-text p{margin:0 0 2.77vw;padding:0;}\
          .debug-text span{font-family:\'Noto Sans KR\';font-size:1.66vw;color:rgba(0, 0, 0, 1);}\
          .debug-text i{margin-left:2.77vw;font-family:\'Noto Sans KR\';font-size:1.66vw;font-style:normal;color:rgba(0, 0, 0, 1);}\
          .debug-clear{position:absolute;top:2.77vw;right:2.77vw;border:0;background-color:transparent;font-family:\'Noto Sans KR\';font-size:1.66vw;color:rgba(0, 0, 0, 1);}\
          .debug-button{position:fixed;bottom:2.77vw;right:2.77vw;z-index:9999;margin:0;padding:0;width:6.94vw;height:6.94vw;border:1px solid rgba(255, 255, 255, 1);border-radius:100%;background-color:rgba(0, 0, 0, 1);font-weight:700;font-family:\'Noto Sans KR\';font-size:2.77vw;color:rgba(255, 255, 255, 1);}\
        '
      });

    return {
      log: function(text){
        var $prev = $text.find('p').eq(0)
          , count = 0;

        if ($prev.find('span').text() == text) {
          count = parseInt($prev.find('i').text()) + 1;
          $prev.find('i').css('visibility', 'visible').text(count);
        }
        else {
          $text.prepend($('<p>').append($('<span>', { text: text }), $('<i>', { css: { visibility: 'hidden' }, text: count })));
        }
      },
      add: function(){
        $('body').append($wrap, $button, $style);
        $wrap.append($inner.append($title, $text), $clear);

        $button.on('click', function(event){
          $wrap.height()
            ? $wrap.height(0)
            : $wrap.height('50vh');
        });

        $clear.on('click', function(event){
          $text.empty();
        });
      },
      del: function(){
        $wrap.remove();
        $button.remove();
        $style.remove();
      }
    }
  }(window.console));

  global.console = console;
}(window[namespace]));

(function(global){
  'use strict';

  function counter(number, speed, callback){
    var args = {
      number: number,
      speed: speed,
      count: 0,
      complete: false
    };

    var array, interval;

    function update(){
      array[1].unshift(array[0].pop());

      isNaN(parseInt(array[1][0]))
        ? update()
        : interval = increment(parseInt(array[1][0]));
    }

    function increment(count){
      var index = 0;

      return setInterval(function(){
        array[1][0] = index++;
        args.count = array[1].join('');
        callback(args);

        if (count < index) {
          clearInterval(interval);

          if (array[0].length) update();
          else {
            args.complete = true;
            callback(args);
          }
        }
      }, speed * 1000);
    }

    function reset(){
      clearInterval(interval);
      array = [String(number).split(''), []];
    }

    return {
      play: function(){
        reset();
        update();
      }
    }
  }

  global.counter = counter;
}(window[namespace]));

(function(global){
  'use strict';

  function parallax(params){
    var $els = params.$els
      , codes = params.codes;

    var props, offset, event, screen;

    props = (function(){
      var object = {};

      return {
        set: function(codes){
          for (var key in codes) {
            object[key] = codes[key];
          }
        },
        get: function(code){
          return code ? object[code] : object;
        }
      }
    }());

    offset = (function(){
      var object = {};

      return {
        set: function($els){
          $.each($els, function(index, item){
            var top = Math.floor($(item).offset().top);

            object[top] = object[top] || [];
            object[top].push(item);
          });
        },
        reset: function(){
          object = {};
          this.set($els);
        },
        get: function(){
          return object;
        }
      }
    }());

    screen = (function(){
      var object = {};

      return {
        set: function(){
          var top = $(window).scrollTop()
            , height = $(window).outerHeight();

          object.top = top;
          object.middle = top + (height / 5) * 4;
          object.bottom = top + height;
          object.height = height;
          object.document = $(document).outerHeight();
        },
        get: function(){
          return object;
        }
      }
    }());

    event = (function(){
      return {
        set: function(offset){
          var key, index, el, prop;

          for (key in offset) {
            index = -1;

            while (++index < offset[key].length) {
              el = offset[key][index];
              prop = props.get($(el).data('parallax'));

              if (prop) {
                TweenMax.set(el, prop.set);
                $(el).data('evented', false);
              }
            }
          }
        },
        to: function(offset, screen){
          for (var key in offset) {
            if (screen.middle > parseInt(key) || screen.top + screen.height == screen.document) {
              this.play(offset[key]);
            }

            if (screen.bottom < parseInt(key)) {
              this.reset(offset[key]);
            }
          }
        },
        play: function(target){
          var prop, index = -1;

          while (++index < target.length) {
            prop = props.get($(target[index]).data('parallax'));

            if (prop && !$(target[index]).data('evented')) {
              TweenMax.to(target[index], prop.duration, prop.to);
              $(target[index]).data('evented', true);
            }
          }
        },
        reset: function(target){
          var prop, index = -1;

          while (++index < target.length) {
            prop = props.get($(target[index]).data('parallax'));

            if (prop && $(target[index]).data('evented')) {
              TweenMax.set(target[index], prop.set);
              $(target[index]).data('evented', false);
            }
          };
        }
      }
    }());

    $(window).on('load', function(){
      global.console.log(['log', 'global.parallax', 'load'].join(' | '));
      screen.set();
      offset.set($els);
      props.set(codes);
      event.set(offset.get());
      event.to(offset.get(), screen.get());
    });

    $(window).on('scroll', function(){
      global.console.log(['log', 'global.parallax', 'scroll'].join(' | '));
      screen.set();
      event.to(offset.get(), screen.get());
    });
  };

  global.parallax = parallax;
}(window[namespace]));

(function(global){
  'use strict';

  var image = {};

  image.split = function($img, count){
    var array, effect, interval;

    function px(value){
      return [value, 'px'].join('');
    }

    function wrap(){
      var $el;

      $el = $('<span>', { css:{
        overflow: 'hidden',
        display: 'block',
        position: 'relative',
        width: [$img.width(), 'px'].join(''),
        height: [$img.height(), 'px'].join('')
      }});

      $el = $img.wrap($el).parent();
      $el.data('image-effect-wrap', true);
      $img.css({ width: '100%', position: 'relative', 'z-index': -1 });

      return $el;
    }

    function split(){
      var result = [], row, column;

      var width = $img.width() / count.column
        , height = $img.height() / count.row;

      for (row = 0; row < count.row; row++) {
        for (column = 0; column < count.column; column++) {
          result.push($('<ins>', { css: {
            position: 'absolute',
            top: px(row * height),
            left: px(column * width),
            width: px(width),
            height: px(height),
            'background-image': ['url(\'', $img.attr('src'), '\')'].join(''),
            'background-position': [px(-column * width), px(-row * height)].join(' '),
            'background-repeat': 'no-repeat',
            'background-size': [px($img.width()), px($img.height())].join(' ')
          }}).get()[0]);
        }
      }

      return result;
    }

    function play(callback, speed){
      interval = setInterval(function(){
        var random = Math.floor(Math.random() * array.length);

        $(array[random]).css('z-index', 1);

        if (array.length) {
          if (callback) callback(array[random], false);
          effect(array[random], array.length);
          array.splice(random, 1);
        }
        else {
          clearInterval(interval);
          if (callback) callback(array[random], true);
        }
      }, speed ? speed * 1000 : 1000);
    };

    effect = function(target, length){
      TweenMax.to(target, 0.5, { scale: 1.5 });
      TweenMax.to(target, 0.5, { scale: 0, ease: Power0.easeNone, delay: 0.5, onComplete: function(){
        $(this.target).remove();
      }});
    };

    if (!$img.parent().data('image-effect-wrap')) wrap();
    if (array && array.length) $(array).remove();

    array = split();
    $img.parent().append(array);

    return {
      effect: function(callback){
        if (callback) effect = callback;
        return this;
      },
      play: function(callback, speed){
        clearInterval(interval);
        play(callback, speed);
      }
    }
  }

  global.image = image;
}(window[namespace]));