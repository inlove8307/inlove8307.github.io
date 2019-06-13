<template>
  <section class="popup" v-show="option.show">
    <div class="modal" v-show="option.modal">&nbsp;</div>
    <article>
      <div class="inner">
        <h2>{{ option.title }}</h2>
        <pre>{{ option.message }}</pre>
        <div class="button">
          <button v-show="option.button.confirm" @click="setData({ show: false, confirm: true })">확인</button>
          <button v-show="option.button.cancle" @click="setData({ show: false, confirm: false })">취소</button>
          <button v-show="option.button.close" @click="setData({ show: false, confirm: false })">닫기</button>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Alert',
  computed: {
    option(){
      return this.$store.state.alert
    }
  },
  methods: {
    setData(value){
      this.$store.commit('setAlert', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
  }

  article {
    overflow: hidden;
    position: relative;
    z-index: 1;
    min-width: 10%;
    border: 1px solid #333;
    box-shadow: 0px 0px 10px #555;

    .inner {
      overflow: hidden;
      background-color: #333;
      box-shadow: inset 1px 1px 0 #444;

      h2 {
        margin: 0;
        padding: 5px 0;
        text-align: center;
        font-weight: 400;
        font-size: 12px;
        color: #fff;
      }

      pre {
        margin: 0;
        padding: 10px 5px;
        background-color:#ccc;
        text-align: center;
        font-family: 'Noto Sans KR', 'Malgun Gothic';
        font-weight: 400;
        font-size: 12px;
        line-height: 1.5;
        color: #333;
      }

      .button {
        display: flex;

        button {
          flex: 1;
          box-sizing: border-box;
          padding: 5px 0;
          border-top: 1px solid #222;
          border-right: 1px solid #222;
          border-left: 0;
          border-bottom: 0;
          background-color: transparent;
          box-shadow: inset 1px 1px 0 #444;
          font-family: 'Noto Sans KR', 'Malgun Gothic';
          font-weight: 400;
          font-size: 12px;
          color: #fff;
          cursor: pointer;

          &:last-child {
            border-right: 0;
          }
        }
      }
    }
  }
}
</style>