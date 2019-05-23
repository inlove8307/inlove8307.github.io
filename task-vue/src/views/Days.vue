<template>
  <section>
    <header>
      <button>PREV</button>
      <span>2019.05</span>
      <button>NEXT</button>
    </header>
    <article>
      <ol>
        <date-item
          v-for="(item, key) in group"
          v-bind:date="key"
          v-bind:data="item"
          v-bind:key="item.key"
        ></date-item>
      </ol>
    </article>
  </section>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import DateItem from '../components/DateItem'

export default {
  data(){
    return {
      data: [
        { "KEY": 1558484706196, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190501, "TITLE": "머니즐기기 룰렛TV 아이콘 추가 관련", "CONTS": "머니즐기기 룰렛TV 아이콘 추가 관련" },
        { "KEY": 1558484706197, "INDEX": 1, "CODE": "C01", "TAG": null, "DATE": 20190501, "TITLE": "제휴사 신규가입 이벤트 팝업 (WEB버전)", "CONTS": "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
        { "KEY": 1558484706198, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190502, "TITLE": "말톡 대만결제 제휴배너&랜딩페이지", "CONTS": "말톡 대만결제 제휴배너&랜딩페이지" },
        { "KEY": 1558484706199, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190503, "TITLE": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", "CONTS": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
        { "KEY": 1558484706200, "INDEX": 1, "CODE": "C01", "TAG": null, "DATE": 20190503, "TITLE": "머니즐기기 룰렛TV 아이콘 추가 관련", "CONTS": "머니즐기기 룰렛TV 아이콘 추가 관련" },
        { "KEY": 1558484706201, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190506, "TITLE": "제휴사 신규가입 이벤트 팝업 (WEB버전)", "CONTS": "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
        { "KEY": 1558484706202, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190509, "TITLE": "말톡 대만결제 제휴배너&랜딩페이지", "CONTS": "말톡 대만결제 제휴배너&랜딩페이지" },
        { "KEY": 1558484706203, "INDEX": 1, "CODE": "C01", "TAG": null, "DATE": 20190509, "TITLE": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", "CONTS": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
        { "KEY": 1558484706204, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190510, "TITLE": "머니즐기기 룰렛TV 아이콘 추가 관련", "CONTS": "머니즐기기 룰렛TV 아이콘 추가 관련" },
        { "KEY": 1558484706205, "INDEX": 1, "CODE": "C01", "TAG": null, "DATE": 20190510, "TITLE": "제휴사 신규가입 이벤트 팝업 (WEB버전)", "CONTS": "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
        { "KEY": 1558484706206, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190513, "TITLE": "말톡 대만결제 제휴배너&랜딩페이지", "CONTS": "말톡 대만결제 제휴배너&랜딩페이지" },
        { "KEY": 1558484706207, "INDEX": 1, "CODE": "C01", "TAG": null, "DATE": 20190513, "TITLE": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", "CONTS": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
        { "KEY": 1558484706208, "INDEX": 2, "CODE": "C01", "TAG": null, "DATE": 20190513, "TITLE": "머니즐기기 룰렛TV 아이콘 추가 관련", "CONTS": "머니즐기기 룰렛TV 아이콘 추가 관련" },
        { "KEY": 1558484706209, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190514, "TITLE": "제휴사 신규가입 이벤트 팝업 (WEB버전)", "CONTS": "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
        { "KEY": 1558484706210, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190515, "TITLE": "말톡 대만결제 제휴배너&랜딩페이지", "CONTS": "말톡 대만결제 제휴배너&랜딩페이지" },
        { "KEY": 1558484706211, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190516, "TITLE": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", "CONTS": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
        { "KEY": 1558484706212, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190517, "TITLE": "머니즐기기 룰렛TV 아이콘 추가 관련", "CONTS": "머니즐기기 룰렛TV 아이콘 추가 관련" },
        { "KEY": 1558484706213, "INDEX": 1, "CODE": "C01", "TAG": null, "DATE": 20190517, "TITLE": "제휴사 신규가입 이벤트 팝업 (WEB버전)", "CONTS": "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
        { "KEY": 1558484706214, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190520, "TITLE": "말톡 대만결제 제휴배너&랜딩페이지", "CONTS": "말톡 대만결제 제휴배너&랜딩페이지" },
        { "KEY": 1558484706215, "INDEX": 1, "CODE": "C01", "TAG": null, "DATE": 20190520, "TITLE": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", "CONTS": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
        { "KEY": 1558484706216, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190521, "TITLE": "머니즐기기 룰렛TV 아이콘 추가 관련", "CONTS": "머니즐기기 룰렛TV 아이콘 추가 관련" },
        { "KEY": 1558484706217, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190522, "TITLE": "제휴사 신규가입 이벤트 팝업 (WEB버전)", "CONTS": "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
        { "KEY": 1558484706218, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190523, "TITLE": "말톡 대만결제 제휴배너&랜딩페이지", "CONTS": "말톡 대만결제 제휴배너&랜딩페이지" },
        { "KEY": 1558484706219, "INDEX": 1, "CODE": "C01", "TAG": null, "DATE": 20190523, "TITLE": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", "CONTS": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
        { "KEY": 1558484706220, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190524, "TITLE": "머니즐기기 룰렛TV 아이콘 추가 관련", "CONTS": "머니즐기기 룰렛TV 아이콘 추가 관련" },
        { "KEY": 1558484706221, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190527, "TITLE": "제휴사 신규가입 이벤트 팝업 (WEB버전)", "CONTS": "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
        { "KEY": 1558484706222, "INDEX": 1, "CODE": "C01", "TAG": null, "DATE": 20190527, "TITLE": "말톡 대만결제 제휴배너&랜딩페이지", "CONTS": "말톡 대만결제 제휴배너&랜딩페이지" },
        { "KEY": 1558484706223, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190528, "TITLE": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청", "CONTS": "바코드결제_대만_가맹점추가 디자인/퍼블리싱 요청" },
        { "KEY": 1558484706224, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190529, "TITLE": "머니즐기기 룰렛TV 아이콘 추가 관련", "CONTS": "머니즐기기 룰렛TV 아이콘 추가 관련" },
        { "KEY": 1558484706225, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190530, "TITLE": "제휴사 신규가입 이벤트 팝업 (WEB버전)", "CONTS": "제휴사 신규가입 이벤트 팝업 (WEB버전)" },
        { "KEY": 1558484706226, "INDEX": 0, "CODE": "C01", "TAG": null, "DATE": 20190531, "TITLE": "말톡 대만결제 제휴배너&랜딩페이지", "CONTS": "말톡 대만결제 제휴배너&랜딩페이지" }
      ],
      group: null
    }
  },
  components: {
    DateItem
  },
  created(){
    let year = 2019,
      month = 5,
      count = 0,
      length = moment().endOf('month').format('DD') * 1,
      object = {};

    this.group = _.groupBy(this.data, 'DATE');

    while(count < length){
      let date = moment([year, month - 1, count + 1]).format('YYYYMMDD');
      object[date] = this.group[date] || [];
      count++;
    }

    this.group = object;
  }
}
</script>

<style lang="scss" scoped>
  section {
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    header {
      position: relative;
      z-index: 1;
      box-sizing: border-box;
      border-bottom: 1px solid #333;
      background-color: #444;
      box-shadow: 0 1px 7px #777;
      text-align: center;

      button {
        padding: 10px;
        border: 0;
        background-color: transparent;
        font-family: 'Malgun Gothic';
        font-weight: 800;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
      }

      span {
        display: inline-block;
        padding: 10px;
        font-family: 'Malgun Gothic';
        font-weight: 800;
        font-size: 12px;
        color: #fff;
      }
    }

    article {
      overflow-x: hidden;
      overflow-y: auto;
      flex: 1;
      width: 100%;
      text-align: center;

      ol {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
  }
</style>