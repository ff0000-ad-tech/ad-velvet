/**
@class	Velvet
@static
@desc
<a href="https://github.com/ff0000-ad-tech/ad-velvet">Github repo</a>
<br><br>

This object is meant to handle all of our json loading and parsing from the Velvet platform.

<br><br>

When testing, changing the date can be a crucial testing step. see DateManager for more information.
*/
import { DataLoader } from 'ad-load'
import { DateManager } from 'ad-dates'
import { MathUtils } from 'ad-utils'

let _baseUrlLive = 'https://json.ff0000-cdn.net/'
let _baseUrlPreview = 'https://preview.ff0000-cdn.net/preview/'
let _qaBaseUrlLive = 'https://qa.ff0000-cdn.net/'
let _qaBaseUrlPreview = 'https://qa.velvet.tech/preview/'
let _baseUrlNow = undefined
let _baseSlugs = undefined
let _settings = undefined
let _debug = false
let _resolved = undefined
let adDataRaw = {}

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
export function init(settings) {
	console.log('Velvet.init()')

	// check if on QA or not first. Must use referrer as window.location.href will not bubble up out of the iframe
	const url = document.referrer
	const isQA = url.match(/qa\.velvet\.tech/)

	if (isQA) {
		console.log('\tis on qa.velvet.tech')
		_baseUrlLive = _qaBaseUrlLive
		_baseUrlPreview = _qaBaseUrlPreview
	}

	if (isPreviewLocation()) {
		console.log('\tPreview requested')
		_baseUrlNow = _baseUrlPreview
	} else {
		console.log('\tLive requested')
		_baseUrlNow = _baseUrlLive
	}

	_settings = settings
	_baseSlugs = _settings.client + '/' + _settings.locale + '/'
	console.log('\tbase url:', _baseUrlNow)
	console.log('\tbase slugs:', _baseSlugs)

	var query = getQueryParams()
	console.log('\tquery:', query)
	if (query.addata) {
		console.log('\t\tAd Data set via query')
		_settings.adData = query.addata
	}

	return new Promise((resolve, reject) => {
		_resolved = resolve
		console.log('\tVelvet.init() Promise')
		_settings.adData ? _loadAdData() : _loadSegment()
	})
}

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
export function get() {
	// check if the first arg is a key = 'node' / 'path.node' OR is it a sub object to look within
	var _useRawObject = typeof arguments[0] === 'string'

	var key = arguments[_useRawObject ? 0 : 1]
	var source = _useRawObject ? adDataRaw : arguments[0]

	// will it search through all layers? default false
	var recursive = !!arguments[_useRawObject ? 1 : 2]

	if (_debug) console.log(Array(100).join('-') + '\nget(', key, ')\nwithin:', source, '\nrecursive:', recursive)
	var result = []

	// strip the original key of all '.values'
	var strippedKey = key.replace(/\.value(\.|)/g, '.').replace(/\.$/, '')
	if (_debug) console.log('\tstrippedKey:', strippedKey)

	// split the path up, eg: 'grand.parent.child' > [ grand, parent, child ]
	var splits = strippedKey.split('.')
	var anchor
	// remove the last value with is the target node
	var targetKey = splits.pop()

	// add back in all the '.value' where applicable
	var pathInExpanded = ''
	for (var i = 0; i < splits.length; i++) {
		if (i > 0) pathInExpanded += '.'
		pathInExpanded += splits[i]
		if (isNaN(splits[i])) {
			pathInExpanded += '.value'
		}
	}
	if (_debug) console.log('\tkey:', key, '\n\tsplits:', splits, '\n\tpathInExpanded:', pathInExpanded)

	// is the a specific path to follow or just a key?
	var _pathed = splits.length > 0
	if (_pathed) {
		splits = pathInExpanded.split('.')
		// extract out the anchor to know where the path starts at, not necessarily at the top
		anchor = splits.shift()
		splits.push(targetKey)
		if (_debug) console.log('\tanchor:', anchor, '\n\tsplits again:', splits)
	}

	function walk(elem) {
		switch (Object.prototype.toString.call(elem)) {
			case '[object Object]':
				walkObject(elem)
				break
			case '[object Array]':
				walkArray(elem)
				break
		}
	}

	function walkObject(obj) {
		if (_debug) console.log('walkObject() >', obj)

		// at this level, just check key? if not found AND recurrsive, then use loop

		for (var param in obj) {
			readProperty(obj, param)
		}
	}

	function walkArray(arr) {
		if (!_pathed && !isNaN(targetKey)) {
			// if looking for an index value of a passed in array
			result.push(arr[targetKey])
		} else {
			for (var i = 0; i < arr.length; i++) {
				walkObject(arr[i])
			}
		}
	}

	function properKey(obj) {
		return obj.hasOwnProperty('value') ? obj.value : obj
	}

	function readProperty(obj, param) {
		if (_debug) console.log('\t\t\t readProperty()', obj, param, '|', anchor, '|', targetKey)
		if (param == targetKey && !_pathed) {
			// if a match is found
			// AND
			// only if no path is set, store it, otherwise it will
			// store false equivelants when recurively going through objects

			result.push(properKey(obj[param]))
		} else if (param == anchor) {
			// if the anchor, eg 'grand', is found, skip to reading the whole path eg 'grand.parent.child'
			var narrowDown = readPropertyPath(splits, obj[param])
			if (_debug) console.log('param:', param, '\n\tnarrowDown:', narrowDown, '\n\tobj[param]:', obj[param], param)
			if (narrowDown) {
				result.push(properKey(narrowDown))
			}
			return
		}
		// only if looping thought recursivley, handle objects or arrays
		if (recursive) {
			walk(obj[param])
		}
	}

	// repurposed from ObjectUtils, reads a path 'grand.parent.child' and returns that node on 'child'
	function readPropertyPath(splits, obj) {
		var result = obj || {}
		var i
		var s
		for (i = 0; result && (s = splits[i]); i++) {
			result = s in result ? result[s] : undefined
		}
		return result
	}

	// start walking through the top object or array supplied
	walk(source)

	if (result.length == 1) {
		result = result[0]
	} else if (result.length == 0) {
		result = undefined
	}

	if (_debug) console.log(result)

	return result
}

/** 
@memberOf Velvet
@method isPreviewLocation
@description
This method returns true for all the locations that should load PREVIEW.JSON instead of published.json.
Safeguards are in place so that even an ad in a staging/build-state will load published json, if running in 
any http(s) locations other than the ones listed. 
*/
export function isPreviewLocation() {
	console.log('\n\n Velvet.isPreviewLocation() > queryParams? \n\n')
	var href = window.location.href
	if (href == undefined || href == null) return false
	if (queryParams.velvet === 'production') {
		return false
	}
	// local locations
	if (
		href.match(/^file/) ||
		href.match(/manta\.joyent\.com/) ||
		href.match(/ff0000\.com/) ||
		href.match(/adprodtest/) ||
		href.match(/client\-projects\.com/) ||
		href.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+/)
	) {
		return true
	}

	// other locations
	return false
}

/* ------------------------------------------------------------------------------------------------------------- */
// PRIVATE METHODS
function _loadSegment() {
	new DataLoader(_baseUrlNow + _baseSlugs + _settings.segment, {
		name: 'segmentLoader',
		fileType: 'json',
		onComplete: _handleSegmentLoadComplete,
		onFail: global.failAd
		// scope: V
	}).load()
}

function _loadAdData() {
	// const V = this
	new DataLoader(_baseUrlNow + _baseSlugs + _settings.adData, {
		name: 'velvetAdDataLoader',
		fileType: 'json',
		onComplete: _handleAdDataLoadComplete,
		onFail: global.failAd
		// scope: V
	}).load()
}

/* ------------------------------------------------------------------------------------------------------------- */
// EVENT HANDLERS
function _handleSegmentLoadComplete(event) {
	var segmentJson = JSON.parse(event.dataRaw)
	console.log('Velvet segment Json:\n', segmentJson)

	// check if there is a timezone to apply as default to all display times:
	adParams.defaultTimezone = segmentJson.tz
	if (adParams.defaultTimezone) {
		console.log('\tdefaultTimezone:', adParams.defaultTimezone)
	}

	var timeblocks = segmentJson.timeblocks

	var now = DateManager.getNow()
	console.log('\tnow:', new Date(now))

	// sort through timeblocks to find the current
	for (var i = 0; i < timeblocks.length; i++) {
		var startDate = timeblocks[i].time
		console.log('\t\t>', new Date(startDate))
		if (now < startDate) {
			break
		}
	}
	const latestIndex = i - 1
	//console.log( '\tnow:', new Date(now), '| timeblock:', new Date(startDate), '| latestIndex:', latestIndex )
	if (latestIndex < 0) {
		global.failAd()
		return
	} else {
		console.log('\tselected timeblock:', timeblocks[latestIndex])
	}
	var rotation = timeblocks[latestIndex].ad_rotation
	_settings.adData = MathUtils.randomWeightedKey(rotation)
	console.log('\tselected ad slug:', _settings.adData)

	if (_settings.adData === 'USE_STATIC') {
		useStatic()
		return
	}

	_loadAdData()
}

function _handleAdDataLoadComplete(event) {
	console.log('Velvet._handleAdDataLoadComplete()')
	adDataRaw = JSON.parse(event.dataRaw)
	console.log('adDataRaw:\n', adDataRaw)

	_resolved()
}
