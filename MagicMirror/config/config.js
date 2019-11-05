/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 */

var config = {
  
	address: "localhost", // Address to listen on, can be:
	                      // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
	                      // - another specific IPv4/6 to listen on a specific interface
	                      // - "", "0.0.0.0", "::" to listen on any interface
	                      // Default, when address config is left out, is "localhost"
	port: 8080,
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
	                                                       // or add a specific IPv4 of 192.168.1.5 :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
	                                                       // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
	                                                       // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	language: "ko",
	timeFormat: 24,
	units: "metric",
	

	modules: [
		{
		    module: "MMM-WeeklySchedule",
		    position: "bottom_left",
		    header: "오늘의 일정",
		    config: {
			schedule: ["헬스장가기", "졸업작품UCC만들기", "시험공부하기"],
			updateInterval: 1 * 60 * 60 * 1000 * 24, // every hour
			showNextDayAfter: "23:00"
		    }
		},
		{
			module: 'YouTubeM',
			position: 'middle_center',
		        config: {
		          key : "AIzaSyAhEz2Xjr9Sz9G9FT2sL3ERy-cDhnX6suc"
		        }
		},

		{
			    module: 'MMM-GoogleFit',
			    position: 'bottom_right',
			    config: {
			        stepCountLabel: true
			    }
		},
		{
		        module: "MMM-Voice-Commands",
		        config: {
		            debug: false, //Displays end results and errors from annyang in the Log
		            autoStart: true, //Adds annyang commands when it first starts
		            activateCommand: "ON", //Command to active all other commands
		            deactivateCommand: "꺼져", //Command to deactivate all other commands
		            alertHeard: false, //Whether an alert should be shown when annyang hears a phrase (mostly for debug)
			    test: false,
		            commands: {
				"*term 유튜브 (재생)(켜줘)(플레이)(실행)" : function(term) {
						var videodiv = document.getElementById("YouTubeDiv");
						videodiv.style.display = 'block';
						
						if(responsiveVoice.voiceSupport()) {
						  responsiveVoice.speak("  "+term+" 실행 합니다.", "Korean Female");
						}
						youtubeget = function (term, type) {
						  var key = "AIzaSyAhEz2Xjr9Sz9G9FT2sL3ERy-cDhnX6suc";
						  var url ="https://www.googleapis.com/youtube/v3/search?part=snippet&q="+term+"&key="+key + "&maxResults=30&type="+type;
						  var xmlHttp = new XMLHttpRequest();
						  xmlHttp.open("GET", url, false);
						  xmlHttp.send(null);
						  return xmlHttp.responseText;
						}
						var info = {};
						info = JSON.parse(youtubeget(term, 'video'));
						//console.log(info);
						var videoId = info.items[0].id.videoId;
						console.log(videoId);
						
						var videoframe = document.getElementById("ytplayer");
						videoframe.src = "http://www.youtube.com/embed/" + videoId + "?autoplay=1&controls=0&enablejsapi=1&version=3";
						
				},
				"영상 (정지)(멈춰)(일시정지)" : function() {
						var videoframe = document.getElementById("ytplayer").contentWindow;
						videoframe.postMessage('{"event":"command","func":"'+'pauseVideo'+'","args":""}','*');
						console.log("영상정지");
				},
				"유튜브 (종료)(꺼줘)" : function() {
						var videoframe = document.getElementById("ytplayer").contentWindow;
						videoframe.postMessage('{"event":"command","func":"'+'stopVideo'+'","args":""}','*');
						var videodiv = document.getElementById("YouTubeDiv");
						videodiv.style.display = 'none';
						if(responsiveVoice.voiceSupport()) {
						  responsiveVoice.speak("  유튜브를 종료 합니다.", "Korean Female");
						}
				},
				"영상 (리플레이)(재생)(다시 틀어)" : function() {
						var videoframe = document.getElementById("ytplayer").contentWindow;
						videoframe.postMessage('{"event":"command","func":"'+'playVideo'+'","args":""}','*');
						console.log("영상재생");
				},
				"미세먼지 (꺼줘)(종료)" : function() {
						var dust = document.getElementById("module_11_MMM-AirQuality");
						dust.style.display = 'none';
						console.log("미세먼지 off");
				},
				"미세먼지 (확인)(몇 이야)" : function() {
						var d = document.getElementById("module_11_MMM-AirQuality");
						d.style.display = 'block';
						console.log("미세먼지 on");
						var impact = document.getElementById("impact");
						var dust = document.getElementById("dust");
						if(responsiveVoice.voiceSupport()) {
						  responsiveVoice.speak("  미세먼지 농도는 "+impact.innerHTML+ " " +dust.innerHTML+" 입니다.","Korean Female");
						}
						console.log(impact.innerHTML+ " " +dust.innerHTML);
				},
				"날씨 (확인)(켜줘)" : function() {
						var d = document.getElementById("module_9_currentweather");
						d.style.display = 'block';
				},
				"날씨 (꺼줘)(종료)" : function() {
						var d = document.getElementById("module_9_currentweather");
						d.style.display = 'none';
				},
				"시간 (확인)(켜줘)" : function() {
						var d = document.getElementById("module_6_clock");
						d.style.display = 'block';
						var time = document.getElementById("time");
						if(responsiveVoice.voiceSupport()) {
						  responsiveVoice.speak("  "+time.innerHTML,"Korean Female");
						}
				},
				"시계 (꺼줘)(종료)" : function() {
						var d = document.getElementById("module_6_clock");
						d.style.display = 'none';
				},
				"날짜 (확인)(켜줘)" : function() {
						var date = document.getElementById("date");
						if(responsiveVoice.voiceSupport()) {
						  responsiveVoice.speak("  "+date.innerHTML,"Korean Female");
						}
				},
				"기념일 (확인)(켜줘)" : function() {
						var d = document.getElementById("module_7_calendar");
						d.style.display = 'block';
				},
				"기념일 (꺼줘)(종료)" : function() {
						var d = document.getElementById("module_7_calendar");
						d.style.display = 'none';
				},
				"인사말 (확인)(켜줘)" : function() {
						var d = document.getElementById("module_8_compliments");
						d.style.display = 'block';
				},
				"인사말 (꺼줘)(종료)" : function() {
						var d = document.getElementById("module_8_compliments");
						d.style.display = 'none';
				},
				"만보기 (확인)(켜줘)" : function() {
						var d = document.getElementById("module_2_MMM-GoogleFit");
						d.style.display = 'block';
				},
				"만보기 (꺼줘)(종료)" : function() {
						var d = document.getElementById("module_2_MMM-GoogleFit");
						d.style.display = 'none';
				},
				"일기예보 (확인)(켜줘)" : function() {
						var d = document.getElementById("module_10_weatherforecast");
						d.style.display = 'block';
				},
				"일기예보 (꺼줘)(종료)" : function() {
						var d = document.getElementById("module_10_weatherforecast");
						d.style.display = 'none';
				},
				"메모장 (확인)(켜줘)" : function() {
						var d = document.getElementById("module_0_MMM-WeeklySchedule");
						d.style.display = 'block';
				},
				"메모장 (꺼줘)(종료)" : function() {
						var d = document.getElementById("module_0_MMM-WeeklySchedule");
						d.style.display = 'none';
				},
				"*term 일정 등록" : function(term) {
						console.log("일정등록");
						
						var table = document.getElementById("schedule");
						var row = table.insertRow(table.rows.length);
						row.insertCell(0).innerHTML = term;
						row.cells[0].className = "xsmall bright lesson";
						
						/*
						var file = new File([""], "modules/MMM-WeeklySchedule/schedule.txt");
						var DATA;
						$.ajax ({
							url: "modules/MMM-WeeklySchedule/schedule.json",
							dataType: "json",
							async: false,
							//data: { data: JSON.stringify(DATA) },
							success: function(data) {
								//data.lessons["thu"].push(term);
								DATA = data;
							}
						});
						*/
						//writejson(DATA);
						//var fs = require('fs');
						//fs.writeFile('modules/MMM-WeeklySchedule/schedule.json', DATA, 'utf8', callback);
						
						
						//var DATA = JSON.parse("modules/MMM-WeeklySchedule/schedule.json");
						//DATA.lessons.thu.push(term);
						/*
						var blob = new Blob([DATA], {type: "application/json"});
						var url = URL.createObjectURL(blob);
						
						var a = document.createElement('a');
						a.download = "modules/MMM-WeeklySchedule/schedule.json";
						a.href = url;
						a.textContent = "Download json";
						a.click();
						*/
						//var str = JSON.stringify(data);
						//file.open("write");
						//file.write(str);
						//file.close();
						/*
						$.ajax ({
							url: "modules/MMM-WeeklySchedule/schedule.json",
							dataType: "json",
							async: false,
							data: { data: JSON.stringify(DATA) },
							success: function(data) {
								//data.lessons.thu.push(term);
								console.log("됬냐?");
							}
						});
						*/
					}
		            }
		        }
    		},
		{
			module: "alert",
		},
		{
			module: "clock",
			position: "top_left"
		},
		{
			module: "calendar",
			header: "대한민국 기념일",
			position: "top_left",
			config: {
				calendars: [
					{
						symbol: "calendar-check",
						url: "https://calendar.google.com/calendar/ical/ko.south_korea%23holiday%40group.v.calendar.google.com/public/basic.ics"
					}
				]
			}
		},
		{
			module: "compliments",
			position: "lower_third"
		},
		{
			module: "currentweather",
			position: "top_right",
			config: {
				location: "Cheongju",
				locationID: "1845604",  //ID from http://bulk.openweathermap.org/sample/; unzip the gz file and find your city
				appid: "4f2dd5bac831776540973f87ea282e42"
			}
		},
		{
			module: "weatherforecast",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				location: "Cheongju",
				locationID: "1845604",  //ID from https://openweathermap.org/city
				appid: "4f2dd5bac831776540973f87ea282e42"
			}
		},
		/*
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
				{
					title: "SBS",
					url: "http://news.sbs.co.kr/rss/rss_00.xml",
				},
				],
				showSourceTitle: true,
				showPublishDate: true
			}
		},
		*/
		{
			module: "MMM-AirQuality",
			position: "top_center",
				config: {
					location: "Cheongju",
					lang: "kr"
				}
		}
	]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
