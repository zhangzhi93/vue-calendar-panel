<template>
  <div class="device">
    <div class="title">vue-calendar-mobile-panel</div>
    <calendar v-model="currentDate" :markDate="mark" :disableDate="disableDate" @change="onChange" />
    <p style="text-align:center;margin:10px 0;">每个月12号禁用，每个月11号标记</p>
    <button @click="jumpTo" class="btn">切到2019/10/09</button>
  </div>
</template>

<script>
import Calendar from './src/index';

export default {
  name: "app",
  data() {
    return {
      // mark: ['2019/10/24', '2019/10/28'],
      // mark: '2019/10/28',
      // disableDate: ['2019/10/14', '2019/10/18'],
      // disableDate: 'weekend',
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
    onChange(val) {
      //console.log(val);
    },
    mark(item) {
      return item.split('/')[2] === '11';
    },
    disableDate(item) {
      return item.split('/')[2] === '12';
    }
  }
};
</script>

<style lang="less" scoped>
.device {
  width: 375px;
  margin: 10px auto;
  background-color: #f8f8ff;
  min-height: 667px;
}
.title {
  background-color: #fff;
  text-align: center;
  padding: 12px 0;
  font-size: 14px;
}
.btn {
  display: block;
  margin: 0 auto;
  padding: 5px 10px;
}
</style>
