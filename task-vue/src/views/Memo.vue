<template>
  <section>
    <header>
      <span>MEMO</span>
    </header>
    <article>

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
      overflow-x: hidden;
      overflow-y: auto;
      flex: 1;
      width: 100%;
      text-align: center;
    }
  }
</style>