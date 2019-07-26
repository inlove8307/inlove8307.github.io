var ROOT = ROOT || {};

(function(){
  'use strict';

  var string = {};

  string.leftpad = function(value, char, count){
    var result = String(value);

    if (result.length - 1 < count) {
      while (result.length < count) {
        result = String(char) + result;
      }
    }

    return result;
  };

  ROOT.string = string;
}());

(function(){
  'use strict';

  var console = (function(console){
    var $wrap = $('<section>', { id: 'DEBUG', class: 'debug' })
      , $inner = $('<article>', { class: 'debug-inner' })
      , $title = $('<h2>', { class: 'debug-title', text: 'DEBUG' })
      , $text = $('<div>', { class: 'debug-text' })
      , $button = $('<button>', { class: 'debug-button', text: 'D' })
      , $clear = $('<button>', { class: 'debug-clear', text: 'CLEAR' })
      , $style = $('<style>', { id: 'DEBUG_CSS' })
      , style = '\
      .debug{position:fixed;bottom:0;left:0;z-index:9999;width:100%;height:0;}\
      .debug-inner{display:flex;flex-flow:column;position:relative;width:100%;height:100%;border-top:1px solid rgba(0, 0, 0, 1);background-color:rgba(255, 255, 255, 0.95);}\
      .debug-title{margin:0;padding:2.77vw;border-bottom:1px solid rgba(0, 0, 0, 1);font-family:\'Noto Sans KR\';font-size:1.66vw;color:rgba(0, 0, 0, 1);}\
      .debug-text{overflow-x:hidden;overflow-y:auto;flex:1;margin:0;padding:2.77vw;}\
      .debug-text p{margin:0 0 2.77vw;padding:0;}\
      .debug-text span{font-family:\'Noto Sans KR\';font-size:1.66vw;color:rgba(0, 0, 0, 1);}\
      .debug-text i{font-family:\'Noto Sans KR\';font-size:1.66vw;font-style:normal;color:rgba(0, 0, 0, 1);}\
      .debug-clear{position:absolute;top:2.77vw;right:2.77vw;border:0;background-color:transparent;font-family:\'Noto Sans KR\';font-size:1.66vw;color:rgba(0, 0, 0, 1);}\
      .debug-button{position:fixed;bottom:2.77vw;right:2.77vw;margin:0;padding:0;width:6.94vw;height:6.94vw;border:1px solid rgba(255, 255, 255, 1);border-radius:100%;background-color:rgba(0, 0, 0, 1);font-weight:700;font-family:\'Noto Sans KR\';font-size:2.77vw;color:rgba(255, 255, 255, 1);}\
      ';

    $wrap.append($inner, $button, $clear);
    $inner.append($title, $text);

    $(window).on('load', function(event){
      $('body').append($wrap, $style.text(style));

      $button.on('touchstart', function(event){
        $wrap.height()
          ? $wrap.height(0)
          : $wrap.height('50vh');
      });

      $clear.on('touchstart', function(event){
        $text.empty();
      });
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
      delete: function(){
        $(window).on('load', function(event){
          $wrap.remove();
          $style.remove();
        });
      }
    }
  }(window.console));

  ROOT.console = console;

  // ROOT.console.delete();
}());

(function(){
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

            object[top] = object[top] || {};
            object[top].target = object[top].target || [];
            object[top].target.push(item);
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
          var key, index, el;

          for (key in offset) {
            index = -1;

            while (++index < offset[key].target.length) {
              el = offset[key].target[index];
              $(el).data('evented', false);
              TweenMax.set(el, props.get($(el).data('parallax')).set);
            }
          }
        },
        to: function(offset, screen){
          $.each(offset, function(key, item){
            if ((scree.middle > parseInt(key) || screen.top + screen.height == screen.document)) {
              $.each(item.target, function(index, el){
                var prop = props.get($(el).data('parallax'));

                if (!$(el).data('evented')) {
                  TweenMax.to(el, prop.duration, prop.to);
                  $(el).data('evented', true);
                }
              });
            }
          });
        }
      }
    }());

    return {
      init: function(){
        screen.set();
        offset.set($els);
        props.set(codes);
        event.set(offset.get());
        event.to(offset.get(), screen.get());
        ROOT.console.log(['debug', 'parallax.init'].join(' | '));
      },
      scroll: function(){
        screen.set();
        event.to(offset.get(), screen.get());
        ROOT.console.log(['debug', 'parallax.scroll'].join(' | '));
      }
    }
  };

  ROOT.parallax = parallax;
}());