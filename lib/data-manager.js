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

When testing, changing the date can be a crucial testing step. see {@link DateManager} for more information.
*/

import { DateManager } from 'ad-dates'
import { getQueryParams } from 'ad-global'
import DataLoader from 'ad-load/lib/single/DataLoader.js'
import { randomWeightedKey } from 'ad-utils/lib/MathUtils.js'
import * as BU from './base-urls.js'
import * as events from './events.js'
import * as EC from './event-controller.js'

let _baseUrlNow = undefined
let _settings = undefined
let _resolved = undefined

/* ------------------------------------------------------------------------------------------------------------- */
export let adDataRaw = {}
export let dimensions = undefined

/* ------------------------------------------------------------------------------------------------------------- */
// PUBLIC METHODS

/** 
	@memberOf Velvet
	@method init
	@param {object} slugs
		see "Properties" for more information
	@param {object} dateSettings
		Pass in the date settings for internal init of {@link DateManager}
	@param {string} adDimensions
		Pass in the width and height as a string formatted "300x250"; Used for getting size specific assets.
	@property {string} client
		the first "slug" in the url string
	@property {string} locale
		the second "slug" in the url string
	@property {string} segment
		the third "slug" in the url string - this defines the segment, aka the map to which addata will be loaded	
	@property {string} addata
		Optionally, when viewing an addata url, the last "slug" defines which data set id being used. This can be manually set in the ad, mostly jsut for testing purposes
	@desc
		This passes the slugs object from parent scope and initialized the class.  In the index is an Object of "slugs" which are 10 digit String hashes that 
		are keys for locations of the client, locale, segment of the that data on Velvet cdn.

	@example
		// in the index.html, inside adParams:
		velvet : {
			client 	: "ZcHT9C9y6Z",
			locale	: "whV1g8DKPe",
			segment	: "C4iaBG6CoP",
			//adData 	: "jaScLD8ayE"
		}

		// in Preflight.js
		static prepareVelvet() {
			console.log('Common.prepareVelvet()')
			Velvet.addEventListener(Velvet.events.FAIL, global.failAd)
			Velvet.addEventListener(Velvet.events.STATIC, global.useStatic)
			return Promise.resolve(Velvet.init(adParams.velvet, adParams.dateSettings, adParams.adSize))
		}
*/
export function init(slugs, dateSettings, adDimensions) {
	DateManager.init(dateSettings)
	dimensions = adDimensions

	console.log('Velvet.init()')

	// First, check if on staging or not. Must use referrer as window.location.href will not bubble up out of the iframe
	const isQA = document.referrer.match(/staging\.velvet\.tech/)
	if (isQA) {
		console.log('\tis on qa.velvet.tech')
	}

	if (isPreviewLocation()) {
		console.log('\tPreview requested')
		_baseUrlNow = isQA ? BU.previewQA : BU.preview
	} else {
		console.log('\tLive requested')
		_baseUrlNow = isQA ? BU.liveQA : BU.live
	}

	_settings = slugs

	_baseUrlNow += _settings.client + '/' + _settings.locale + '/'
	console.log('\tbase url:', _baseUrlNow)

	const query = getQueryParams()
	const addataSlug = query['addata']
	if (addataSlug) {
		console.log('\t\tAd Data set via query:', addataSlug)
		_settings.addata = addataSlug
	}

	return new Promise((resolve, reject) => {
		_resolved = resolve
		console.log('\tVelvet.init() Promise')
		_settings.addata ? loadAdData() : loadSegment()
	})
}

/** 
	@memberOf Velvet
	@method isPreviewLocation
	@description
		This method returns true for all the locations that should load PREVIEW.JSON instead of published.json.
		Safeguards are in place so that even an ad in a staging/build-state will load published json, if running in 
		any http(s) locations other than the ones listed. 
		<br>
		Use the query to force one way:
	@example
		?velvet=production // force live JSON
		?velvet=preview    // force preview JSON
*/
export function isPreviewLocation() {
	// console.log('\n\n Velvet.isPreviewLocation() > queryParams? \n\n')
	let href = window.location.href
	if (href == undefined || href == null) return false
	const query = getQueryParams()
	if (query['velvet'] === 'production') return false
	else if (query['velvet'] === 'preview') return true
	// local locations
	if (
		href.match(/^file/) ||
		href.match(/velvet\.ff0000\-cdn\.net/) ||
		href.match(/velvet\-staging\.ff0000\-cdn\.net/) ||
		href.match(/velvet\-dev\.ff0000\-cdn\.net/) ||
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
function loadSegment() {
	new DataLoader(_baseUrlNow + _settings.segment, {
		name: 'segmentLoader',
		fileType: 'json',
		onComplete: handleSegmentLoadComplete,
		onFail: handleFail
	}).load()
}

function loadAdData() {
	new DataLoader(_baseUrlNow + _settings.addata, {
		name: 'velvetAdDataLoader',
		fileType: 'json',
		onComplete: handleAdDataLoadComplete,
		onFail: handleFail
	}).load()
}

/* ------------------------------------------------------------------------------------------------------------- */
// EVENT HANDLERS
function handleSegmentLoadComplete(event) {
	const segmentJson = JSON.parse(event.dataRaw)
	console.log('Velvet segment Json:\n', segmentJson)

	// check if there is a timezone to apply as default to all display times:
	DateManager.setDefaultTimezone(segmentJson.tz)

	const timeblocks = segmentJson.timeblocks

	const now = DateManager.getNow()

	let i
	// sort through timeblocks to find the current
	for (i = 0; i < timeblocks.length; i++) {
		const startDate = timeblocks[i].time
		if (now < startDate) {
			break
		}
	}
	const latestIndex = i - 1

	if (latestIndex < 0) {
		handleFail()
		return
	} else {
		console.log('\tselected timeblock:', timeblocks[latestIndex])
	}
	const rotation = timeblocks[latestIndex].ad_rotation
	_settings.addata = randomWeightedKey(rotation)
	console.log('\tselected ad slug:', _settings.addata)

	if (_settings.addata === 'USE_STATIC') {
		EC.dispatch(events.STATIC)
		return
	}

	loadAdData()
}

function handleAdDataLoadComplete(event) {
	console.log('Velvet.handleAdDataLoadComplete()')
	adDataRaw = JSON.parse(event.dataRaw)
	console.log('Velvet Raw addata:\n', adDataRaw)

	_resolved()
	EC.dispatch(events.INIT)
}

function handleFail() {
	EC.dispatch(events.FAIL)
}
