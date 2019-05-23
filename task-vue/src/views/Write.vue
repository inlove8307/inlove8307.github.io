<template>
  <section>
    <header>
      <span>2019.05.XX XXX</span>
    </header>
    <article>
      <ul>
        <li>
          <label for="">제목</label>
          <input type="text" placeholder="제목을 입력하세요.">
        </li>
        <li>
          <label for="">내용</label>
          <textarea placeholder="내용을 입력하세요."></textarea>
        </li>
        <li>
          <label for="">구분</label>
          <input type="text" placeholder="구분을 입력하세요.">
        </li>
      </ul>
    </article>
    <span class="menu">
      <button>SAVE</button>
      <button>CANCLE</button>
    </span>
  </section>
</template>

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

    .menu {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 10;

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
    }

    article {
      overflow-x: hidden;
      overflow-y: auto;
      flex: 1;
      display: flex;
      flex-direction: column;
      width: 100%;
      text-align: center;

      ul {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 10px;
        padding: 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 1px 1px 5px #ddd;
        list-style: none;

        li {
          display: flex;
          flex-direction: column;
          border-top: 1px solid #ccc;

          &:nth-child(1) {
            border-top: 0;
          }

          &:nth-child(2) {
            flex: 1;
          }

          label {
            display: block;
            padding: 10px;
            border-bottom: 1px dashed #ccc;
            text-align: left;
            font-family: 'Malgun Gothic';
            font-weight: 800;
            font-size: 12px;
            cursor: pointer;
          }

          input, textarea {
            flex: 1;
            margin: 0;
            padding: 10px;
            border: 0;
            background-color: transparent;
            font-family: 'Malgun Gothic';
            font-size: 12px;
            outline: none;
          }
        }
      }
    }
  }
</style>