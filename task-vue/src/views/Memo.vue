<template>
  <section>
    <header>
      <span>MEMO</span>
    </header>
    <article>
      <div>
        <label for="">입력</label>
        <input type="text">
        <label for="">선택</label>
        <select>
          <option>구분1</option>
          <option>구분2</option>
          <option>구분3</option>
        </select>
      </div>
      <ul>
        <li>
          <div>
            <button type="button" @click="show = !show">제목1</button>
            <button type="button" v-show="show">EDIT</button>
            <button type="button" v-show="show">DEL</button>
          </div>
          <pre v-show="show">내용1</pre>
        </li>
        <li>
          <div>
            <button type="button" @click="show = !show">제목1</button>
            <button type="button" v-show="show">EDIT</button>
            <button type="button" v-show="show">DEL</button>
          </div>
          <pre v-show="show">내용1</pre>
        </li>
        <li>
          <div>
            <button type="button" @click="show = !show">제목1</button>
            <button type="button" v-show="show">EDIT</button>
            <button type="button" v-show="show">DEL</button>
          </div>
          <pre v-show="show">내용1</pre>
        </li>
        <li>
          <div>
            <button type="button" @click="show = !show">제목1</button>
            <button type="button" v-show="show">EDIT</button>
            <button type="button" v-show="show">DEL</button>
          </div>
          <pre v-show="show">내용1</pre>
        </li>
        <li>
          <div>
            <button type="button" @click="show = !show">제목1</button>
            <button type="button" v-show="show">EDIT</button>
            <button type="button" v-show="show">DEL</button>
          </div>
          <pre v-show="show">내용1</pre>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
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
        font-family: 'Dotum';
        font-weight: 800;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
      }

      span {
        display: inline-block;
        padding: 10px;
        font-family: 'Dotum';
        font-weight: 800;
        font-size: 12px;
        color: #fff;
      }
    }

    article {
      flex: 1;
      display: flex;
      flex-direction: column;

      &>div {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px solid #ccc;

        label {
          float:left;
          padding: 5px;
          border-top: 1px solid #333;
          border-bottom: 1px solid #333;
          border-left: 1px solid #333;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          background-color: #444;
          box-shadow: inset 1px 1px 0 #555;
          font-family: 'Dotum';
          font-weight: 800;
          font-size: 12px;
          color: #fff;
        }

        select {
          float:left;
          margin-right:5px;
          padding: 5px;
          border: 1px solid #333;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          background-color: #444;
          box-shadow: inset 1px 1px 0 #555;
          font-family: 'Dotum';
          font-weight: 800;
          font-size: 12px;
          color: #fff;
          outline: none;
        }

        input {
          float:left;
          margin-right:5px;
          padding: 5px;
          border: 1px solid #333;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          background-color: #444;
          box-shadow: inset 1px 1px 4px #333;
          font-family: 'Dotum';
          font-weight: 800;
          font-size: 12px;
          color: #fff;
          outline: none;
        }
      }

      ul {
        flex: 1;
        margin: 10px;
        padding: 0;
        list-style: none;

        li {
          overflow: hidden;
          margin-top: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #fff;
          box-shadow: 1px 1px 5px #ddd;

          &:first-child {
            margin-top: 0;
          }

          div {
            display: flex;

            button {
              box-sizing: border-box;
              padding: 10px;
              border: 0;
              border-left: 1px dashed #ccc;
              background-color: transparent;
              text-align: left;
              font-family: 'Dotum';
              font-weight: 800;
              font-size: 12px;
              cursor: pointer;

              &:first-child {
                flex: 1;
                border-left: 0;
              }

              &:hover {
                background-color: #ffc;
              }
            }
          }

          pre {
            box-sizing: border-box;
            margin: 0;
            padding: 10px;
            border-top: 1px dashed #ccc;
            background-color: #efefef;
            font-family: 'Dotum';
            font-size: 12px;
          }
        }
      }
    }
  }
</style>