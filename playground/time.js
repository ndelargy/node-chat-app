var moment = require('moment');

var timestamp = moment().valueOf();

var date = moment(timestamp);

date.subtract(12, 'hours')
var fdate = date.format('Do MMM, YYYY h:mm a');

console.log(fdate);
