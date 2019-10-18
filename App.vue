<template>
  <div id="app">
    <calendar v-model="currentDate" :markDate="mark" :disableDate="disableDate" @change="onChange"/>
    <button @click="jumpTo">切换</button>
  </div>
</template>

<script>
import Calendar from './src/index';

export default {
  name: "app",
  data() {
    return {
      mark: ['2019/10/24', '2019/10/28'],
      disableDate: ['2019/10/14', '2019/10/18'],
      currentDate: '2019/10/09'
    }
  },
  components: {
    Calendar
  },
  watch: {
    currentDate(val) {
      console.log(val);
    }
  },
  methods: {
    jumpTo() {
      this.currentDate = '2019/09/09'
    },
    onChange(val){
      //console.log(val);
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
