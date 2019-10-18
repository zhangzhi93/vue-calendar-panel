export default {
  // 默认是周一开始
  sundayStart: true,
  // 当某月的天数
  getDaysInOneMonth(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const d = new Date(year, month, 0);
    return d.getDate();
  },
  // 向前空几个
  getMonthweek(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dateFirstOne = new Date(year + '/' + month + '/1');
    return this.sundayStart ?
      dateFirstOne.getDay() == 0 ? 0 : dateFirstOne.getDay() :
      dateFirstOne.getDay() == 0 ? 6 : dateFirstOne.getDay() - 1;
  },
  /**
   * 获取当前日期上个月或者下个月
  */
  getOtherMonth(dateStr, str = 'nextMonth') {
    const timeArray = dateStr.split('/');
    const year = timeArray[0];
    const month = timeArray[1];
    const day = parseInt(timeArray[2]);
    let year2 = year;
    let month2 = month;
    let day2 = day;
    if (str === 'nextMonth') {
      month2 = parseInt(month) + 1;
      if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
      }
    } else {
      month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
    }

    const MonthMaxDay = new Date(year2, parseInt(month2), 0).getDate();
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    if (day > MonthMaxDay) {
      day2 = MonthMaxDay;
    }
    if (day2 < 10) {
      day2 = '0' + day2;
    }
    return year2 + '/' + month2 + '/' + day2;
  },
  // 上个月末尾的一些日期
  getLeftArr(dateStr) {
    const arr = [];
    const preDate = new Date(this.getOtherMonth(dateStr, 'preMonth'));
    const year = preDate.getFullYear();
    const month = preDate.getMonth() < 9 ? '0' + (preDate.getMonth() + 1) : preDate.getMonth() + 1;
    const leftLength = this.getMonthweek(dateStr);
    const num = this.getDaysInOneMonth(this.getOtherMonth(dateStr, 'preMonth')) - leftLength + 1;

    // 上个月多少开始
    let nowDate = '';
    for (let i = 0; i < leftLength; i++) {
      nowDate = year + '/' + month + '/' + (num + i);
      arr.push({
        id: num + i,
        date: nowDate,
        otherMonth: 'preMonth',
      });
    }
    return arr;
  },
  // 下个月开始的一些日期
  getRightArr(dateStr) {
    const arr = [];
    const nextDate = new Date(this.getOtherMonth(dateStr, 'nextMonth'));
    const year = nextDate.getFullYear();
    const month = nextDate.getMonth() < 9 ? '0' + (nextDate.getMonth() + 1) : nextDate.getMonth() + 1;
    const rightLength = this.getDaysInOneMonth(dateStr) + this.getMonthweek(dateStr);
    const _length = 7 - rightLength % 7;
    const length = _length === 7 ? 0 : _length;


    let nowDate = '';
    let day = '';
    for (let i = 0; i < length; i++) {
      day = i < 9 ? '0' + (i + 1) : i + 1;
      nowDate = year + '/' + month + '/' + day;
      arr.push({
        id: i + 1,
        date: nowDate,
        otherMonth: 'nextMonth',
      });
    }
    return arr;
  },
  // format日期
  dateFormat(date) {
    date = typeof date === 'string' ? new Date(date.replace(/\-/g, '/')) : date;
    const year = date.getFullYear();
    const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return year + '/' + month + '/' + day;
  },
  // 获取某月的列表不包括上月和下月
  getMonthListNoOther(dateStr) {
    const date = new Date(dateStr);
    const arr = [];
    const num = this.getDaysInOneMonth(date);
    const year = date.getFullYear();
    const month = date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;

    let nowDate = '';
    let day = '';
    for (let i = 0; i < num; i++) {
      day = i < 9 ? '0' + (i + 1) : i + 1;
      nowDate = year + '/' + month + '/' + day;
      arr.push({
        id: i + 1,
        date: nowDate,
        otherMonth: 'nowMonth',
      });
    }
    return arr;
  },
  // 获取某月的列表 用于渲染
  getMonthList(dateStr) {
    return [...this.getLeftArr(dateStr), ...this.getMonthListNoOther(dateStr), ...this.getRightArr(dateStr)];
  },
};
