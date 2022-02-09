;(function(window, document, undefined){
  'use strict';

  var components = {}, mixins = {};

  mixins['tween'] = {
    watch: {
      menu: function(menu){
        this.tween = this.tween || {
          page: TweenLite.fromTo(this.$el.children[1], 0.1, { y: function(index, item){ return item.clientHeight }, paused: true }, { y: 0 })
        };

        menu.page
          ? _.each(this.tween, function(item){ item.play() })
          : _.each(this.tween, function(item){ item.reverse() });
      }
    }
  };

  components['task-popup'] = Vue.component('task-popup', {
    props: ['options'],
    data: function(){
      return {
        title: null,
        message: null,
        buttons: { confirm: true, cancle: true },
        isPopup: false,
        isModal: false
      }
    },
    methods: {
      confirm: function(){
        if (this.options.callback && this.options.callback.confirm) {
          this.options.callback.confirm();
        }

        this.isPopup = false;
      },
      cancle: function(){
        if (this.options.callback && this.options.callback.cancle) {
          this.options.callback.cancle();
        }

        this.isPopup = false;
      }
    },
    watch: {
      options: function(options){
        this.title = options.title || this.title;
        this.message = options.message || this.message;
        this.button = options.buttons || this.buttons;
        this.isPopup = options.isPopup || this.isPopup;
        this.isModal = options.isModal || this.isModal;
      },
      isPopup: function(value){
        if (!value) {
          this.title = this.message = null;
          this.isPopup = this.isModal = false;
        }
      }
    }
  });

  components['task-menu'] = Vue.component('task-menu', {
    props: ['menu', 'current'],
    data: function(){
      return {
        open: false,
        show: 0,
        tween: null
      }
    },
    methods: {
      changeMenu: function(index){
        this.$emit('change-menu', index);
        this.open = false;
      }
    },
    watch: {
      current: function(value){
        this.show = value;
      },
      open: function(value){
        this.tween = this.tween || {
          open: TweenLite.to(this.$el.children[0].children[0], 0.1, { color: '#000', rotation: 90, paused: true }),
          menu: TweenLite.fromTo(this.$el.children[1], 0.1, { y: function(index, target){ return -target.clientHeight }, paused: true }, { y: 0 })
        };

        value
          ? _.each(this.tween, function(item){ item.play() })
          : _.each(this.tween, function(item){ item.reverse() });
      }
    }
  });

  components['task-days-item'] = Vue.component('task-days-item', {
    props: ['item', 'task', 'index', 'openAll'],
    data: function(){
      return { open: false }
    },
    methods: {
      changeMenu: function(item, index){
        item = _.clone(item);
        item.index = index;
        this.$emit('change-menu', item);
      },
      deleteData: function(item, index){
        var data = {
          date: item.date,
          week: item.week,
          list: _.map(item.list, _.clone)
        }

        this.$emit('change-popup', {
          title: '삭제',
          message: item.datetext + ' ' + item.weektext + '<br>' + item.list[index].title + '<br>일정이 삭제됩니다.',
          isPopup: true,
          isModal: true,
          callback: {
            confirm: function(){
              data.list.splice(index, 1);
              this.$emit('update-data', data);
            }.bind(this)
          }
        });
      }
    },
    watch: {
      openAll: function(value){
        this.open = value;
      }
    },
    mounted: function(){
      new ClipboardJS(this.$el.getElementsByClassName('copy')[0], {
        target: function(trigger){
          return trigger.parentElement.children[0];
        }
      });
    }
  });

  components['task-days'] = Vue.component('task-days', {
    props: ['menu', 'date', 'items'],
    data: function(){
      return {
        open: false,
        icon: ['unfold_less', 'unfold_more'],
        twwen: null,
        today: moment().format('YYYYMMDD')
      }
    },
    mixins: [mixins.tween],
    methods: {
      changeDate: function(number){
        this.$emit('change-date', number);
        this.open = false;
      },
      changeMenu: function(item){
        this.$emit('change-menu', 2, item);
      },
      changePopup: function(options){
        this.$emit('change-popup', options);
      },
      updateData: function(item){
        this.$emit('update-data', 'task', item, 0);
      }
    },
    updated: function(){
      var target = this.$el.lastChild,
        el = this.$el.getElementsByClassName("today")[0];

      target.scrollTop = el ? el.offsetTop - (this.$el.clientHeight / 2) + (el.clientHeight / 2) : 0;
    }
  });

  components['task-week'] = Vue.component('task-week', {
    props: ['menu', 'date', 'items'],
    methods: {
      changeDate: function(number){
        this.$emit('change-date', number);
      }
    },
    mixins: [mixins.tween]
  });

  components['task-write'] = Vue.component('task-write', {
    props: ['menu', 'dexie', 'item'],
    data: function(){
      return {
        data: null,
        date: null,
        week: null,
        index: null,
        title: null,
        text: null,
        work: false,
        deploy: false,
        complete: false,
        hold: false
      }
    },
    mixins: [mixins.tween],
    methods: {
      updateData: function(index){
        if (!this.title) return this.$emit('change-menu', 0);

        if (this.index > -1) {
          this.data.list[this.index].title = this.title;
          this.data.list[this.index].text = this.text;
          this.data.list[this.index].work = this.work;
          this.data.list[this.index].deploy = this.deploy;
          this.data.list[this.index].complete = this.complete;
          this.data.list[this.index].hold = this.hold;
        }
        else {
          this.data.list.push({
            title: this.title,
            text: this.text,
            work: this.work,
            deploy: this.deploy,
            complete: this.complete,
            hold: this.hold,
            id: new Date().getTime()
          });
        }

        this.$emit('update-data', 'task', this.data, 0);
      },
      updateItem: function(){
        var vue = this;

        if (this.item) {
          this.data = {
            date: this.item.date,
            week: this.item.week,
            list: _.map(this.item.list, _.clone)
          };

          this.index = this.item.index > -1 ? this.item.index : -1;
          this.date = this.item.datetext;
          this.week = this.item.weektext;

          if (this.index > -1) {
            this.title = this.item.list[this.index].title;
            this.text = this.item.list[this.index].text;
            this.work = this.item.list[this.index].work;
            this.deploy = this.item.list[this.index].deploy;
            this.complete = this.item.list[this.index].complete;
            this.hold = this.item.list[this.index].hold;
          }
        }
        else {
          this.index = -1;
          this.dexie.task.get(moment().format('YYYYMMDD'))
          .then(function(item){
            vue.data = item;
            vue.date = moment(item.date).format('YYYY.MM.DD');
            vue.week = ['일', '월', '화', '수', '목', '금', '토'][item.week] + '요일';
          });
        }
      }
    },
    watch: {
      menu: function(menu){
        if (menu.page) {
          this.updateItem();
        }
        else {
          this.date = this.week = this.title = this.text = null;
          this.work = this.deploy = this.complete = this.hold = false;
        }
      }
    }
  });

  components['memo-view-item'] = Vue.component('memo-view-item', {
    props: ['item', 'openAll'],
    data: function(){
      return { open: false }
    },
    methods: {
      changeMenu: function(index, item){
        this.$emit('change-menu', index, item);
      },
      deleteData: function(item){
        this.$emit('delete-data', item);
      }
    },
    watch: {
      openAll: function(value){
        this.open = value;
      }
    }
  });

  components['memo-view'] = Vue.component('memo-view', {
    props: ['dexie', 'menu', 'items'],
    data: function(){
      return {
        group: null,
        data: null,
        open: false,
        icon: ['unfold_less', 'unfold_more'],
        category: null,
        keys: null
      }
    },
    mixins: [mixins.tween],
    methods: {
      changeMenu: function(index, item){
        this.$emit('change-menu', index, item);
      },
      deleteData: function(item){
        this.$emit('change-popup', {
          title: '삭제',
          message: '[' + item.category + '] ' + item.title + '<br>메모가 삭제됩니다.',
          isPopup: true,
          isModal: true,
          callback: {
            confirm: function(){
              this.dexie.memo.delete(item.id);
              this.$emit('select-data');
            }.bind(this)
          }
        });
      },
      updateItem: function(){
        this.data = this.items;
        this.group = _.groupBy(this.items, 'category');
        this.keys = _.allKeys(this.group);
        this.category = 'all';
      }
    },
    watch: {
      items: function(items){
        this.updateItem();
      },
      menu: function(menu){
        if (menu.page) this.category = 'all';
      },
      category: function(value){
        this.data = value === 'all' ? this.items : this.group[value];
      }
    }
  });

  components['memo-write'] = Vue.component('memo-write', {
    props: ['menu', 'item'],
    data: function(){
      return {
        category: null,
        title: null,
        text: null,
        file: null
      }
    },
    mixins: [mixins.tween],
    methods: {
      updateData: function(){
        var data = this.item ? _.clone(this.item) : {};

        if (!this.title) return this.$emit('change-menu', 3);

        data.id = data.id || new Date().getTime();
        data.category = this.category || '일반';
        data.title = this.title;
        data.text = this.text;
        data.file = this.file;

        this.$emit('update-data', 'memo', data, 3);
      },
      updateItem: function(){
        if (this.item) {
          this.title = this.item.title;
          this.text = this.item.text;
          this.category = this.item.category;
        }
      }
    },
    watch: {
      menu: function(menu){
        menu.page ? this.updateItem() : this.category = this.title = this.text = this.file = null;
      }
    }
  });

  components['task-data'] = Vue.component('task-data', {
    props: ['menu', 'dexie'],
    data: function(){
      return {
        data: null,
        file: null
      }
    },
    mixins: [mixins.tween],
    methods: {
      backupData: function(){
        var vue = this,
          data = { task: [], memo: [] },
          check = { task: false, memo: false },
          interval;

        this.dexie['task']
        .each(function(item){ data.task.push(item) })
        .then(function(){ check['task'] = true });

        this.dexie['memo']
        .each(function(item){ data.memo.push(item) })
        .then(function(){ check['memo'] = true });

        interval = setInterval(function(){
          var json;

          if (check['task'] && check['memo']) {
            var json = JSON.stringify(data);
            vue.data = json;
            vue.file = 'data:application/json;charset=utf-8,' + encodeURIComponent(json);
            clearInterval(interval);
          };
        }, 100);
      },
      uploadData: function(){
        var vue = this,
          data = JSON.parse(this.data) || {},
          check = { task: false, memo: false },
          interval;

        data['task'] = data['task'] || [];
        data['memo'] = data['memo'] || [];

        this.dexie['task'].bulkPut(data['task'])
        .then(function(){ check['task'] = true });

        this.dexie['memo'].bulkPut(data['memo'])
        .then(function(){ check['memo'] = true });

        interval = setInterval(function(){
          if (check['task'] && check['memo']) {
            vue.$emit('change-menu', 0);
            vue.$emit('select-data');
            vue.data = null;
            clearInterval(interval);
          }
        }, 100);
      }
    },
    watch: {
      menu: function(menu){
        if (!menu.page) this.data = this.file = null;
      }
    }
  });

  new Vue({
    el: '#app',
    data: function(){
      return {
        menu: [
          { icon: 'view_list', title: '일별', page: true, show: true },
          { icon: 'view_column', title: '주별', page: false, show: true },
          { icon: 'create', title: '일정등록', page: false, show: false },
          { icon: 'assignment', title: '메모', page: false, show: true },
          { icon: 'create', title: '메모등록', page: false, show: false },
          { icon: 'inbox', title: '데이터', page: false, show: true }
        ],
        current: 0,
        date: {
          year: moment().format('YYYY'),
          month: moment().format('MM')
        },
        dexie: null,
        origin: null,
        items: null,
        group: null,
        memos: null,
        write: null,
        popup: null
      }
    },
    methods: {
      changeMenu: function(index, item){
        var menu = _.map(this.menu, _.clone);

        _.map(menu, function(item){ item.page = false });
        menu[index].page = true;

        this.current = index;
        this.menu = menu;
        this.write = item ? item : null;
      },
      changeDate: function(number){
        var date = moment([this.date.year, this.date.month, '01'].join(''));

        date = number > 0 ? date.add(1, 'months') : date.subtract(1, 'months');

        this.date.year = date.format('YYYY');
        this.date.month = date.format('MM');

        this.selectData();
      },
      changePopup: function(options){
        this.popup = options;
      },
      createData: function(){
        var date = moment([this.date.year, this.date.month - 1, '01']),
          item,
          array = [];

        var index = 0,
          length = date.endOf('month').format('DD') * 1;

        while (++index <= length) {
          item = {
            date: date.date(index).format('YYYYMMDD'),
            week: date.date(index).day(),
            list: []
          }

          array.push(item);
        }

        this.dexie.task.bulkPut(array);
        this.selectData();
      },
      selectData: function(){
        var vue = this,
          date = moment([this.date.year, this.date.month - 1, '01']),
          range = [date.format('YYYYMMDD'), date.endOf('month').format('YYYYMMDD') * 1 + 1 + ''],
          items = [],
          memos = [];

        this.dexie.task.where('date').between(range[0], range[1])
        .each(function(data){ items.push(data) })
        .then(function(){ items.length ? vue.origin = items : vue.createData() });

        this.dexie.memo
        .each(function(data){ memos.unshift(data) })
        .then(function(){ vue.memos = memos });
      },
      updateData: function(table, item, index){
        this.dexie[table].put(item);
        this.write = null;
        this.selectData();
        this.changeMenu(index);
      }
    },
    watch: {
      origin: function(origin){
        var items = _.map(origin, _.clone),
          weeks = ['일', '월', '화', '수', '목', '금', '토'],
          group = [],
          array = [];

        _.map(items, function(item, index, list){
          item.datetext = moment(item.date).format('YYYY.MM.DD');
          item.weektext = weeks[item.week] + '요일';
          item.weekend = [0, 6].indexOf(item.week) > -1;

          array.push(item);

          if (item.week === 6 || (item === _.last(list) && array.length)) {
            group.push(array);
            array = [];
          }
        });

        this.items = items;
        this.group = group;
      }
    },
    created: function(){
      this.dexie = new Dexie('eluo');
      this.dexie.version(1).stores({
        task: "&date, week, list",
        memo: "&id, title, text, file"
      });
      this.selectData();
    },
    mounted: function(){
      var target = this.$el.lastChild;

      TweenLite.to(target, 1, { delay: 0.5, opacity: 0, onComplete: function(){ target.remove() } });
    }
  });
}(window, document, undefined));