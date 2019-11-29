<template>
  <div class="janz-container">
    <div class="janz-change-btns">
      <div class="pre-btn" @click="preMonth(myDate)">上个月</div>
      <div class="top-date">{{dateNow}}</div>
      <div class="next-btn" @click="nextMonth(myDate)">下个月</div>
    </div>
    <div class="janz-weeks">
      <div class="week-item" v-for="(tag,index) in weeks" :key="index">
        <div class="weeks-tag">{{tag}}</div>
      </div>
    </div>
    <div class="janz-days">
      <div class="day-item-rows" v-for="(item,index) in daysList" :key="index">
        <div class="day-item" v-for="(day,key) in item" :key="key">
          <div class="day-tag" :class="[{'day-mark':day.isMark},{'day-otherMonth':day.otherMonth!='nowMonth'},{'day-disable':day.disable},day.activeClassName]"
            @click="clickToDate(day)">{{day.id}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateUtil from './calendar';

export default {
  name: 'calendar',
  model: {
    prop: 'currentDate',
    event: 'change',
  },
  props: {
    currentDate: {
      type: String,
      default: dateUtil.dateFormat(new Date())
    },
    markDate: {
      type: [String, Array, Function],
      default: () => []
    },
    sundayStart: {
      type: Boolean,
      default: () => true
    },
    weeks: {
      type: Array,
      default: () => ["日", "一", "二", "三", "四", "五", "六"]
    },
    disableDate: {
      type: [String, Array, Function],
      default: () => []
    }
  },
  data() {
    return {
      myDate: '',
      daysList: [],
      dateNow: '',
    };
  },
  watch: {
    currentDate: {
      handler: 'jumpTo',
      immediate: true
    },
    myDate() {
      this.getList(this.myDate);
    }
  },
  methods: {
    initStart() {
      dateUtil.sundayStart = this.sundayStart;
      this.getList(this.myDate);
    },
    clickToDate(date) {
      if (date.disable) return;
      this.myDate = date.date;
    },
    jumpTo(date) {
      this.myDate = date;
    },
    preMonth(date) {
      this.myDate = dateUtil.getOtherMonth(this.myDate, "preMonth");
    },
    nextMonth(date) {
      this.myDate = dateUtil.getOtherMonth(this.myDate, "nextMonth");
    },
    getList(dateStr) {
      this.$emit("change", dateStr);
      this.dateNow = `${dateStr.split('/')[0]}年${dateStr.split('/')[1]}月`;
      const MonthList = dateUtil.getMonthList(dateStr);
      const MonthArr = [];
      let rowsList = [];
      for (let i = 0; i < MonthList.length; i++) {
        let markClassName = '';
        let activeClassName = '';
        let k = MonthList[i];
        const nowDate = k.date; // k.date->2019/05/27
        const weekday = new Date(nowDate).getDay();
        const chooseDay = dateStr;
        //无法选中某天
        if (dateUtil.dataType(this.disableDate) === 'String') {
          if (this.disableDate === 'weekend') {
            k.disable = [0, 6].includes(weekday);
          } else {
            k.disable = this.disableDate === nowDate;
          }
        } else if (dateUtil.dataType(this.disableDate) === 'Array') {
          k.disable = this.disableDate.includes(nowDate);
        } else if (dateUtil.dataType(this.disableDate) === 'Function') {
          k.disable = this.disableDate.call(this, nowDate);
        }
        // 标记某天
        if (dateUtil.dataType(this.markDate) === 'String') {
          k.isMark = this.markDate === nowDate;
        } else if (dateUtil.dataType(this.markDate) === 'Array') {
          k.isMark = this.markDate.includes(nowDate);
        } else if (dateUtil.dataType(this.disableDate) === 'Function') {
          k.isMark = this.markDate.call(this, nowDate);
        }
        if (chooseDay === nowDate) {
          k.activeClassName = 'active';
        } else {
          k.activeClassName = '';
        }

        if (i % 7 === 6) {
          rowsList.push(k);
          MonthArr.push(rowsList);
          rowsList = [];
        } else {
          rowsList.push(k);
        }
      }
      this.daysList = MonthArr;
    }
  },
  created() {
    this.initStart();
  },
}
</script>

<style lang="less" scoped>
@main-color: #35c2ff;
.janz-container {
  max-width: 414px;
  margin: 0 auto;
  padding: 10px;
  font-size: 14px;
  user-select: none;
}
.janz-change-btns {
  display: flex;
  padding: 0 10px;
  .pre-btn {
    flex: 1;
    text-align: left;
    color: @main-color;
    &:before {
      content: "";
      display: inline-block;
      width: 9px;
      height: 9px;
      border-top: 2px solid @main-color;
      border-left: 2px solid @main-color;
      transform: rotate(-45deg);
    }
  }
  .next-btn {
    flex: 1;
    text-align: right;
    color: @main-color;
    &:after {
      content: "";
      display: inline-block;
      width: 9px;
      height: 9px;
      border-top: 2px solid @main-color;
      border-right: 2px solid @main-color;
      transform: rotate(45deg);
    }
  }
  .top-date {
    text-align: center;
    color: #000;
    font-size: 16px;
  }
}
.janz-weeks {
  display: flex;
  text-align: center;
  background-color: @main-color;
  color: #fff;
  border-radius: 6px;
  margin-top: 10px;
  padding: 6px 0;
  > div {
    flex: 1;
  }
}
.janz-days {
  margin-top: 4px;
  .day-item-rows {
    display: flex;
    height: 48px;
    .day-item {
      flex: 1;
      padding: 2px;
    }
    .day-tag {
      background-color: #f2f2f2;
      color: #000;
      height: 100%;
      border-radius: 2px;
      padding: 5px 0 0 5px;
      box-sizing: border-box;
      position: relative;
    }
    .day-tag.active {
      background-color: @main-color;
      color: #fff;
    }
    .day-tag.day-otherMonth {
      color: #ccc;
    }
    .day-tag.day-disable {
      background-color: #c8c9cc;
      color: #fff;
      cursor: not-allowed;
    }
    .day-tag.day-mark::after {
      content: "";
      display: block;
      position: absolute;
      width: 4px;
      height: 4px;
      left: 50%;
      bottom: 8px;
      margin-left: -2px;
      background-color: @main-color;
      border-radius: 50%;
    }
  }
}
</style>
