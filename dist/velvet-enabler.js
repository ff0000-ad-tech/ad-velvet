!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);["TzDate","RecurringSchedule","DateSchedule","spanish","DateFormatter","DateManager","DateUtils","Timezone"].forEach(function(e){window[e]=r[e]})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){function r(e){return Math.PI/180*e}function a(e){return 180/Math.PI*e}function o(e,t,n){t=t||0,n=void 0!=n&&n>0?n:1;var r=Math.min(e,t),a=Math.max(e,t);return r=Math.ceil(r/n)*n,a=Math.floor(a/n)*n,r+Math.floor(Math.random()*((a-r+n)/n))/(1/n)}function i(e){return e=e||.5,Math.random()<e}function u(e){var t=[],n=[0];for(var r in e)t.push(r),n.push(e[r]+(n[n.length-1]||0));for(var a=100*Math.random().toFixed(2),o=0;o<n.length-1;o++){if(c(a,n[o],n[o+1]))return t[o]}}function l(e,t,n,r,a){return(a-n)/(r-n)*(t-e)+e}function c(e,t,n){var r=Math.min(t,n);return e<=Math.max(t,n)&&e>=r}function s(e){return!isNaN(e)}function f(e){return+e}function d(e,t,n){return Math.max(t,Math.min(n,e))}function g(e,t,n,r){var e=e+Math.cos(r)*n,t=t+Math.sin(r)*n;return[e,t]}function p(e,t,n,r){return n=n||0,r=r||0,Math.atan2(r-t,n-e)}function m(e,t,n,r){return n=n||0,r=r||0,Math.sqrt((r-t)*(r-t)+(n-e)*(n-e))}function v(e){for(var t="",n=0;n<e;n++)t+="&nbsp;";return t}function T(t,n){t=e.proxyStringToLowerCase.apply(t);for(var r=0;r<X.length;r++){if(e.proxyStringToLowerCase.apply(X[r].label)===t)return n?X[r].upperCase:X[r].lowerCase}return!1}function D(e){return e?e.replace(/^\s\s*/,"").replace(/\s\s*$/,""):""}function b(e){return e.split(" ").join("")}function h(e,t){var n="";for(e<0&&(n="-"),e=e.toString().replace(/\-/,"",e);e.length<t;)e="0"+e;return n+e}function S(e){G=e||G}function y(e){for(var t in e)J[t]=e[t]}function M(e){return J[e||G]}function O(e,t){var e=e.toString(),n=e.slice(e.length-1),r=M(),a=r.TH;switch(n){case"1":"11"!=e&&(a=r.ST);break;case"2":"12"!=e&&(a=r.ND);break;case"3":"13"!=e&&(a=r.RD)}return(t?e:"")+a}function A(e,t,n){n=n||{};var r=n.inTimezone||e.outputTimezone,a=n.language,o=e.getIn(r),i=M(a),u=o.getMonth(),l=o.getHours(),c=o.getMinutes();return t.replace(/\$\{(.*?)\}/g,function(e,t){var n=t,a=0,s=void 0,f=!1,d=!0,g=!0;switch(t.replace(/(.+)(\^)/,function(e,n){t=n,f=!0}),2==t.length&&t.replace(/(?![Yo])([a-zA-Z]).*?\1/,function(e,n){t=n.substr(0,1),s=2}),t){case"YY":a=-2;case"YYYY":n=(""+o.getFullYear()).slice(a);break;case"M":n=u+1;break;case"MMM":n=i.MONTHS_ABRV[u];break;case"MMMM":n=i.MONTHS_FULL[u];break;case"D":n=o.getDate();break;case"o":g=!1;case"Do":n=O(o.getDate(),g);break;case"DDD":n=i.WEEKDAYS_ABRV[o.getDay()];break;case"DDDD":n=i.WEEKDAYS_FULL[o.getDay()];break;case"t":d=!1;case"T":n=l,d||0==(n%=12)&&(n=12),c>0&&(s=!0),s&&(n+=":"+V.pad(c,2));break;case"H":n=l;break;case"h":n=l%12,0==n&&(n=12);break;case"m":n=c;break;case"s":n=o.getSeconds();break;case"a":n=l>=12?"pm":"am";break;case"z":n=r.abbr[0]}return s&&(n=V.pad(n,s)),f&&"string"==typeof n&&(n=n.toUpperCase()),n})}function w(e,t){var n=t.getTime()/1e3-e.getTime()/1e3;n<0&&(n=0);for(var r={day:n/86400,hour:n/3600%24,minute:n/60%60,second:n%60,output:""},a=["day","hour","minute","second"],o=0;o<4;o++)r.output+=V.pad(Math.floor(r[a[o]]),2),o<3&&(r.output+=":");return r}function E(e,t){var n=void 0;n=e._isTzDate?e.clone():new Date(e);for(var r in t){var a=q[r.toUpperCase()],o=t[r]*a;n.setTime(n.getTime()+o)}return n}function z(e,t){return void 0==t&&(t=H()),t.getTime()>=e.getTime()}function C(){return re}function _(e){ne=N(e);var t=ne.value,n=(new Date).getTimezoneOffset(),r=Math.floor(n/60),a=n%60,o=Math.floor(t),i=t%1*60,u=-(o+r),l=-(i+a);t>0&&(u=24+u),console.log("hr:",r,"min:",a,"| adjHr:",u,"adjMin:",l),re[0]=u,re[1]=l,console.log("Timezone.setLocal() ->",ne,e,t,re)}function N(e,t){var n=e;if("local"==e||void 0==e)n=ne?"string"==typeof ne?ne:ne.label:x(t);else{if("UTC"==e||"UTC"==e.label||"utc"==e)return{label:"UTC",abbr:["utc"],value:0};"trueLocal"==e&&(n=x(t))}if("string"==typeof n){if(n.length<5){var r=L(n);r&&(n=r)}}else n=e.label;var a={},o=Z[n];if(o){var i=o.split("|");a.label=n,a.abbr=i[0].split(",");var u=i[1].split(",");if(u.length>1){var l=t||new Date,c=l.getFullYear();c<2018&&(c=2018);var s=n.split("/"),f=k(s[0],c);f||(f=k(s[1],c));var d=f.split(","),g=new Date(c+"-"+d[0]+"T03:00:00"+I(u[1])),p=new Date(c+"-"+d[1]+"T03:00:00"+I(u[0])),m=(E(l,{hour:u[0]}),l.getTime()>g.getTime()&&l.getTime()<p.getTime()),v=m?0:1;a.value=u[v]}else a.value=u[0]}else a.label=n,a.abbr=[n.toLowerCase()],a.value=-(new Date).getTimezoneOffset()/60;return a}function I(e){var t=isNaN(e)?e.value:e,n=t>0?Math.floor(t):Math.ceil(t),r=t%1*60;return r=t>0?Math.floor(r):Math.ceil(r),(t<0?"-":"+")+V.pad(Math.abs(n),2)+":"+V.pad(Math.abs(r),2)}function L(e){var t=void 0,n=e.toLowerCase();for(var r in Z){if(Z[r].split("|")[0].split(",").indexOf(n)>=0){t=r;break}}return t}function x(e){var t=e||new Date,n=t.toTimeString(),r=n.split("(")[1];return r=r.substr(0,r.length-1),r.replace(/[a-z\.\s]/g,"")}function k(e,t){if("string"==typeof te[e]){var n=te[e].split("|").map(function(e){return e.split(",").map(function(e){return V.pad(e,2)})});te[e]={};var r=n[0],a=n[2];n[1].map(function(t,n){te[e][ee+n]=r[0]+"-"+t+","+r[1]+"-"+a[n]})}if(te[e])return te[e][t]}function j(){console.log("getQueryParams()");var e={},t=window.location.href.split("?");if(t.length>1){var n=t[1].split("&");for(var r in n){var a=n[r].split("=");2==a.length&&(e[a[0]]=decodeURIComponent(a[1]))}}return e}function P(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(console.log("DateManager.init()",e),!ue){ue=!0,y(oe);var t=j(),n=t.date,r="SYSTEM-DATE";n?(ie=n,r="EXTERNAL-DATE"):!e.dateOverride||"staging"!=e.environmentId&&"debug"!=e.environmentId||(ie=e.dateOverride,r="INTERNAL-DATE");var a=void 0;if(ie){a=new R({datetime:ie}).outputTimezone,console.log("DateManager tz:",a);var o=t.tz;o&&(a=o)}console.log("tz:",a),_(a);var i=t.ltz;i&&(le=i),console.log("-- CURRENT DATE "+Array(104).join("-")),console.log(""),console.log("\t DATE-MODE:"),console.log("\t\t",r),console.log(""),console.log("\t Time for this unit is now assumed to be: "),console.log("\t\t",this.getNow().toFullDateTime()),console.log(""),i&&(console.log("\t External default timezone is: "),console.log("\t\t",i),console.log("")),console.log(Array(120).join("-")),e.language&&S(e.language)}}function U(){return le}function Y(e){e&&(le=e,console.log("\tdefaultTimezone:",le))}function H(){var e=ie;return void 0==e&&(e=(new Date).toISOString().split(".")[0]+"+00:00"),new R({datetime:e,outputTimezone:N("local")})}function R(e){e=e||{};var t="local",n=e.datetime;if(Array.isArray(n)){n=e.datetime[0],t=e.datetime[1];if(!n.match(/(\+|\-)([0-9]{2})\:([0-9]{2})/g)){n+=I(N(t))}}"string"==typeof n&&(n=n.replace(/(\T|\s)/g,"T")),e.outputTimezone?t=e.outputTimezone:U()&&(t=U());var r=new Date(n);return Object.defineProperties(r,{outputTimezone:{get:function(){return t},set:function(e){t=N(e)}}}),r.clone=function(e){return e=e||r.outputTimezone,new R({datetime:r,outputTimezone:e})},r.getHoursIn=function(e,t){var n=r.getIn(e),a=n.getHours();return 1!=t&&a>12&&(a%=12),a},r.format=function(e,t){return A(r,e,t)},r.getIn=function(e){var t=r.toISOString().split(".")[0],n=I(N("trueLocal",r)),a=N(e||r.outputTimezone,r);return E(new Date(t+n),{hour:a.value})},r.print=function(e){var t=r.toFullDateTime(e);return console.log(t),t},r.toFullDateTime=function(e){return e=e||r.outputTimezone,r.getIn(e).toString().split("GMT")[0]+e.label},r.toSimpleDate=function(e){var t=r.getIn(e);return t.getMonth()+1+"/"+t.getDate()},r.toDate=function(e){var t=r.getIn(e);return r.toSimpleDate(e)+"/"+t.getFullYear()},r.toDateTime=function(e){return r.toDate(e)+" "+r.toTime(e)},r.toSimpleDateTime=function(){return r.toSimpleDate()+" "+r.toTime()},r.toTime=function(e){return r.toSimpleTime(e)+" "+r.toMeridiem(e)},r.toSimpleTime=function(e,t){var n=r.getIn(e),a=r.getHoursIn(e,t);return 0!=a||t||(a=12),t&&(a=V.pad(a,2)),a+":"+V.pad(n.getMinutes(),2)},r.toMeridiem=function(e,t){var n=e||r.outputTimezone;return(r.getIn(n).getHours()>=12?"pm":"am")+(1==t?"/"+n.abbr[0]:"")},r.toShortestTime=function(e,t){return r.toSimpleTime(e,t).replace(/:00$/g,"")},r.toDateTimeISO=function(e){var t=r.toDate(e),n=t.split("/");return n[2]+"-"+V.pad(n[0],2)+"-"+V.pad(n[1],2)+"T"+r.toSimpleTime(e,!0)+":00"},r.toISO=function(){return r.toDateTimeISO(r.outputTimezone)+I(r.outputTimezone)},r._isTzDate=!0,r.outputTimezone=t,r}function F(e){e=e||{};var t=this,n=[],r={},a=void 0,o=!1,i=e.callback||function(){},u=e.tonightStartsAt||"17:30",l=0!=e.hasOneDayOf,c=e.eventDuration||120;Object.defineProperties(t,{target:{get:function(){return a}},current:{get:function(){return n[t.currentIndex]}},currentDate:{get:function(){return t.current.date}},currentLabel:{get:function(){return t.current.label}},currentIndex:{get:function(){for(var e=-1,t=0,r=n.length;t<r&&z(n[t].date);t++)e=t;return e}},next:{get:function(){return n[t.nextIndex]}},nextDate:{get:function(){return t.next.date}},nextLabel:{get:function(){return t.next.label}},nextIndex:{get:function(){return K.restrict(t.currentIndex+1,0,n.length-1)}},isLive:{get:function(){return"NOW"==t.current.standardKey}},isComplete:{get:function(){return"PAST"==t.current.standardKey}}}),t.addDate=function(e,i,c){var s=arguments[3],f=e,d=!1,g=!0;if(!e._isTzDate){var p=a;switch(s){case"PAST":g=!1;break;case"TONIGHT":for(var m=a.toDateTimeISO().split("T")[0]+"T",v=u.split(":"),T=0;T<3;T++)m+=V.pad(v[T]||0,2)+":";m=m.slice(0,-1),p=new R({datetime:[m,a.outputTimezone]}),d=p.getTime()>a.getTime(),o=!d,g=l&&o;break;case"TODAY":d=l&&o}g&&(p=a.clone(N("local")),p.setHours.apply(p,C())),f=E(p,e)}var D=i;if(s){var b=r[s];void 0!=b?i=b:"string"==typeof i&&(i=M()[s])}if("function"==typeof i){var h=s&&a?a:f,S=s?"WEEK"==s?D.call(t,h):M()[s]:null;i=i.call(t,h,S)}return d||(n.push({date:f,label:i,standardKey:s,callback:c||function(){}}),n.sort(function(e,t){var n=e.date.getTime(),r=t.date.getTime();return n<r?-1:n>r?1:0})),f},t.print=function(){var e=n.length;console.log("DateSchedule.print(), length:",e);for(var t=0;t<e;t++)console.log(" -",t,n[t].date.toFullDateTime(),"label:",n[t].label)},t.getDates=function(e){e=!!e;for(var t=[],r=0,a=n.length;r<a;r++)t.push(e?n[r]:n[r].date);return t};var s=e.standardOverrides;if(s)for(var f in s)r[f]=s[f];e.target&&(a=t.addDate(e.target,"",i,"NOW"),t.addDate({minute:c},"",i,"PAST")),t.addDate(new R({datetime:"2000-01-01T00:00:00+00:00",outputTimezone:"UTC"}),function(e){return e.toSimpleDateTime()},i,"DATE"),a&&1==e.isStandard&&(t.addDate({},"",i,"TONIGHT"),t.addDate({},"",i,"TODAY"),t.addDate({hour:-24},"",i,"TOMORROW"),t.addDate({hour:-144},function(e){return M().WEEKDAYS_FULL[e.getIn(a.outputTimezone).getDay()]},i,"WEEK"))}n.d(t,"DateFormatter",function(){return $}),n.d(t,"DateManager",function(){return ce}),n.d(t,"DateUtils",function(){return Q}),n.d(t,"Timezone",function(){return ae}),n.d(t,"TzDate",function(){return R}),n.d(t,"RecurringSchedule",function(){return se}),n.d(t,"DateSchedule",function(){return F}),n.d(t,"english",function(){return oe}),n.d(t,"spanish",function(){return fe});var W="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},K=("function"==typeof Symbol&&W(Symbol.iterator),Object.freeze({toRadians:r,toDegrees:a,random:o,randomBoolean:i,randomWeightedKey:u,rel:l,inRange:c,isNumber:s,toNumber:f,restrict:d,getAnglePoint:g,getAngle:p,getDistance:m})),B={};B.get=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window,n=B._getSplits(e).splits;return B._getProperty(n,t)},B.set=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,r=B._getSplits(e,!0);B._getProperty(r.splits,n)[r.lastKey]=t},B._getSplits=function(e,t){var n=e.split(".");return{splits:n,lastKey:t?n.pop():null}},B._getProperty=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t,r=void 0,a=0;n&&(r=e[a]);a++)n=r in n?n[r]:void 0;return n};var X=[{label:"iexcl",upperCase:"&#161;",lowerCase:"&#161;"},{label:"trademark",upperCase:"&#153;",lowerCase:"&#153;"},{label:"copyright",upperCase:"&#169;",lowerCase:"&#169;"},{label:"registered",upperCase:"&#174;",lowerCase:"&#174;"},{label:"nTilde",upperCase:"&#209;",lowerCase:"&#241;"},{label:"aAccent",upperCase:"&#193;",lowerCase:"&#225;"},{label:"eAccent",upperCase:"&#201;",lowerCase:"&#233;"},{label:"iAccent",upperCase:"&#205;",lowerCase:"&#237;"},{label:"oAccent",upperCase:"&#211;",lowerCase:"&#243;"},{label:"uAccent",upperCase:"&#218;",lowerCase:"&#250;"}],V=Object.freeze({addSpaces:v,getSpecialCharacter:T,trimStartAndEnd:D,removeSpaces:b,pad:h}),G="english",J={},$=Object.freeze({setLanguage:S,addLanguage:y,getLabels:M,getNumericSuffixFor:O,format:A}),q={SECOND:1e3,MINUTE:6e4,HOUR:36e5,DAY:864e5,WEEK:6048e5},Q=Object.freeze({getTimeDifference:w,adjust:E,isPast:z}),Z={"US/Eastern":"et,edt,est|-4,-5","US/Central":"ct,cdt,cst|-5,-6","US/Mountain":"mt,mdt,mst|-6,-7","US/Pacific":"pt,pdt,pst|-7,-8","US/Alaska":"akt,akdt,akst|-8,-9","US/Arizona":"az|-7","US/Hawaii":"hast|-10","Australia/Brisbane":"aest|10","Australia/Sydney":"aedt,aest|10,11","America/Mexico_City":"mx|-5,-6","America/Bogota":"cot|-5","America/Argentina/Buenos_Aires":"art|-3"},ee=2018,te={US:"3,11|11,10,8,14,13,12,10,9|4,3,1,7,6,5,3,2",Australia:"4,10|1,7,5,4,3,2,7,6|7,6,4,3,2,1,6,5",Mexico_City:"4,10|1,7,5,4,3,2,7,6|28,27,25,31,30,29,27,26"},ne=void 0,re=[0,0,0],ae=Object.freeze({getTzDiff:C,setLocal:_,get:N,toISO:I}),oe={english:{MONTHS_FULL:["January","February","March","April","May","June","July","August","September","October","November","December"],MONTHS_ABRV:["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],MONTHS_EXCP:["","","","","","","","","sept","","",""],WEEKDAYS_FULL:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],WEEKDAYS_ABRV:["sun","mon","tue","wed","thu","fri","sat"],WEEKDAYS_EXCP1:["","","tues","wednes","thur","",""],WEEKDAYS_EXCP2:["","","","","thurs","",""],ST:"st",ND:"nd",RD:"rd",TH:"th",OF:"of",TOMORROW:"Tomorrow",TODAY:"Today",TONIGHT:"Tonight",NOW:"Live Now",PAST:"Past"}},ie=void 0,ue=!1,le=void 0,ce=Object.freeze({init:P,getDefaultTimezone:U,setDefaultTimezone:Y,getNow:H}),se=function(e){var t,n=this;Object.defineProperties(n,{currentSchedule:{get:function(){var e=t.current.date,n=new F({target:e,isStandard:!0,eventDuration:e.eventDuration,callback:e.callback});if(n.isComplete){var r=t.next.date;n=new F({target:r,isStandard:!0,eventDuration:r.eventDuration,callback:r.callback})}return n}},current:{get:function(){return n.currentSchedule.current}},currentDate:{get:function(){return n.current.date}},currentLabel:{get:function(){return n.current.label}}}),n.print=function(){t.print()},function(){var n=H(),r=M().WEEKDAYS_FULL;t=new F;for(var a=e.tuneins,o=0;o<a.length;o++)for(var i=a[o],u=i.days,l=n.getDay(),c=0;c<u.length;c++){var s=u[c],f=r.indexOf(s),d=f-l,g=new R({datetime:[n.toDateTimeISO().split("T")[0]+"T"+i.startTime+":00",i.timezone]});if(g=E(g,{day:d}),z(g,n)){var p=E(g,{minute:i.eventDuration});z(p,n)&&(g=E(g,{day:7}))}g.eventDuration=i.eventDuration,g.callback=i.callback,console.log("\t",g.print()),t.addDate(g)}}()},fe={spanish:{MONTHS_FULL:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],MONTHS_ABRV:["enero","feb","marzo","abr","mayo","jun","jul","agosto","sept","oct","nov","dic"],MONTHS_EXCP:["","","","","","","","","sep","","",""],WEEKDAYS_FULL:["domingo","lunes","martes","mi&#201;rcoles","jueves","viernes","s&#193;bado"],WEEKDAYS_ABRV:["dom","lun","mar","mi&#201;r","jue","vier","s&#193;b"],WEEKDAYS_EXCP1:["","","tues","wednes","thur","",""],WEEKDAYS_EXCP2:["","","","","thurs","",""],ST:"ro",ND:"ndo",RD:"rd",TH:"th",OF:"de",TOMORROW:"ma&#209;ana",TODAY:"hoy",TONIGHT:"esta noche",NOW:"en vivo",PAST:"past"}}}.call(t,n(2))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n}]);

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Velvet"] = factory();
	else
		root["Velvet"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPreviewLocation", function() { return isPreviewLocation$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEventListener", function() { return addEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeEventListener", function() { return removeEventListener; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capture", function() { return capture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get$1; });
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	return typeof obj;
} : function (obj) {
	return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

/* -- GLOBAL UTILITIES --------------------------------------------
	*
	*		These methods are tightly coupled to FAT index:
	*			- window.environments
	*			- window.adParams		
	*
	*/

function getQueryParams() {
	console.log('ad-global > getQueryParams()');
	var queryParams = {};
	var query = window.location.href.split('?');
	if (query.length > 1) {
		var params = query[1].split('&');
		for (var i in params) {
			var keyValue = params[i].split('=');
			if (keyValue.length == 2) queryParams[keyValue[0]] = decodeURIComponent(keyValue[1]);
		}
	}
	return queryParams;
}

function matchProtocolTo$1(_url) {
	console.log('ad-global > matchProtocolTo()');
	var noProtocol = _url.search(/^\/\//) > -1;
	if (_url.search(/^http/) > -1 || noProtocol) {
		var _secure = window.location.href.search(/^https/) > -1 || adParams.forceHttps;
		var _httpProtocol = _secure ? 'https://' : 'http://';
		if (noProtocol) {
			_url = _url.replace(/^\/\//, _httpProtocol);
		}
		if (_url.search(/.*edgecastcdn/) > -1) {
			var _edgecastContext = _secure ? 'ne1.' + _url.match(/w(a|p)c/i)[0] + '.' : _url.match(/w(a|p)c\.[a-z0-9]*\./i)[0];
			_url = _httpProtocol + _edgecastContext + 'edgecastcdn' + _url.replace(/.*edgecastcdn/, '');
		} else if (_url.search(/.*paramount\.com/) > -1) {
			var _paramountContext = _secure ? 'paramountdlds-a.akamaihd.net' : 'downloads.paramount.com';
			_url = _httpProtocol + _paramountContext + _url.replace(/.*paramount\.com/, '');
		} else if (_url.search(/espn\.go\.com/) > -1 || _url.search(/secure\.espncdn\.com/) > -1) {
			_url = 'https://secure.espncdn.com' + _url.replace(/^.*\.com/, '');
		} else {
			_url = _url.replace(/^https?\:\/\//i, _httpProtocol);
		}
	}
	return _url;
}

var mix = function mix(superclass) {
	return new MixinBuilder(superclass);
};

var MixinBuilder = function () {
	function MixinBuilder(superclass) {
		_classCallCheck(this, MixinBuilder);

		this.superclass = superclass;
	}

	MixinBuilder.prototype.with = function _with() {
		for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
			mixins[_key] = arguments[_key];
		}

		return mixins.reduce(function (c, mixin) {
			return mixin(c);
		}, this.superclass);
	};

	return MixinBuilder;
}();

var LoaderBase = function LoaderBase(superclass) {
	return function (_superclass) {
		_inherits(_class, _superclass);

		function _class() {
			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			_classCallCheck(this, _class);

			var _this = _possibleConstructorReturn(this, _superclass.call.apply(_superclass, [this].concat(args)));

			var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

			var L = _this;

			L.onComplete = arg.onComplete || function () {};
			L.onFail = arg.onFail || function () {};
			L.onProgress = arg.onProgress || function () {};
			L.name = arg.name || '';
			L.scope = arg.scope || L;
			L.dataRaw;
			L.cacheBuster = arg.cacheBuster || false;

			L._failCalled = false;
			return _this;
		}

		_class.prototype._handleFail = function _handleFail() {
			var L = this;
			// console.log( 'LoaderBase._handleFail()' )
			if (!L._failCalled) {
				L._failCalled = true;
				L.onFail.call(L.scope, L);

				console.log('Loader "' + L.name + '" Fail:', L.url);
			}
		};

		return _class;
	}(superclass);
};

function createXMLHttpRequest() {
	try {
		return new XMLHttpRequest();
	} catch (e) {}
	try {
		return new ActiveXObject('Msxml2.XMLHTTP');
	} catch (e) {}
	console.warn('XMLHttpRequest not supported');
	return null;
}

function getFileName(url) {
	var extension = url.lastIndexOf('.');
	var directory = url.lastIndexOf('/') + 1;
	if (directory > extension) extension = undefined;
	return url.substring(directory, extension);
}

function getFileType(url) {
	url = url || '';
	var _index = url.indexOf('?');
	if (_index > -1) {
		url = url.substr(0, _index);
	}
	var _split = url.match(/[^\\]*\.(\w+)$/);
	var _base64 = url.match(/image\/(jpeg|jpg|png)/);
	var _type = _split ? _split[1] : _base64 ? _base64[1] : 'unknown';

	return _type;
}

function getParamsFromData(query) {
	if (typeof query === 'string') {
		/*
   * TODO - check the string is formatted correctly?
   */
		return query;
	} else {
		var queryString = '';
		for (var prop in query) {
			console.log('      prop =', prop);
			queryString += prop + '=' + query[prop] + '&';
		}

		return queryString.substr(0, queryString.length - 1);
	}
}

var LoaderSource = function LoaderSource(superclass) {
	return function (_superclass2) {
		_inherits(_class2, _superclass2);

		function _class2() {
			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			_classCallCheck(this, _class2);

			var _this2 = _possibleConstructorReturn(this, _superclass2.call.apply(_superclass2, [this].concat(args)));

			var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

			var L = _this2;

			L.url = matchProtocolTo$1(arguments[0] || '');

			if (arg.platformGetUrl) {
				L.platformGetUrl = arg.platformGetUrl;
				L.url = arg.platformGetUrl(L.url);
			}

			L.fileName = arg.id === undefined ? getFileName(L.url) : arg.id;
			L.fileType = arg.fileType || getFileType(L.url);
			return _this2;
		}

		return _class2;
	}(superclass);
};

var Blank = function Blank() {
	_classCallCheck(this, Blank);
};

var DataLoader = function (_mix$with) {
	_inherits(DataLoader, _mix$with);

	function DataLoader() {
		for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
			args[_key4] = arguments[_key4];
		}

		_classCallCheck(this, DataLoader);

		var _this3 = _possibleConstructorReturn(this, _mix$with.call.apply(_mix$with, [this].concat(args)));

		var arg = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {};

		var D = _this3;
		D.method = (arg.method || 'get').toLowerCase();
		D.query = arg.query || null;
		D.responseType = arg.responseType || null;
		return _this3;
	}

	DataLoader.prototype.load = function load() {
		var D = this;
		// console.log('DataLoader "' + D.name + '" requesting:\n\t->', D.url)

		var queryString = null;
		var isPost = D.method === 'post';

		D.req = createXMLHttpRequest();

		if (D.responseType != undefined) D.req.responseType = D.responseType;

		var url = D.url;

		if (D.query) {
			queryString = getParamsFromData(D.query);
			if (!isPost) {
				url += '?' + queryString;
				queryString = null;
			}
		}

		if (D.cacheBuster) {
			url += D.query && !isPost ? '&' : '?';
			url += 'cb=' + new Date().getTime();
		}

		D.req.onreadystatechange = D._handleStateChange.bind(D);
		D.req.open(D.method, url, true);

		// Set Mime Type
		// NOTE: responseType has to be set AFTER the XmlHttpRequest.open() is called because IE is terrible
		switch (D.fileType) {
			case 'xml':
				if (D.req.overrideMimeType) D.req.overrideMimeType('text/xml');
				break;
			case 'json':
				if (D.req.overrideMimeType) D.req.overrideMimeType('application/json');
				break;
			case 'fba':
			case 'bin':
			case 'binary':
				D.responseType = D.req.responseType = 'arraybuffer';
				//D.req.overrideMimeType( 'text/plain charset=x-user-defined' )
				break;
		}

		if (D.method === 'post') {
			D.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		}

		D.req.send(queryString);
	};

	DataLoader.prototype._handleStateChange = function _handleStateChange(target) {
		var D = this;
		switch (D.req.readyState) {
			case 3:
				if (this.req.status == 200) {
					D.dataRaw = D.responseType ? D.req.response : D.req.responseText;
					D._handleProgress(D);
				}
				break;
			case 4:
				if (D.req.status == 200) {
					D.dataRaw = D.responseType ? D.req.response : D.req.responseText;
					D._handleComplete(D);
				} else {
					D._handleFail({
						target: target
					});
				}
				break;
		}
	};

	DataLoader.prototype._handleProgress = function _handleProgress() {
		var D = this;
		D.onProgress.call(D.scope, D);
	};

	DataLoader.prototype._handleComplete = function _handleComplete() {
		var D = this;
		// console.log('DataLoader "' + D.name + '" is Complete')
		D.onComplete.call(D.scope, D);
	};

	return DataLoader;
}(mix(Blank).with(LoaderBase, LoaderSource));

/**
    @npmpackage
    @class MathUtils
    @desc
				Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
				<br>
				<codeblock>
					// importing into an ES6 class
					import { MathUtils } from 'ad-utils'
				</codeblock>
				<br><br>
				
        Common math utilities.
*/

function randomWeightedKey(obj) {
	var keys = [];
	var vals = [0];
	for (var param in obj) {
		keys.push(param);
		vals.push(obj[param] + (vals[vals.length - 1] || 0));
	}
	//console.log(keys)
	//console.log(vals)

	var rand = Math.random().toFixed(2) * 100;
	for (var k = 0; k < vals.length - 1; k++) {
		var isIn = inRange(rand, vals[k], vals[k + 1]);
		//console.log('\t', k, rand, vals[k], vals[k+1], isIn)
		if (isIn) {
			//  console.log('\t\t', keys[k])
			return keys[k];
		}
	}
}

/**
		@memberOf MathUtils
		@method inRange
		@param {number} val
				the number to check
		@param {number} a
				the first value of the range
		@param {number} b
				the second value of the range
		@returns {boolean}
		@desc
				Checks if a value is in the range of two numbers.
		@example
				MathUtils.inRange ( 5, 1, 10 ); // true
				MathUtils.inRange ( -5, 1, 10 ); // false
*/
function inRange(val, a, b) {
	var min = Math.min(a, b);
	var max = Math.max(a, b);
	return val <= max && val >= min;
}

var live = 'https://json.ff0000-cdn.net/';
var preview = 'https://preview.ff0000-cdn.net/preview/';
var liveQA = 'https://qa.ff0000-cdn.net/';
var previewQA = 'https://qa.velvet.tech/preview/';

var INIT = 'velvetInit';
var FAIL = 'velvetFail';
var STATIC = 'velvetStatic';

var E = /*#__PURE__*/Object.freeze({
	INIT: INIT,
	FAIL: FAIL,
	STATIC: STATIC
});

var _eventPool = {};

function add(type, handler) {
	if (!_eventPool[type]) {
		_eventPool[type] = [];
	}
	var arr = _eventPool[type];
	for (var i = 0, k = arr.length; i < k; i++) {
		if (arr[i] === handler) return;
	}
	arr.push(handler);
}

function remove(type, handler) {
	var arr = _eventPool[type];
	if (arr) {
		for (var i = 0, k = arr.length; i < k; i++) {
			if (arr[i] === handler) {
				arr.splice(i, 1);
				break;
			}
		}
	}
}

function dispatch(type) {
	if (_eventPool[type]) {
		_eventPool[type].map(function (handler) {
			handler();
		});
	}
}

/**
	@npmpackage
	@class	Velvet
	@static
	@desc
		Import from <a href="https://github.com/ff0000-ad-tech/ad-velvet">ad-velvet</a>
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Velvet } from 'ad-velvet'
		</codeblock>
		<br><br>
		
		This object is meant to handle all of our json loading and parsing from the Velvet platform.

<br><br>

When testing, changing the date can be a crucial testing step. see DateManager for more information.
*/

// import { AmoduleA } from 'ad-test-a'

var _baseUrlNow = undefined;
var _settings = undefined;
var _resolved = undefined;

/* ------------------------------------------------------------------------------------------------------------- */
var adDataRaw = {};

/* ------------------------------------------------------------------------------------------------------------- */
// PUBLIC METHODS

/** 
	@memberOf Velvet
	@method init
	@param {object} settings
		see "Properties" for more information
	@property {string} client
		the first "slug" in the url string
	@property {string} locale
		the second "slug" in the url string
	@property {string} segment
		the third "slug" in the url string - this defines the segment, aka the map to which addata will be loaded	
	@property {string} addata
		Optionally, when viewing an addata url, the last "slug" defines which data set id being used. This can be manually set in the ad, mostly jsut for testing purposes
	@desc
		This passes the settings object from parent scope and initialized the class.  In the index is an Object of "slugs" which are 10 digit Strings which 
		are keys for locations of the client, locale, segment of the that data on Velvet cdn.

	@example
		// in the index.html, inside adParams:
		velvet : {
			client 	: "ZcHT9C9y6Z",
			locale	: "whV1g8DKPe",
			segment	: "C4iaBG6CoP",
			//adData 	: "jaScLD8ayE"
		}
*/
function init(slugs, dateSettings) {
	DateManager.init(dateSettings);

	// AmoduleA.funcA('blah')

	console.log('Velvet.init()');

	// check if on QA or not first. Must use referrer as window.location.href will not bubble up out of the iframe
	var isQA = document.referrer.match(/qa\.velvet\.tech/);

	if (isQA) {
		console.log('\tis on qa.velvet.tech');
	}

	if (isPreviewLocation()) {
		console.log('\tPreview requested');
		_baseUrlNow = isQA ? previewQA : preview;
	} else {
		console.log('\tLive requested');
		_baseUrlNow = isQa ? liveQA : live;
	}

	_settings = slugs;

	_baseUrlNow += _settings.client + '/' + _settings.locale + '/';
	console.log('\tbase url:', _baseUrlNow);

	var query = getQueryParams();
	var addataSlug = query['addata'];
	if (addataSlug) {
		console.log('\t\tAd Data set via query:', addataSlug);
		_settings.addata = addataSlug;
	}

	return new Promise(function (resolve, reject) {
		_resolved = resolve;
		console.log('\tVelvet.init() Promise');
		_settings.addata ? loadAdData() : loadSegment();
	});
}

/** 
	@memberOf Velvet
	@method isPreviewLocation
	@description
		This method returns true for all the locations that should load PREVIEW.JSON instead of published.json.
		Safeguards are in place so that even an ad in a staging/build-state will load published json, if running in 
		any http(s) locations other than the ones listed. 
*/
function isPreviewLocation() {
	// console.log('\n\n Velvet.isPreviewLocation() > queryParams? \n\n')
	var href = window.location.href;
	if (href == undefined || href == null) return false;
	if (getQueryParams()['velvet'] === 'production') return false;
	// local locations
	if (href.match(/^file/) || href.match(/manta\.joyent\.com/) || href.match(/ff0000\.com/) || href.match(/adprodtest/) || href.match(/client\-projects\.com/) || href.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+/)) {
		return true;
	}

	// other locations
	return false;
}

/* ------------------------------------------------------------------------------------------------------------- */
// PRIVATE METHODS
function loadSegment() {
	new DataLoader(_baseUrlNow + _settings.segment, {
		name: 'segmentLoader',
		fileType: 'json',
		onComplete: handleSegmentLoadComplete,
		onFail: handleFail
	}).load();
}

function loadAdData() {
	new DataLoader(_baseUrlNow + _settings.addata, {
		name: 'velvetAdDataLoader',
		fileType: 'json',
		onComplete: handleAdDataLoadComplete,
		onFail: handleFail
	}).load();
}

/* ------------------------------------------------------------------------------------------------------------- */
// EVENT HANDLERS
function handleSegmentLoadComplete(event) {
	var segmentJson = JSON.parse(event.dataRaw);
	console.log('Velvet segment Json:\n', segmentJson);

	// check if there is a timezone to apply as default to all display times:
	DateManager.setDefaultTimezone(segmentJson.tz);

	var timeblocks = segmentJson.timeblocks;

	var now = DateManager.getNow();
	console.log('\tnow:', now);

	var i = void 0;
	// sort through timeblocks to find the current
	for (i = 0; i < timeblocks.length; i++) {
		var startDate = timeblocks[i].time;
		console.log('\t\t>', new Date(startDate));
		if (now < startDate) {
			break;
		}
	}
	var latestIndex = i - 1;

	if (latestIndex < 0) {
		handleFail();
		return;
	} else {
		console.log('\tselected timeblock:', timeblocks[latestIndex]);
	}
	var rotation = timeblocks[latestIndex].ad_rotation;
	_settings.addata = randomWeightedKey(rotation);
	console.log('\tselected ad slug:', _settings.addata);

	if (_settings.addata === 'USE_STATIC') {
		dispatch(STATIC);
		return;
	}

	loadAdData();
}

function handleAdDataLoadComplete(event) {
	console.log('Velvet.handleAdDataLoadComplete()');
	adDataRaw = JSON.parse(event.dataRaw);
	console.log('Velvet Raw addata:\n', adDataRaw);

	_resolved();
	dispatch(INIT);
}

function handleFail() {
	dispatch(FAIL);
}

/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Capture

	Description:
		This class controls the communication with the backend to enable static snap shots of the ad's endframe,
		including the ability to take a shot of every date for a unit with a DateSchedule determining its messaging.
		<br>
		<codeblock>
			// importing into an ES6 class
			import { Capture } from 'ad-velvet'
		</codeblock>
		<br><br>
	
	Adding a Schedule:
		(start code)
			// within AdData.js
			import { Capture } from 'ad-velvet'

			// create a schedule
			var schedule = new DateSchedule({
				target: new TzDate({
					datetime: Velvet.get('tune_in.datetime'),
					outputTimezone: Velvet.get('tune_in.timezone')
				}),
				isStandard: true
			});

			// add the schedule to Capture
			Capture.addSchedule(schedule)
			// make a call that will be heard by Velvet
			Capture.dispatchData()
		(end code)

	Adding custom data to be passed into the ad:
		(start code)
			// within AdData.js
			import { Capture } from 'ad-external'

			Capture.addCustomData({ type:'yellow' });
			Capture.dispatchData()
		(end code)

	Calling the snap shot at the end of the ad:
		(start code)
			// within Control
			this.animationComplete = function() {
				console.log( 'Control.animationComplete()' );
				Capture.dispatchSnapshot();
			}

			// then from the end of the animation, call 
			Control.animationComplete()

		(end code)
		
	Notes:
		Some notes forthcoming.

	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
var _collection = [];

/**
	@memberOf Capture
	@method schedule
	@param {DateSchedule} schedule
		A DateSchedule instance that determines different endframe messaging/layout
	@desc
		Add a DateSchedule to the class to be dispatched back to the server.  A screen snap shot will be generated for each 
		date in the schedule. This method can be called as many times as necessary such as with an ESPN double header. However, 
		this should correspond to any DateSchedule that affects the endframe's layout/messaging only. 
*/
function addSchedule(schedule) {
	console.log('Velvet.capture.addSchedule()');
	var dates = schedule.getDates(true);

	for (var i = 0; i < dates.length; i++) {
		var item = dates[i];
		var date = item.date;

		var obj = {
			date: date.toISO(),
			tz: date.outputTimezone.abbr[0],
			ltz: adParams.defaultTimezone,
			label: item.standardKey
			// console.log('\t', date.toFullDateTime(), '\t', item.standardKey, '\t', obj)

		};_collection.push(obj);
	}
}

/**
	@memberOf Capture
	@method addCustomData
	@param {Object} obj
		An object with key/value pairs
	@desc
		Add an Object to the class to be dispatched back to the server.  A screen snap shot will be generated for each 
		data object. This method can be called as many times as necessary. 
*/
function addCustomData(obj) {
	console.log('Velvet.capture.addCustomData()');
	if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
		throw new Error('Cannot use a primative as data, must be an Object passed to .addCustomData()');
	}
	_collection.push(obj);
}

/**
	@memberOf Capture
	@method dispatchData
	@desc
		Passes all schedule dates or data objets back to the server.  If it is dates, this is the list of dates that the ad will 
		be set to inorder to get each different end frame messaging. If it is other data, it will be passed through the query string 
		and can be consumed by the ad to indicate which state to shoot inThis should be called from AdData after all DateSchedules 
		are defined and passed in.
*/
function dispatchData() {
	if (_collection.length === 0) {
		_collection.push({ foo: 'bar' });
	}
	console.log('Velvet.capture.dispatchData()\n\t', _collection);
	dispatch$1('setParameters', _collection);
}

/**
	@memberOf Capture
	@method dispatchSchedule
	@desc
		Calls back to the server to take a screen snap shot. This must be called after all animation is complete. 
*/
function adComplete() {
	console.log('Velvet.capture.adComplete()');
	dispatch$1('adComplete');
}

/**
	@memberOf Capture
	@method dispatchStart
	@desc
		Calls back to the server to start video capture. This must be called at the start of the ad. 
*/
function adStart() {
	console.log('Velvet.capture.adStart()');
	dispatch$1('adStart');
}

function dispatch$1(event) {
	var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	if (typeof window.callExternal === 'function') {
		window.callExternal({
			event: event,
			data: data
		});
	}
}

var C = /*#__PURE__*/Object.freeze({
	addSchedule: addSchedule,
	addCustomData: addCustomData,
	dispatchData: dispatchData,
	adComplete: adComplete,
	adStart: adStart
});

var _recursive = void 0;
var _result = [];
var _targetKey = void 0;
var _anchor = void 0;
var _splits = void 0;
var _isPathed = void 0;

/** 
	@memberOf Velvet
	@method get
	@param {object|string|boolean} arguments
		The arguments have many possible uses:
		<br>
		1. A String can be a name of a node or a path to a node seperated by a "."
		<br>  
		2. Object followed by a String is used to specify a starting point for the get method to search for the node provided as the 
		second argument on the String.  
		<br>
		3. A boolean of true as the last argument (second for option 1, third for option 2), will have the method search recurrsively through
		the data object for the key. Otherwise, it will only look at the level provided.
		<br>
		See the example.
	@description
		This method is used to get any node from the JSON by name. All nodes in Velvet have a 'type' and 'value'; the return is always the 'value'
	@example
		// sample Velvet JSON data
		{
			title : {
				type : "SingleLineText",
				value  : "WHAT DO YOU SEE?"
			},
			matchup : {
				type : "CollectionSeries",
				value  : [
					game : {
						type : "CollectionSingleItem",
						value : {
							away_team : {
								type : "CollectionSingleItem",
								value : {
									name : {
										type : "SingleLineText",
										value : "USC"
									},
									color :  {
										type : "Color",
										value : "#003da5"
									},
									logo : {
										type : "Image",
										value : {
											content_type : "image/png",
											name : "USC_sg1SohS.png",
											url : "https://us-east.manta.joyent.com/adtech/public/ad_manager/clients/3YLOU2j85h/collections/TCAHAe8v8B/USC_sg1SohS.png"
										}
									}
								}
							},
							home_team : {
								type : "CollectionSingleItem",
								value : {
									name : {
										type : "SingleLineText",
										value : "Standford"
									},
									color :  {
										type : "Color",
										value : "#A80532"
									},
									logo : {
										type : "Image",
										value : {
											content_type : "image/png",
											name : "stanford.png",
											url : "https://us-east.manta.joyent.com/adtech/public/ad_manager/clients/3YLOU2j85h/collections/tLtLMaynyq/stanford.png"
										}
									}
								}
							}
						}
					}
				]
			},
			live_url : {
				type : "URL",
				value : "http://es.pn/2cilNDt?ex_cid=2016_CFB_Banner_3_50005170003"
			}
		}

		// Provide a node name
		var title = Velvet.get ( 'title' );  // "WHAT DO YOU SEE?"

		// Get a collection, such as a team for later use:
		var awayTeam = Velvet.get ( 'away_team', true ); 
		// returns the whole object of the away_team. Since 'away_team' is nested, the true
		// will make the get go recursively through all children to find the node.
		// NOTE: there is only 1 instance of "away_team" so only 1 will return. 
		// However, if there were more matchups, it would return all away teams as an array.  
		// So to target specifically this matchup, call the away team by targeted path.
		// To do so, write out the path using a "." for each child.
		var awayTeam = Velvet.get ( 'matchup.0.game.away_team' );
		// Note that there is no need to use the ".value" key as the system assumes
		// that for you when using Velvet.get().  This returns the object as is, so 
		// if you use it later, you will need to specify the ".value" to read properly

		// OR

		// Use the variable as a starting point for the searching
		var awayTeamName = Velvet.get ( awayTeam, 'name' );  // "USC"
*/
function get() {
	// check if the first arg is a key = 'node' / 'path.node' OR is it a sub object to look within
	var _useRawObject = typeof arguments[0] === 'string';

	var key = arguments[_useRawObject ? 0 : 1];
	var source = _useRawObject ? adDataRaw : arguments[0];

	// will it search through all layers? default false
	_recursive = !!arguments[_useRawObject ? 1 : 2];

	// if (_debug) console.log(Array(100).join('-') + '\nget(', key, ')\nwithin:', source, '\_recursive:', _recursive)
	_result = [];

	// strip the original key of all '.values'
	var strippedKey = key.replace(/\.value(\.|)/g, '.').replace(/\.$/, '');
	// if (_debug) console.log('\tstrippedKey:', strippedKey)

	// split the path up, eg: 'grand.parent.child' > [ grand, parent, child ]
	_splits = strippedKey.split('.');
	_anchor = undefined;
	// remove the last value with is the target node
	_targetKey = _splits.pop();

	// add back in all the '.value' where applicable
	var pathInExpanded = '';
	for (var i = 0; i < _splits.length; i++) {
		if (i > 0) pathInExpanded += '.';
		pathInExpanded += _splits[i];
		if (isNaN(_splits[i])) {
			pathInExpanded += '.value';
		}
	}
	// if (_debug) console.log('\tkey:', key, '\n\t_splits:', _splits, '\n\tpathInExpanded:', pathInExpanded)

	// is the a specific path to follow or just a key?
	_isPathed = _splits.length > 0;
	if (_isPathed) {
		_splits = pathInExpanded.split('.');
		// extract out the _anchor to know where the path starts at, not necessarily at the top
		_anchor = _splits.shift();
		_splits.push(_targetKey);
	}

	// start walking through the top object or array supplied
	walk(source);

	if (_result.length == 1) {
		_result = _result[0];
		// add explicit check for type object because IE
		if (_result && (typeof _result === 'undefined' ? 'undefined' : _typeof(_result)) == 'object' && Object.keys(_result).length == 0) {
			_result = undefined;
		}
	} else if (_result.length == 0) {
		_result = undefined;
	}

	// if (_debug) console.log(_result)

	return _result;
}

function walk(elem) {
	switch (Object.prototype.toString.call(elem)) {
		case '[object Object]':
			walkObject(elem);
			break;
		case '[object Array]':
			walkArray(elem);
			break;
	}
}

function walkObject(obj) {
	// if (_debug) console.log('walkObject() >', obj)

	// at this level, just check key? if not found AND recurrsive, then use loop
	for (var param in obj) {
		readProperty(obj, param);
	}
}

function walkArray(arr) {
	if (!_isPathed && !isNaN(_targetKey)) {
		// if looking for an index value of a passed in array
		_result.push(arr[_targetKey]);
	} else {
		for (var i = 0; i < arr.length; i++) {
			walkObject(arr[i]);
		}
	}
}

function readProperty(obj, param) {
	// if (_debug) console.log('\t\t\t readProperty()', obj, param, '|', _anchor, '|', _targetKey)
	if (param == _targetKey && !_isPathed) {
		// if a match is found
		// AND
		// only if no path is set, store it, otherwise it will
		// store false equivelants when recurively going through objects

		_result.push(properKey(obj[param]));
	} else if (param == _anchor) {
		// if the _anchor, eg 'grand', is found, skip to reading the whole path eg 'grand.parent.child'
		var narrowDown = readPropertyPath(_splits, obj[param]);
		// if (_debug) console.log('param:', param, '\n\tnarrowDown:', narrowDown, '\n\tobj[param]:', obj[param], param)
		if (narrowDown) {
			_result.push(properKey(narrowDown));
		}
		return;
	}
	// only if looping thought recursivley, handle objects or arrays
	if (_recursive) {
		walk(obj[param]);
	}
}

function properKey(obj) {
	return obj.hasOwnProperty('value') ? obj.value : obj;
}

// repurposed from ObjectUtils, reads a path 'grand.parent.child' and returns that node on 'child'
function readPropertyPath(_splits, obj) {
	var _result = obj || {};
	var s;
	for (var i = 0; _result && (s = _splits[i]); i++) {
		_result = s in _result ? _result[s] : undefined;
	}
	return _result;
}

var init$1 = init;
var isPreviewLocation$1 = isPreviewLocation;
var addEventListener = add;
var removeEventListener = remove;
var add$1 = add;
var remove$1 = remove;
var events = E;
var capture = C;
var get$1 = get;



/***/ })
/******/ ]);
});
