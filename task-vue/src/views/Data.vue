<template>
  <section>
    <header>
      <span>DATA</span>
    </header>
    <article>
      <ul>
        <li>
          <label>데이터(JSON)</label>
          <textarea placeholder="데이터를 입력하세요."></textarea>
        </li>
      </ul>
    </article>
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
          flex: 1;
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;

          label {
            display: block;
            padding: 10px;
            border-bottom: 1px dashed #ccc;
            text-align: left;
            font-family: 'Dotum';
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
            font-family: 'Dotum';
            font-size: 12px;
            outline: none;
          }
        }
      }
    }
  }
</style>