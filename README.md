## vue-calendar-mobile-panel

[![996.icu](https://img.shields.io/badge/link-996.icu-red.svg)](https://996.icu)
[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)

## Install

```javascript
npm i vue-calendar-mobile-panel -S
```

## Usage

```javascript
//vue文件中引入
import Calendar from 'vue-calendar-mobile-panel';

  <Calendar
      :sundayStart="true" // 默认是周一开始 当是true的时候 是周日开始
      :switchTo="2019/09/09" // 跳转的某月某日
      :weeks="[]"
      :disableDate="[]"
      :markDate="[]"
      @selectDay="clickDay"
      @changeMonth="changeDate"
  ></Calendar>

  components: {
    Calendar
  },
  methods:{
    clickDay(data) {
      console.log(data); //选中某天
    },
    changeDate(data) {
      console.log(data); // 切换月份时触发
    },
  }
```
