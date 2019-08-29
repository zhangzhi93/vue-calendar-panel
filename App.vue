<template>
  <div id="app">
    <calendar :markDate="mark" />
    <button @click="jumpTo">切换</button>
  </div>
</template>

<script>
import Calendar from './src/index';

export default {
  name: "app",
  data() {
    return {
      mark: ['2019/05/24', '2019/05/25'],
      currentDate: '2019/08/09'
    }
  },
  components: {
    Calendar
  },
  methods: {
    clickDay(date) {
      console.log(date);
    },
    jumpTo() {
      this.currentDate = '2019/09/09'
    }
  }
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
