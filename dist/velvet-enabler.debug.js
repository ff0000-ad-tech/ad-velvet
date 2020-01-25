!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1);["TzDate","RecurringSchedule","DateSchedule","DateFormatter","DateManager","DateUtils","Timezone"].forEach(function(e){window[e]=r[e]}),window.DateFormatter.addLanguage(r.spanish)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){function r(e){return Math.PI/180*e}function a(e){return 180/Math.PI*e}function o(e,t,n){t=t||0,n=void 0!=n&&n>0?n:1;var r=Math.min(e,t),a=Math.max(e,t);return r=Math.ceil(r/n)*n,a=Math.floor(a/n)*n,r+Math.floor(Math.random()*((a-r+n)/n))/(1/n)}function i(e){return e=e||.5,Math.random()<e}function u(e){var t=[],n=[0];for(var r in e)t.push(r),n.push(e[r]+(n[n.length-1]||0));for(var a=100*Math.random().toFixed(2),o=0;o<n.length-1;o++){if(c(a,n[o],n[o+1]))return t[o]}}function l(e,t,n,r,a){return(a-n)/(r-n)*(t-e)+e}function c(e,t,n){var r=Math.min(t,n);return e<=Math.max(t,n)&&e>=r}function s(e){return!isNaN(e)}function f(e){return+e}function d(e,t,n){return Math.max(t,Math.min(n,e))}function p(e,t,n,r){var e=e+Math.cos(r)*n,t=t+Math.sin(r)*n;return[e,t]}function g(e,t,n,r){return n=n||0,r=r||0,Math.atan2(r-t,n-e)}function m(e,t,n,r){return n=n||0,r=r||0,Math.sqrt((r-t)*(r-t)+(n-e)*(n-e))}function v(e){for(var t="",n=0;n<e;n++)t+="&nbsp;";return t}function T(t,n){t=e.proxyStringToLowerCase.apply(t);for(var r=0;r<X.length;r++){if(e.proxyStringToLowerCase.apply(X[r].label)===t)return n?X[r].upperCase:X[r].lowerCase}return!1}function D(e){return e?e.replace(/^\s\s*/,"").replace(/\s\s*$/,""):""}function b(e){return e.split(" ").join("")}function h(e,t){var n="";for(e<0&&(n="-"),e=e.toString().replace(/\-/,"",e);e.length<t;)e="0"+e;return n+e}function S(e){G=e||G}function y(e){for(var t in e)J[t]=e[t]}function M(e){return J[e||G]}function O(e,t){e=e.toString();var n=e.slice(e.length-1),r=M(),a=r.TH;switch(n){case"1":"11"!=e&&(a=r.ST);break;case"2":"12"!=e&&(a=r.ND);break;case"3":"13"!=e&&(a=r.RD)}return(t?e:"")+a}function A(e,t,n){n=n||{};var r=n.inTimezone||e.outputTimezone,a=n.language,o=e.getIn(r),i=M(a),u=o.getMonth(),l=o.getHours(),c=o.getMinutes();return t.replace(/\$\{(.*?)\}/g,function(e,t){var n=t,a=0,s=void 0,f=!1,d=!0,p=!0;switch(t.replace(/(.+)(\^)/,function(e,n){t=n,f=!0}),2==t.length&&t.replace(/(?![Yo])([a-zA-Z]).*?\1/,function(e,n){t=n.substr(0,1),s=2}),t){case"YY":a=-2;case"YYYY":n=(""+o.getFullYear()).slice(a);break;case"M":n=u+1;break;case"MMM":n=i.MONTHS_ABRV[u];break;case"MMMM":n=i.MONTHS_FULL[u];break;case"D":n=o.getDate();break;case"o":p=!1;case"Do":n=O(o.getDate(),p);break;case"DDD":n=i.WEEKDAYS_ABRV[o.getDay()];break;case"DDDD":n=i.WEEKDAYS_FULL[o.getDay()];break;case"t":d=!1;case"T":n=l,d||0==(n%=12)&&(n=12),c>0&&(s=!0),s&&(n+=":"+V.pad(c,2));break;case"H":n=l;break;case"h":n=l%12,0==n&&(n=12);break;case"m":n=c;break;case"s":n=o.getSeconds();break;case"a":n=l>=12?"pm":"am";break;case"z":n=r.abbr[0]}return s&&(n=V.pad(n,s)),f&&"string"==typeof n&&(n=n.toUpperCase()),n})}function w(e,t){var n=t.getTime()/1e3-e.getTime()/1e3;n<0&&(n=0);for(var r={day:n/86400,hour:n/3600%24,minute:n/60%60,second:n%60,output:""},a=["day","hour","minute","second"],o=0;o<4;o++)r.output+=V.pad(Math.floor(r[a[o]]),2),o<3&&(r.output+=":");return r}function E(e,t){var n=void 0;n=e._isTzDate?e.clone():new Date(e);for(var r in t){var a=q[r.toUpperCase()],o=t[r]*a;n.setTime(n.getTime()+o)}return n}function z(e,t){return void 0==t&&(t=F()),t.getTime()>=e.getTime()}function C(){return re}function _(e){ne=N(e);var t=ne.value,n=(new Date).getTimezoneOffset(),r=Math.floor(n/60),a=n%60,o=Math.floor(t),i=t%1*60,u=-(o+r),l=-(i+a);t>0&&(u=24+u),re[0]=u,re[1]=l}function N(e,t){var n=e;if("local"==e||void 0==e)n=ne?"string"==typeof ne?ne:ne.label:I(t);else{if("UTC"==e||"UTC"==e.label||"utc"==e)return{label:"UTC",abbr:["utc"],value:0};"trueLocal"==e&&(n=I(t))}if("string"==typeof n){if(n.length<5){var r=x(n);r&&(n=r)}}else n=e.label;var a={},o=Q[n];if(o){var i=o.split("|");a.label=n,a.abbr=i[0].split(",");var u=i[1].split(",");if(u.length>1){var l=t||new Date,c=l.getFullYear();c<2018&&(c=2018);var s=n.split("/"),f=k(s[0],c);f||(f=k(s[1],c));var d=f.split(","),p=new Date(c+"-"+d[0]+"T03:00:00"+L(u[1])),g=new Date(c+"-"+d[1]+"T03:00:00"+L(u[0])),m=(E(l,{hour:u[0]}),l.getTime()>p.getTime()&&l.getTime()<g.getTime()),v=m?0:1;a.value=u[v]}else a.value=u[0]}else a.label=n,a.abbr=[n.toLowerCase()],a.value=-(new Date).getTimezoneOffset()/60;return a}function L(e){var t=isNaN(e)?e.value:e,n=t>0?Math.floor(t):Math.ceil(t),r=t%1*60;return r=t>0?Math.floor(r):Math.ceil(r),(t<0?"-":"+")+V.pad(Math.abs(n),2)+":"+V.pad(Math.abs(r),2)}function x(e){var t=void 0,n=e.toLowerCase();for(var r in Q){if(Q[r].split("|")[0].split(",").indexOf(n)>=0){t=r;break}}return t}function I(e){var t=e||new Date,n=t.toTimeString(),r=n.split("(")[1];return r=r.substr(0,r.length-1),r.replace(/[a-z\.\s]/g,"")}function k(e,t){if("string"==typeof te[e]){var n=te[e].split("|").map(function(e){return e.split(",").map(function(e){return V.pad(e,2)})});te[e]={};var r=n[0],a=n[2];n[1].map(function(t,n){te[e][ee+n]=r[0]+"-"+t+","+r[1]+"-"+a[n]})}if(te[e])return te[e][t]}function U(){var e={},t=window.location.href.split("?");if(t.length>1){var n=t[1].split("&");for(var r in n){var a=n[r].split("=");2==a.length&&(e[a[0]]=decodeURIComponent(a[1]))}}return e}function Y(e){if(e=e||{},console.log("DateManager.init()",e),!ue){ue=!0,y(oe);var t=U(),n=t.date,r="SYSTEM-DATE";n?(ie=n,r="EXTERNAL-DATE"):e.dateOverride&&e.inDev&&(ie=e.dateOverride,r="INTERNAL-DATE");var a=void 0;if(ie){a=new R({datetime:ie}).outputTimezone;var o=t.tz;o&&(a=o)}_(a);var i=t.ltz;i&&(le=i),console.log("-- CURRENT DATE "+Array(104).join("-")),console.log(""),console.log("\t DATE-MODE:"),console.log("\t\t",r),console.log(""),console.log("\t Time for this unit is now assumed to be: "),console.log("\t\t",F().toFullDateTime()),console.log(""),i&&(console.log("\t External default timezone is: "),console.log("\t\t",i),console.log("")),console.log(Array(120).join("-")),e.language&&S(e.language)}}function j(){return le}function P(e){e&&(le=e,console.log("\nDateManager.setDefaultTimezone():",le,"\n\n"))}function F(){var e=ie;return void 0==e&&(e=(new Date).toISOString().split(".")[0]+"+00:00"),new R({datetime:e,outputTimezone:N("local")})}function R(e){e=e||{};var t="local",n=e.datetime;if(Array.isArray(n)){n=e.datetime[0],t=e.datetime[1];if(!n.match(/(\+|\-)([0-9]{2})\:([0-9]{2})/g)){n+=L(N(t))}}"string"==typeof n&&(n=n.replace(/(\T|\s)/g,"T")),e.outputTimezone?t=e.outputTimezone:j()&&(t=j());var r=new Date(n);return Object.defineProperties(r,{outputTimezone:{get:function(){return t},set:function(e){t=N(e)}}}),r.clone=function(e){return e=e||r.outputTimezone,new R({datetime:r,outputTimezone:e})},r.getHoursIn=function(e,t){var n=r.getIn(e),a=n.getHours();return 1!=t&&a>12&&(a%=12),a},r.format=function(e,t){return A(r,e,t)},r.getIn=function(e){var t=r.toISOString().split(".")[0],n=L(N("trueLocal",r)),a=N(e||r.outputTimezone,r);return E(new Date(t+n),{hour:a.value})},r.print=function(e){var t=r.toFullDateTime(e);return console.log(t),t},r.toFullDateTime=function(e){return e=e||r.outputTimezone,r.getIn(e).toString().split("GMT")[0]+e.label},r.toSimpleDate=function(e){var t=r.getIn(e);return t.getMonth()+1+"/"+t.getDate()},r.toDate=function(e){var t=r.getIn(e);return r.toSimpleDate(e)+"/"+t.getFullYear()},r.toDateTime=function(e){return r.toDate(e)+" "+r.toTime(e)},r.toSimpleDateTime=function(){return r.toSimpleDate()+" "+r.toTime()},r.toTime=function(e){return r.toSimpleTime(e)+" "+r.toMeridiem(e)},r.toSimpleTime=function(e,t){var n=r.getIn(e),a=r.getHoursIn(e,t);return 0!=a||t||(a=12),t&&(a=V.pad(a,2)),a+":"+V.pad(n.getMinutes(),2)},r.toMeridiem=function(e,t){var n=e||r.outputTimezone;return(r.getIn(n).getHours()>=12?"pm":"am")+(1==t?"/"+n.abbr[0]:"")},r.toShortestTime=function(e,t){return r.toSimpleTime(e,t).replace(/:00$/g,"")},r.toDateTimeISO=function(e){var t=r.toDate(e),n=t.split("/");return n[2]+"-"+V.pad(n[0],2)+"-"+V.pad(n[1],2)+"T"+r.toSimpleTime(e,!0)+":00"},r.toISO=function(){return r.toDateTimeISO(r.outputTimezone)+L(r.outputTimezone)},r._isTzDate=!0,r.outputTimezone=t,r}function H(e){e=e||{};var t=this,n=[],r={},a=void 0,o=!1,i=e.callback||function(){},u=e.tonightStartsAt||"17:30",l=0!=e.hasOneDayOf,c=e.eventDuration||120;Object.defineProperties(t,{target:{get:function(){return a}},current:{get:function(){return n[t.currentIndex]}},currentDate:{get:function(){return t.current.date}},currentLabel:{get:function(){return t.current.label}},currentIndex:{get:function(){for(var e=-1,t=0,r=n.length;t<r&&z(n[t].date);t++)e=t;return e}},next:{get:function(){return n[t.nextIndex]}},nextDate:{get:function(){return t.next.date}},nextLabel:{get:function(){return t.next.label}},nextIndex:{get:function(){return K.restrict(t.currentIndex+1,0,n.length-1)}},isLive:{get:function(){return"NOW"==t.current.standardKey}},isComplete:{get:function(){return"PAST"==t.current.standardKey}}}),t.addDate=function(e,i,c){var s=arguments[3],f=e,d=!1,p=!0;if(!e._isTzDate){var g=a;switch(s){case"PAST":p=!1;break;case"TONIGHT":for(var m=a.toDateTimeISO().split("T")[0]+"T",v=u.split(":"),T=0;T<3;T++)m+=V.pad(v[T]||0,2)+":";m=m.slice(0,-1),g=new R({datetime:[m,a.outputTimezone]}),d=g.getTime()>a.getTime(),o=!d,p=l&&o;break;case"TODAY":d=l&&o}p&&(g=a.clone(N("local")),g.setHours.apply(g,C())),f=E(g,e)}var D=i;if(s){var b=r[s];void 0!=b?i=b:"string"==typeof i&&(i=M()[s])}if("function"==typeof i){var h=s&&a?a:f,S=s?"WEEK"==s?D.call(t,h):M()[s]:null;i=i.call(t,h,S)}return d||(n.push({date:f,label:i,standardKey:s,callback:c||function(){}}),n.sort(function(e,t){var n=e.date.getTime(),r=t.date.getTime();return n<r?-1:n>r?1:0})),f},t.print=function(){var e=n.length;console.log("DateSchedule.print(), length:",e);for(var r=0;r<e;r++)console.log(" -",r,n[r].date.toFullDateTime(),"label:",n[r].label);return t},t.getDates=function(e){e=!!e;for(var t=[],r=0,a=n.length;r<a;r++)t.push(e?n[r]:n[r].date);return t};var s=e.standardOverrides;if(s)for(var f in s)r[f]=s[f];e.target&&(a=t.addDate(e.target,"",i,"NOW"),t.addDate({minute:c},"",i,"PAST")),t.addDate(new R({datetime:"2000-01-01T00:00:00+00:00",outputTimezone:"UTC"}),function(e){return e.toSimpleDateTime()},i,"DATE"),a&&1==e.isStandard&&(t.addDate({},"",i,"TONIGHT"),t.addDate({},"",i,"TODAY"),t.addDate({hour:-24},"",i,"TOMORROW"),t.addDate({hour:-144},function(e){return M().WEEKDAYS_FULL[e.getIn(a.outputTimezone).getDay()]},i,"WEEK"))}n.d(t,"DateFormatter",function(){return $}),n.d(t,"DateManager",function(){return ce}),n.d(t,"DateUtils",function(){return Z}),n.d(t,"Timezone",function(){return ae}),n.d(t,"TzDate",function(){return R}),n.d(t,"RecurringSchedule",function(){return se}),n.d(t,"DateSchedule",function(){return H}),n.d(t,"english",function(){return oe}),n.d(t,"spanish",function(){return fe});var W="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},K=("function"==typeof Symbol&&W(Symbol.iterator),Object.freeze({toRadians:r,toDegrees:a,random:o,randomBoolean:i,randomWeightedKey:u,rel:l,inRange:c,isNumber:s,toNumber:f,restrict:d,getAnglePoint:p,getAngle:g,getDistance:m})),B={};B.get=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:window,n=B._getSplits(e).splits;return B._getProperty(n,t)},B.set=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,r=B._getSplits(e,!0);B._getProperty(r.splits,n)[r.lastKey]=t},B._getSplits=function(e,t){var n=e.split(".");return{splits:n,lastKey:t?n.pop():null}},B._getProperty=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t,r=void 0,a=0;n&&(r=e[a]);a++)n=r in n?n[r]:void 0;return n};var X=[{label:"iexcl",upperCase:"&#161;",lowerCase:"&#161;"},{label:"trademark",upperCase:"&#153;",lowerCase:"&#153;"},{label:"copyright",upperCase:"&#169;",lowerCase:"&#169;"},{label:"registered",upperCase:"&#174;",lowerCase:"&#174;"},{label:"nTilde",upperCase:"&#209;",lowerCase:"&#241;"},{label:"aAccent",upperCase:"&#193;",lowerCase:"&#225;"},{label:"eAccent",upperCase:"&#201;",lowerCase:"&#233;"},{label:"iAccent",upperCase:"&#205;",lowerCase:"&#237;"},{label:"oAccent",upperCase:"&#211;",lowerCase:"&#243;"},{label:"uAccent",upperCase:"&#218;",lowerCase:"&#250;"}],V=Object.freeze({addSpaces:v,getSpecialCharacter:T,trimStartAndEnd:D,removeSpaces:b,pad:h}),G="english",J={},$=Object.freeze({setLanguage:S,addLanguage:y,getLabels:M,getNumericSuffixFor:O,format:A}),q={SECOND:1e3,MINUTE:6e4,HOUR:36e5,DAY:864e5,WEEK:6048e5},Z=Object.freeze({getTimeDifference:w,adjust:E,isPast:z}),Q={"US/Eastern":"et,edt,est|-4,-5","US/Central":"ct,cdt,cst|-5,-6","US/Mountain":"mt,mdt,mst|-6,-7","US/Pacific":"pt,pdt,pst|-7,-8","US/Alaska":"akt,akdt,akst|-8,-9","US/Arizona":"az|-7","US/Hawaii":"hast|-10","Australia/Brisbane":"aest|10","Australia/Sydney":"aedt,aest|10,11","America/Mexico_City":"mx|-5,-6","America/Bogota":"cot|-5","America/Argentina/Buenos_Aires":"art|-3"},ee=2018,te={US:"3,11|11,10,8,14,13,12,10,9|4,3,1,7,6,5,3,2",Australia:"4,10|1,7,5,4,3,2,7,6|7,6,4,3,2,1,6,5",Mexico_City:"4,10|1,7,5,4,3,2,7,6|28,27,25,31,30,29,27,26"},ne=void 0,re=[0,0,0],ae=Object.freeze({getTzDiff:C,setLocal:_,get:N,toISO:L}),oe={english:{MONTHS_FULL:["January","February","March","April","May","June","July","August","September","October","November","December"],MONTHS_ABRV:["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"],MONTHS_EXCP:["","","","","","","","","sept","","",""],WEEKDAYS_FULL:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],WEEKDAYS_ABRV:["sun","mon","tue","wed","thu","fri","sat"],WEEKDAYS_EXCP1:["","","tues","wednes","thur","",""],WEEKDAYS_EXCP2:["","","","","thurs","",""],ST:"st",ND:"nd",RD:"rd",TH:"th",OF:"of",TOMORROW:"Tomorrow",TODAY:"Today",TONIGHT:"Tonight",NOW:"Live Now",PAST:"Past"}},ie=void 0,ue=!1,le=void 0,ce=Object.freeze({init:Y,getDefaultTimezone:j,setDefaultTimezone:P,getNow:F}),se=function(e){var t,n=this;Object.defineProperties(n,{currentSchedule:{get:function(){var e=t.current.date,n=new H({target:e,isStandard:!0,eventDuration:e.eventDuration,callback:e.callback});if(n.isComplete){var r=t.next.date;n=new H({target:r,isStandard:!0,eventDuration:r.eventDuration,callback:r.callback})}return n}},current:{get:function(){return n.currentSchedule.current}},currentDate:{get:function(){return n.current.date}},currentLabel:{get:function(){return n.current.label}}}),n.print=function(){t.print()},function(){var n=F(),r=M().WEEKDAYS_FULL;t=new H;for(var a=e.tuneins,o=0;o<a.length;o++)for(var i=a[o],u=i.days,l=n.getDay(),c=0;c<u.length;c++){var s=u[c],f=r.indexOf(s),d=f-l,p=new R({datetime:[n.toDateTimeISO().split("T")[0]+"T"+i.startTime+":00",i.timezone]});if(p=E(p,{day:d}),z(p,n)){var g=E(p,{minute:i.eventDuration});z(g,n)&&(p=E(p,{day:7}))}p.eventDuration=i.eventDuration,p.callback=i.callback,console.log("\t",p.print()),t.addDate(p)}}()},fe={spanish:{MONTHS_FULL:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],MONTHS_ABRV:["enero","feb","marzo","abr","mayo","jun","jul","agosto","sept","oct","nov","dic"],MONTHS_EXCP:["","","","","","","","","sep","","",""],WEEKDAYS_FULL:["domingo","lunes","martes","mi&#201;rcoles","jueves","viernes","s&#193;bado"],WEEKDAYS_ABRV:["dom","lun","mar","mi&#201;r","jue","vier","s&#193;b"],WEEKDAYS_EXCP1:["","","tues","wednes","thur","",""],WEEKDAYS_EXCP2:["","","","","thurs","",""],ST:"ro",ND:"ndo",RD:"rd",TH:"th",OF:"de",TOMORROW:"ma&#209;ana",TODAY:"hoy",TONIGHT:"esta noche",NOW:"en vivo",PAST:"pasado"}}}.call(t,n(2))},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n}]);

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("window")):"function"==typeof define&&define.amd?define(["window"],t):"object"==typeof exports?exports.Velvet=t(require("window")):e.Velvet=t(e.window)}("undefined"!=typeof self?self:this,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(){var e={},t=window.location.href.split("?");if(t.length>1){var n=t[1].split("&");for(var o in n){var r=n[o].split("=");2==r.length&&(e[r[0]]=decodeURIComponent(r[1]))}}return e}function l(e){var t=e.search(/^\/\//)>-1;if(e.search(/^http/)>-1||t){var n=window.location.href.search(/^https/)>-1||window.adParams&&adParams.forceHttps,o=n?"https://":"http://";if(t&&(e=e.replace(/^\/\//,o)),e.search(/.*edgecastcdn/)>-1){e=o+(n?"ne1."+e.match(/w(a|p)c/i)[0]+".":e.match(/w(a|p)c\.[a-z0-9]*\./i)[0])+"edgecastcdn"+e.replace(/.*edgecastcdn/,"")}else if(e.search(/.*paramount\.com/)>-1){var r=n?"paramountdlds-a.akamaihd.net":"downloads.paramount.com";e=o+r+e.replace(/.*paramount\.com/,"")}else e=e.search(/espn\.go\.com/)>-1||e.search(/secure\.espncdn\.com/)>-1?"https://secure.espncdn.com"+e.replace(/^.*\.com/,""):e.replace(/^https?\:\/\//i,o)}return e}function c(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}return console.warn("XMLHttpRequest not supported"),null}function s(e){var t=e.lastIndexOf("."),n=e.lastIndexOf("/")+1;return n>t&&(t=void 0),e.substring(n,t)}function u(e){e=e||"";var t=e.indexOf("?");t>-1&&(e=e.substr(0,t));var n=e.match(/[^\\]*\.(\w+)$/),o=e.match(/image\/(jpeg|jpg|png)/);return n?n[1]:o?o[1]:"unknown"}function f(e){if("string"==typeof e)return e;var t="";for(var n in e)console.log("      prop =",n),t+=n+"="+e[n]+"&";return t.substr(0,t.length-1)}function p(e){var t=[],n=[0];for(var o in e)t.push(o),n.push(e[o]+(n[n.length-1]||0));for(var r=100*Math.random().toFixed(2),a=0;a<n.length-1;a++){if(d(r,n[a],n[a+1]))return t[a]}}function d(e,t,n){var o=Math.min(t,n);return e<=Math.max(t,n)&&e>=o}function v(e,t){ee[e]||(ee[e]=[]);for(var n=ee[e],o=0,r=n.length;o<r;o++)if(n[o]===t)return;n.push(t)}function h(e,t){var n=ee[e];if(n)for(var o=0,r=n.length;o<r;o++)if(n[o]===t){n.splice(o,1);break}}function m(e){ee[e]&&ee[e].map(function(e){e()})}function y(e,t,n,o){I.DateManager.init(t),ae=n,ce=o,console.log("Velvet.init()");var r=document.referrer.match(/staging\.velvet\.tech/);r&&console.log("\tis on qa.velvet.tech"),g()?(console.log("\tPreview requested"),te=r?K:J):(console.log("\tLive requested"),te=r?$:X),ne=e,te+=ne.client+"/"+ne.locale+"/",console.log("\tbase url:",te);var a=i(),l=a.addata;return l&&(console.log("\t\tAd Data set via query:",l),ne.addata=l),le="1"===a.velvetCaptureRotate,ie="1"===a.velvetCaptureSlates,new Promise(function(e,t){oe=e,console.log("\tVelvet.init() Promise"),ne.addata?b():w()})}function g(){var e=window.location.href;if(void 0==e||null==e)return!1;var t=i();return"production"!==t.velvet&&("preview"===t.velvet||!!(e.match(/^file/)||e.match(/velvet\.ff0000\-cdn\.net/)||e.match(/velvet\-staging\.ff0000\-cdn\.net/)||e.match(/velvet\-dev\.ff0000\-cdn\.net/)||e.match(/manta\.joyent\.com/)||e.match(/ff0000\.com/)||e.match(/adprodtest/)||e.match(/client\-projects\.com/)||e.match(/160over90\.com/)||e.match(/localhost:[0-9]/)||e.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+/)))}function w(){new G(te+ne.segment,{name:"segmentLoader",fileType:"json",onComplete:T,onFail:x}).load()}function b(){new G(te+ne.addata,{name:"velvetAdDataLoader",fileType:"json",onComplete:q,onFail:x}).load()}function T(e){var t=JSON.parse(e.dataRaw);console.log("Velvet segment Json:\n",t),I.DateManager.setDefaultTimezone(t.tz);var n=t.timeblocks,o=I.DateManager.getNow(),r=void 0;for(r=0;r<n.length;r++){if(o<n[r].time)break}var a=r-1;if(a<0)return void x();console.log("\tselected timeblock:",n[a]);var i=n[a].ad_rotation;if(ne.addata=p(i),console.log("\tselected ad slug:",ne.addata),"USE_STATIC"===ne.addata)return void m(Y);b()}function q(e){console.log("Velvet.handleAdDataLoadComplete()"),re=JSON.parse(e.dataRaw),console.log("Velvet Raw addata:\n",re),oe(),m(Q)}function x(){m(W)}function j(e){console.log("Velvet.capture.addSchedule()");for(var t=e.getDates(!0),n=0;n<t.length;n++){var o=t[n],r=o.date,a={date:r.toISO(),tz:r.outputTimezone.abbr[0],ltz:adParams.defaultTimezone,label:o.standardKey};se.push(a)}}function C(e){if(console.log("Velvet.capture.addCustomData()"),"object"!==(void 0===e?"undefined":E(e)))throw new Error("Cannot use a primative as data, must be an Object passed to .addCustomData()");se.push(e)}function O(){0===se.length&&se.push({foo:"bar"}),console.log("Velvet.capture.dispatchData()\n\t",se),_("setParameters",se)}function S(){var e=Date.now(),t=e-ue;console.log("Velvet.capture.adComplete() | endTime: "+e+" | duration: "+t),_("adComplete",{duration:t}),ie&&(fe.style.background="#ff0000",fe.style.display="block")}function P(){return new Promise(function(e,t){M(ce),ue=Date.now(),console.log("Velvet.capture.adStart() | _startTime: "+ue),_("adStart"),ie?(fe=D(),M(fe),setTimeout(function(){fe.style.display="none",e()},300)):e()})}function _(e,t){t=t||{},"function"==typeof window.callExternal&&window.callExternal({event:e,data:t})}function M(e){if(le){var t=ae.split("x")[0];e.style.transform="matrix(0, -1, 1, 0, 0, "+t+")",e.style.transformOrigin="0 0"}}function D(){var e=ae.split("x"),t=e[0],n=e[1],o=document.createElement("div");return o.id="slate",o.style.cssText="position: absolute; width: "+t+"px; height: "+n+"px; background: #00ff00;",ce.parentNode.appendChild(o),o}function k(){if(0==arguments.length)return re;var e="string"==typeof arguments[0],t=arguments[e?0:1],n=e?re:arguments[0],o=arguments[e?1:2],r=o||{};we=0!=r.allowDefault,be=!!r.convertBreaks,Te=!!(!0===o?o:r.recursive),ve=[];var a=t.replace(/\.value(\.|)/g,".").replace(/\.$/,"");return ye=a.split("."),me=void 0,he=ye.pop(),ge=ye.length>0,ge&&(me=ye.shift(),ye.push(he)),z(n),1==ve.length?(ve=ve[0])&&"object"==(void 0===ve?"undefined":E(ve))&&0==Object.keys(ve).length&&(ve=void 0):0==ve.length&&(ve=void 0),ve&&be&&(ve=de(ve)),ve}function z(e){switch(Object.prototype.toString.call(e)){case"[object Object]":L(e);break;case"[object Array]":A(e)}}function L(e){for(var t in e)R(e,t)}function A(e){if(ge||isNaN(he))for(var t=0;t<e.length;t++)L(e[t]);else ve.push(e[he])}function R(e,t){if(t!=he||ge){if(t==me){var n=F(ye,e[t]);return void(n&&ve.push(V(n)))}}else ve.push(V(e[t]));Te&&z(e[t])}function V(e){if(e.hasOwnProperty("type")){var t="MultiSizeText"==e.type,n="MultiSizeImage"==e.type;if((t||n)&&e.value){if(e.value.sizes.hasOwnProperty(ae)){var o=e.value.sizes[ae];if(we){if(o&&(t&&o.length||n))return o}else if(t||n)return o}e=e.value}}return e.hasOwnProperty("value")?e.value:e}function F(e,t){for(var n,o=t||{},r=0;o&&(n=e[r]);r++){var a=V(o);o=a&&n in a?a[n]:void 0}return o}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"init",function(){return qe}),n.d(t,"isPreviewLocation",function(){return xe}),n.d(t,"addEventListener",function(){return je}),n.d(t,"removeEventListener",function(){return Ce}),n.d(t,"events",function(){return Oe}),n.d(t,"capture",function(){return Se}),n.d(t,"get",function(){return Pe}),n.d(t,"convertBreaks",function(){return _e});var I=n(1),E=(n.n(I),"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}),N=function(){function e(t){a(this,e),this.superclass=t}return e.prototype.with=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(e,t){return t(e)},this.superclass)},e}(),U=function(e){return function(e){function t(){for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];a(this,t);var l=o(this,e.call.apply(e,[this].concat(r))),c=arguments&&arguments.length>1?arguments[1]:arguments[0]||{},s=l;return s.onComplete=c.onComplete||function(){},s.onFail=c.onFail||function(){},s.onProgress=c.onProgress||function(){},s.name=c.name||"",s.scope=c.scope||s,s.dataRaw,s.cacheBuster=c.cacheBuster||!1,s._failCalled=!1,l}return r(t,e),t.prototype._handleFail=function(){var e=this;e._failCalled||(e._failCalled=!0,e.onFail.call(e.scope,e),console.log('Loader "'+e.name+'" Fail:',e.url))},t}(e)},B=function(e){return function(e){function t(){for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];a(this,t);var c=o(this,e.call.apply(e,[this].concat(r))),f=arguments&&arguments.length>1?arguments[1]:arguments[0]||{},p=c;return p.url=l(arguments[0]||""),f.platformGetUrl&&(p.platformGetUrl=f.platformGetUrl,p.url=f.platformGetUrl(p.url)),p.fileName=void 0===f.id?s(p.url):f.id,p.fileType=f.fileType||u(p.url),c}return r(t,e),t}(e)},H=function e(){a(this,e)},G=function(e){function t(){for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];a(this,t);var l=o(this,e.call.apply(e,[this].concat(r))),c=arguments&&arguments.length>1?arguments[1]:arguments[0]||{},s=l;return s.method=(c.method||"get").toLowerCase(),s.query=c.query||null,s.responseType=c.responseType||null,l}return r(t,e),t.prototype.load=function(){var e=this,t=null,n="post"===e.method;e.req=c(),void 0!=e.responseType&&(e.req.responseType=e.responseType);var o=e.url;switch(e.query&&(t=f(e.query),n||(o+="?"+t,t=null)),e.cacheBuster&&(o+=e.query&&!n?"&":"?",o+="cb="+(new Date).getTime()),e.req.onreadystatechange=e._handleStateChange.bind(e),e.req.open(e.method,o,!0),e.fileType){case"xml":e.req.overrideMimeType&&e.req.overrideMimeType("text/xml");break;case"json":e.req.overrideMimeType&&e.req.overrideMimeType("application/json");break;case"fba":case"bin":case"binary":e.responseType=e.req.responseType="arraybuffer"}"post"===e.method&&e.req.setRequestHeader("Content-type","application/x-www-form-urlencoded"),e.req.send(t)},t.prototype._handleStateChange=function(e){var t=this;switch(t.req.readyState){case 3:200==this.req.status&&(t.dataRaw=t.responseType?t.req.response:t.req.responseText,t._handleProgress(t));break;case 4:200==t.req.status?(t.dataRaw=t.responseType?t.req.response:t.req.responseText,t._handleComplete(t)):t._handleFail({target:e})}},t.prototype._handleProgress=function(){var e=this;e.onProgress.call(e.scope,e)},t.prototype._handleComplete=function(){var e=this;e.onComplete.call(e.scope,e)},t}(function(e){return new N(e)}(H).with(U,B)),X="https://json.ff0000-cdn.net/",J="https://preview.ff0000-cdn.net/preview/",$="https://publish-staging.ff0000-cdn.net/",K="https://staging.velvet.tech/preview/",Q="velvetInit",W="velvetFail",Y="velvetStatic",Z=Object.freeze({INIT:Q,FAIL:W,STATIC:Y}),ee={},te=void 0,ne=void 0,oe=void 0,re={},ae=void 0,ie=!1,le=!1,ce=void 0,se=[],ue=void 0,fe=void 0,pe=Object.freeze({addSchedule:j,addCustomData:C,dispatchData:O,adComplete:S,adStart:P}),de=function(e){return e.replace(/\r?\n|\r/g,"<br>")},ve=[],he=void 0,me=void 0,ye=void 0,ge=void 0,we=void 0,be=void 0,Te=void 0,qe=y,xe=g,je=v,Ce=h,Oe=Z,Se=pe,Pe=k,_e=de},function(t,n){t.exports=e}])});
