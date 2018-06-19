!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("window")):"function"==typeof define&&define.amd?define(["window"],t):"object"==typeof exports?exports.Velvet=t(require("window")):e.Velvet=t(e.window)}("undefined"!=typeof self?self:this,function(e){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(){console.log("ad-global > getQueryParams()");var e={},t=window.location.href.split("?");if(t.length>1){var n=t[1].split("&");for(var o in n){var r=n[o].split("=");2==r.length&&(e[r[0]]=decodeURIComponent(r[1]))}}return e}function l(e){console.log("ad-global > matchProtocolTo()");var t=e.search(/^\/\//)>-1;if(e.search(/^http/)>-1||t){var n=window.location.href.search(/^https/)>-1||window.adParams&&adParams.forceHttps,o=n?"https://":"http://";if(t&&(e=e.replace(/^\/\//,o)),e.search(/.*edgecastcdn/)>-1){e=o+(n?"ne1."+e.match(/w(a|p)c/i)[0]+".":e.match(/w(a|p)c\.[a-z0-9]*\./i)[0])+"edgecastcdn"+e.replace(/.*edgecastcdn/,"")}else if(e.search(/.*paramount\.com/)>-1){var r=n?"paramountdlds-a.akamaihd.net":"downloads.paramount.com";e=o+r+e.replace(/.*paramount\.com/,"")}else e=e.search(/espn\.go\.com/)>-1||e.search(/secure\.espncdn\.com/)>-1?"https://secure.espncdn.com"+e.replace(/^.*\.com/,""):e.replace(/^https?\:\/\//i,o)}return e}function c(){try{return new XMLHttpRequest}catch(e){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(e){}return console.warn("XMLHttpRequest not supported"),null}function s(e){var t=e.lastIndexOf("."),n=e.lastIndexOf("/")+1;return n>t&&(t=void 0),e.substring(n,t)}function u(e){e=e||"";var t=e.indexOf("?");t>-1&&(e=e.substr(0,t));var n=e.match(/[^\\]*\.(\w+)$/),o=e.match(/image\/(jpeg|jpg|png)/);return n?n[1]:o?o[1]:"unknown"}function p(e){if("string"==typeof e)return e;var t="";for(var n in e)console.log("      prop =",n),t+=n+"="+e[n]+"&";return t.substr(0,t.length-1)}function f(e){var t=[],n=[0];for(var o in e)t.push(o),n.push(e[o]+(n[n.length-1]||0));for(var r=100*Math.random().toFixed(2),a=0;a<n.length-1;a++){if(d(r,n[a],n[a+1]))return t[a]}}function d(e,t,n){var o=Math.min(t,n);return e<=Math.max(t,n)&&e>=o}function h(e,t){Y[e]||(Y[e]=[]);for(var n=Y[e],o=0,r=n.length;o<r;o++)if(n[o]===t)return;n.push(t)}function v(e,t){var n=Y[e];if(n)for(var o=0,r=n.length;o<r;o++)if(n[o]===t){n.splice(o,1);break}}function m(e){Y[e]&&Y[e].map(function(e){e()})}function g(e,t){R.DateManager.init(t),console.log("Velvet.init()");var n=document.referrer.match(/qa\.velvet\.tech/);n&&console.log("\tis on qa.velvet.tech"),y()?(console.log("\tPreview requested"),Z=n?J:X):(console.log("\tLive requested"),Z=isQa?B:G),ee=e,Z+=ee.client+"/"+ee.locale+"/",console.log("\tbase url:",Z);var o=i(),r=o.addata;return r&&(console.log("\t\tAd Data set via query:",r),ee.addata=r),new Promise(function(e,t){te=e,console.log("\tVelvet.init() Promise"),ee.addata?b():w()})}function y(){var e=window.location.href;return void 0!=e&&null!=e&&("production"!==i().velvet&&!!(e.match(/^file/)||e.match(/manta\.joyent\.com/)||e.match(/ff0000\.com/)||e.match(/adprodtest/)||e.match(/client\-projects\.com/)||e.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+/)))}function w(){new H(Z+ee.segment,{name:"segmentLoader",fileType:"json",onComplete:q,onFail:j}).load()}function b(){new H(Z+ee.addata,{name:"velvetAdDataLoader",fileType:"json",onComplete:T,onFail:j}).load()}function q(e){var t=JSON.parse(e.dataRaw);console.log("Velvet segment Json:\n",t),R.DateManager.setDefaultTimezone(t.tz);var n=t.timeblocks,o=R.DateManager.getNow();console.log("\tnow:",o);var r=void 0;for(r=0;r<n.length;r++){var a=n[r].time;if(console.log("\t\t>",new Date(a)),o<a)break}var i=r-1;if(i<0)return void j();console.log("\tselected timeblock:",n[i]);var l=n[i].ad_rotation;if(ee.addata=f(l),console.log("\tselected ad slug:",ee.addata),"USE_STATIC"===ee.addata)return void m(K);b()}function T(e){console.log("Velvet.handleAdDataLoadComplete()"),ne=JSON.parse(e.dataRaw),console.log("Velvet Raw addata:\n",ne),te(),m(Q)}function j(){m($)}function C(e){console.log("Velvet.capture.addSchedule()");for(var t=e.getDates(!0),n=0;n<t.length;n++){var o=t[n],r=o.date,a={date:r.toISO(),tz:r.outputTimezone.abbr[0],ltz:adParams.defaultTimezone,label:o.standardKey};oe.push(a)}}function x(e){if(console.log("Velvet.capture.addCustomData()"),"object"!==(void 0===e?"undefined":I(e)))throw new Error("Cannot use a primative as data, must be an Object passed to .addCustomData()");oe.push(e)}function O(){0===oe.length&&oe.push({foo:"bar"}),console.log("Velvet.capture.dispatchData()\n\t",oe),_("setParameters",oe)}function P(){console.log("Velvet.capture.adComplete()"),_("adComplete")}function S(){console.log("Velvet.capture.adStart()"),_("adStart")}function _(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};"function"==typeof window.callExternal&&window.callExternal({event:e,data:t})}function M(){var e="string"==typeof arguments[0],t=arguments[e?0:1],n=e?ne:arguments[0];ae=!!arguments[e?1:2],ie=[];var o=t.replace(/\.value(\.|)/g,".").replace(/\.$/,"");se=o.split("."),ce=void 0,le=se.pop();for(var r="",a=0;a<se.length;a++)a>0&&(r+="."),r+=se[a],isNaN(se[a])&&(r+=".value");return ue=se.length>0,ue&&(se=r.split("."),ce=se.shift(),se.push(le)),D(n),1==ie.length?(ie=ie[0])&&"object"==(void 0===ie?"undefined":I(ie))&&0==Object.keys(ie).length&&(ie=void 0):0==ie.length&&(ie=void 0),ie}function D(e){switch(Object.prototype.toString.call(e)){case"[object Object]":L(e);break;case"[object Array]":A(e)}}function L(e){for(var t in e)V(e,t)}function A(e){if(ue||isNaN(le))for(var t=0;t<e.length;t++)L(e[t]);else ie.push(e[le])}function V(e,t){if(t!=le||ue){if(t==ce){var n=F(se,e[t]);return void(n&&ie.push(k(n)))}}else ie.push(k(e[t]));ae&&D(e[t])}function k(e){return e.hasOwnProperty("value")?e.value:e}function F(e,t){for(var n,o=t||{},r=0;o&&(n=e[r]);r++)o=n in o?o[n]:void 0;return o}Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"init",function(){return pe}),n.d(t,"isPreviewLocation",function(){return fe}),n.d(t,"addEventListener",function(){return de}),n.d(t,"removeEventListener",function(){return he}),n.d(t,"events",function(){return ve}),n.d(t,"capture",function(){return me}),n.d(t,"get",function(){return ge});var R=n(1),I=(n.n(R),"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e}),z=function(){function e(t){a(this,e),this.superclass=t}return e.prototype.with=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.reduce(function(e,t){return t(e)},this.superclass)},e}(),E=function(e){return function(e){function t(){for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];a(this,t);var l=o(this,e.call.apply(e,[this].concat(r))),c=arguments&&arguments.length>1?arguments[1]:arguments[0]||{},s=l;return s.onComplete=c.onComplete||function(){},s.onFail=c.onFail||function(){},s.onProgress=c.onProgress||function(){},s.name=c.name||"",s.scope=c.scope||s,s.dataRaw,s.cacheBuster=c.cacheBuster||!1,s._failCalled=!1,l}return r(t,e),t.prototype._handleFail=function(){var e=this;e._failCalled||(e._failCalled=!0,e.onFail.call(e.scope,e),console.log('Loader "'+e.name+'" Fail:',e.url))},t}(e)},N=function(e){return function(e){function t(){for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];a(this,t);var c=o(this,e.call.apply(e,[this].concat(r))),p=arguments&&arguments.length>1?arguments[1]:arguments[0]||{},f=c;return f.url=l(arguments[0]||""),p.platformGetUrl&&(f.platformGetUrl=p.platformGetUrl,f.url=p.platformGetUrl(f.url)),f.fileName=void 0===p.id?s(f.url):p.id,f.fileType=p.fileType||u(f.url),c}return r(t,e),t}(e)},U=function e(){a(this,e)},H=function(e){function t(){for(var n=arguments.length,r=Array(n),i=0;i<n;i++)r[i]=arguments[i];a(this,t);var l=o(this,e.call.apply(e,[this].concat(r))),c=arguments&&arguments.length>1?arguments[1]:arguments[0]||{},s=l;return s.method=(c.method||"get").toLowerCase(),s.query=c.query||null,s.responseType=c.responseType||null,l}return r(t,e),t.prototype.load=function(){var e=this,t=null,n="post"===e.method;e.req=c(),void 0!=e.responseType&&(e.req.responseType=e.responseType);var o=e.url;switch(e.query&&(t=p(e.query),n||(o+="?"+t,t=null)),e.cacheBuster&&(o+=e.query&&!n?"&":"?",o+="cb="+(new Date).getTime()),e.req.onreadystatechange=e._handleStateChange.bind(e),e.req.open(e.method,o,!0),e.fileType){case"xml":e.req.overrideMimeType&&e.req.overrideMimeType("text/xml");break;case"json":e.req.overrideMimeType&&e.req.overrideMimeType("application/json");break;case"fba":case"bin":case"binary":e.responseType=e.req.responseType="arraybuffer"}"post"===e.method&&e.req.setRequestHeader("Content-type","application/x-www-form-urlencoded"),e.req.send(t)},t.prototype._handleStateChange=function(e){var t=this;switch(t.req.readyState){case 3:200==this.req.status&&(t.dataRaw=t.responseType?t.req.response:t.req.responseText,t._handleProgress(t));break;case 4:200==t.req.status?(t.dataRaw=t.responseType?t.req.response:t.req.responseText,t._handleComplete(t)):t._handleFail({target:e})}},t.prototype._handleProgress=function(){var e=this;e.onProgress.call(e.scope,e)},t.prototype._handleComplete=function(){var e=this;e.onComplete.call(e.scope,e)},t}(function(e){return new z(e)}(U).with(E,N)),G="https://json.ff0000-cdn.net/",X="https://preview.ff0000-cdn.net/preview/",B="https://qa.ff0000-cdn.net/",J="https://qa.velvet.tech/preview/",Q="velvetInit",$="velvetFail",K="velvetStatic",W=Object.freeze({INIT:Q,FAIL:$,STATIC:K}),Y={},Z=void 0,ee=void 0,te=void 0,ne={},oe=[],re=Object.freeze({addSchedule:C,addCustomData:x,dispatchData:O,adComplete:P,adStart:S}),ae=void 0,ie=[],le=void 0,ce=void 0,se=void 0,ue=void 0,pe=g,fe=y,de=h,he=v,ve=W,me=re,ge=M},function(t,n){t.exports=e}])});