
/* Magic Mirror
 * Module: MMM_WeeklySchedule
 *
 * By Ulrich Pinsdorf
 * MIT Licensed.
 */

Module.register("MMM-WeeklySchedule", {

	defaults: {
		customCssFile: "MMM-WeeklySchedule.css",
		showWeekdayinHeader: true,
		updateInterval: 1* 60 * 60 * 1000 ,     // 24 hour
		showNextDayAfter: "16:00",
		fadeSpeed: 4000,
<<<<<<< HEAD
		debug: true,
=======
		allowHTML: false,
		debug: true
>>>>>>> b2fe8d3ec9426eeaea6d623597ba10ab51120bcf
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	/* start()
	 * Start module after all modules have been loaded
	 * by the MagicMirror framework
	 */
	start: function() {
		// Schedule update timer.
		var self = this;
		setInterval(function() {
			var table = document.getElementById("schedule");
			for(var i=0; i<table.rows.length; i++){
				table.deleteRow(0);
			}	
			//self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
		
		this.loaded = true;
		
	},

	/* getHeader()
	 * Create the module header. Regards configuration showWeekdayinHeader 
	 */
	getHeader: function() {
		var header = this.data.header;
		if(this.config.showWeekdayinHeader) {
			header += " 메모장"; 
		}
		return header;
	},

	/* getDom()
	 * Create the DOM to show content
	 */
	getDom: function() {
		//var date = this.getDisplayDate(); 

		// get day of week and access respective element in lessons array
		//var dow = date.locale('en').format("ddd").toLowerCase();
		//var lessons;
		var lessons = this.config.schedule;
		
		/*
		$.ajax ({
			url: "modules/MMM-WeeklySchedule/schedule.json",
			dataType: "json",
			async: false,
			success: function(data) {
				text = data.schedule;
			}
		});
		*/
		// no lessons today, we return default text
		if(lessons == undefined)
		{
			return this.createTextOnlyDom(
				this.translate("내용 없음")
			);
		}
		
		// get timeslots
		//var timeslots = this.config.schedule.timeslots;

		// build table with timeslot definitions and lessons
		wrapper = document.createElement("table");
		wrapper.setAttribute("id", "schedule");
		for (let index = 0; index < lessons.length; index++) {
			const lesson = lessons[index];
			//const time = timeslots[index];

			// only create a row if the timeslot's lesson is defined and not an empty string
			if(lesson)
			{
				var row = this.createTimetableRow(lesson, index); 
				wrapper.appendChild(row);
			}
		}
		return wrapper;
	},

	createTextOnlyDom: function(text) {
		var wrapper = document.createElement("table");
		wrapper.setAttribute("id", "schedule");
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var text = document.createTextNode(text); 
		td.className = "xsmall bright lesson";
		
		
		wrapper.appendChild(tr);
		tr.appendChild(td);
		td.appendChild(text);

		return wrapper;
	},

	createTimetableRow: function(lesson,index) {
		var row = document.createElement("tr");
<<<<<<< HEAD
		
		var tdlesson = document.createElement("td");
		tdlesson.className = "xsmall bright lesson";
		tdlesson.setAttribute("id", "tr"+index);
		tdlesson.appendChild(
			document.createTextNode(lesson)
		);
=======

		var tdtime = document.createElement("td");
		tdtime.className = "xsmall dimmed lessontime";
		if (this.config.allowHTML) {
			tdtime.innerHTML  = time;
		} else {
			tdtime.appendChild(
				document.createTextNode(time)
			);
		}
		row.appendChild(tdtime);

		var tdlesson = document.createElement("td");
		tdlesson.className = "xsmall bright lesson";
		if (this.config.allowHTML) {
			tdlesson.innerHTML  = lesson;
		} else {
			tdlesson.appendChild(
				document.createTextNode(lesson)
			);
		}
>>>>>>> b2fe8d3ec9426eeaea6d623597ba10ab51120bcf
		row.appendChild(tdlesson);
		
		return row;
	},

	getScripts: function() {
		return ["moment.js"];
	},

	getStyles: function () {
		return [
			this.config.customCssFile
		];
	},

	getTranslations: function() {
		return {
				en: "translations/en.json",
				de: "translations/de.json",
				sv: "translations/sv.json",
				da: "translations/da.json"
		}
	}

});
