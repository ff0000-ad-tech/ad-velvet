(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("adDates"));
	else if(typeof define === 'function' && define.amd)
		define(["adDates"], factory);
	else if(typeof exports === 'object')
		exports["Velvet"] = factory(require("adDates"));
	else
		root["Velvet"] = factory(root["adDates"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ad_dates__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ad_dates___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ad_dates__);
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
	__WEBPACK_IMPORTED_MODULE_0_ad_dates__["DateManager"].init(dateSettings);

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
	__WEBPACK_IMPORTED_MODULE_0_ad_dates__["DateManager"].setDefaultTimezone(segmentJson.tz);

	var timeblocks = segmentJson.timeblocks;

	var now = __WEBPACK_IMPORTED_MODULE_0_ad_dates__["DateManager"].getNow();
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



/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ })
/******/ ]);
});