const moment = require ('moment');

var date = new moment();
console.log(date.format('YYYY-MMM-DD HH:MM:ss'));
console.log(date.format('H:MM a'));
console.log(date.calendar(null,'HH:MM:ss'));
console.log(date.valueOf());