## vue-calendar-mobile-panel

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

## Install

```javascript
npm i vue-calendar-mobile-panel -S
```

## Demo

[vue-calendar-mobile-panel](https://zhangzhi93.github.io/vue-calendar-panel/dist/index.html)

## Preview

![image](https://raw.githubusercontent.com/zhangzhi93/vue-calendar-panel/master/static/20191129181919.png)

## Usage

```javascript
//vue文件中引入
import Calendar from 'vue-calendar-mobile-panel';

  <Calendar
      v-model="currentDate"
      :sundayStart="true" // 默认是周一开始 当是true的时候 是周日开始
      :weeks="[]" // ["日", "一", "二", "三", "四", "五", "六"]
      :disableDate="disableDate" // 禁用日期 字符串、数组，自定义函数 
      :markDate="[]" // 标记日期 字符串、数组，自定义函数 同禁用日期使用方法
      @change="changeDate" //日期改变时触发
  ></Calendar>

  <button @click="jumpTo">跳转到某日期</button>

  data() {
    return {
      mark: ['2019/05/24', '2019/05/25'],
      // disableDate: ['2019/10/14', '2019/10/18'],
      // disableDate: 'weekend',
      currentDate: '2019/08/09'
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
  methods:{
    jumpTo() {
      this.currentDate = '2019/09/09';
    },
    disableDate(item) {
      return item.split('/')[2] === '12';
    }
  }
```
