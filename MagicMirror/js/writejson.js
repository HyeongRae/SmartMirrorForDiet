writejson = function(data) {
	var fs = require('fs');
	fs.writeFile('modules/MMM-WeeklySchedule/schedule.json', data, 'utf8', callback);
	console.log("*****");console.log("*****");console.log("json쓰기");console.log("*****");console.log("*****");
}						
