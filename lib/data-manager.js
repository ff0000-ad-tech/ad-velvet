/**
 * @namespace Velvet
 * @static
 * @desc
 * This object is meant to handle all of our json loading and parsing from the Velvet platform.
 * <codeblock>
 * import { Velvet } from 'ad-velvet'
 * </codeblock>
 * <br>
 * When testing, changing the date can be a crucial testing step. see {@link DateManager} for more information.
 * <br>
 * Available query params:
 * <codeblock>
 * addata=[slug]			// force the ad to show specific addata by passing in its slug
 * velvet=production 		// force live JSON
 * velvet=preview    		// force preview JSON
 * velvetCaptureRotate=1	// rotates the top level DOM -90 degrees to allow for larger video captures
 * velvetCaptureSlates=1	// shows color slates for accuracy with Capture video
 * </codeblock>
 */

import { DateManager } from '@ff0000-ad-tech/ad-dates'
import { randomWeightedKey } from '@ff0000-ad-tech/ad-utils/lib/MathUtils.js'
import * as BU from './base-urls.js'
import * as events from './events.js'
import * as EC from './event-controller.js'
import * as dataLoader from './data-loader.js'

let _baseUrlNow = undefined
let _settings = undefined

/* ------------------------------------------------------------------------------------------------------------- */
export let adDataRaw = {}
export let dimensions = undefined
export let captureSlates = false
export let captureRotate = false
export let mainElement = undefined

/* ------------------------------------------------------------------------------------------------------------- */
// PUBLIC METHODS

/**
 * @memberOf Velvet
 * @method init
 * @param {object} velvet
 * 	see "Properties" for more information
 * @param {object} dateSettings
 * 	The date settings for internal init of {@link DateManager}
 * @param {string} adSize
 * 	The width and height as a string formatted "300x250"; Used for getting size specific assets.
 * @param {string} adElement
 * 	The main DOM element of the ad; Used by Capture for color slates with video capturing.
 * @property {string} client
 * 	the first "slug" in the url string
 * @property {string} locale
 * 	the second "slug" in the url string
 * @property {string} segment
 * 	the third "slug" in the url string - this defines the segment, aka the map to which addata will be loaded
 * @property {string} addata
 * 	Optionally, when viewing an addata url, the last "slug" defines which data set id being used. This can be manually set in the ad, mostly jsut for testing purposes
 * @desc
 * 	This passes the velvet object from parent scope and initialized the class.  In the index is an Object of "slugs" which are 10 digit String hashes that
 * 	are keys for locations of the client, locale, segment of the that data on Velvet cdn.
 * @example
 * // in the index.html, inside adParams:
 * velvet : {
 * 	client 	: "ZcHT9C9y6Z",
 * 	locale	: "whV1g8DKPe",
 * 	segment	: "C4iaBG6CoP",
 * 	//adData 	: "jaScLD8ayE"
 * }
 *
 * // in Preflight.js
 * static prepareVelvet() {
 * 	console.log('Common.prepareVelvet()')
 * 	Velvet.addEventListener(Velvet.events.FAIL, global.failAd)
 * 	Velvet.addEventListener(Velvet.events.STATIC, global.useStatic)
 * 	adParams.dateSettings.inDev = adParams.environmentId == 'staging' || adParams.environmentId == 'debug'
 * 	return Promise.resolve(Velvet.init(adParams.velvet, adParams.dateSettings, adParams.adSize, Markup.get('main')))
 * }
 */
export const init = async (adElement, { velvet, dateSettings, adSize }) => {
	console.log('Velvet.init()')
	mainElement = adElement
	_settings = velvet
	console.warn(dateSettings)
	DateManager.init(dateSettings)
	dimensions = adSize

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

	_baseUrlNow += `${_settings.client}/${_settings.locale}/`
	console.log('\tbase url:', _baseUrlNow)

	const query = window.getQueryParams()
	const addataSlug = query['addata']
	if (addataSlug) {
		console.log('\t\tAd Data set via query:', addataSlug)
		_settings.addata = addataSlug
	}

	captureRotate = query['velvetCaptureRotate'] === '1'
	captureSlates = query['velvetCaptureSlates'] === '1'

	if (_settings.addata) {
		await loadAdData()
	} else {
		await loadSegment()
	}
}

/**
 * @memberOf Velvet
 * @method isPreviewLocation
 * @description
 * 	This method returns true for all the locations that should load PREVIEW.JSON instead of published.json.
 * 	Safeguards are in place so that even an ad in a staging/build-state will load published json, if running in
 * 	any http(s) locations other than the ones listed.
 * 	<br>
 * 	Use the query to force one way:
 * @example
 * ?velvet=production // force live JSON
 * ?velvet=preview    // force preview JSON
 */
export function isPreviewLocation() {
	// console.log('\n\n Velvet.isPreviewLocation() > queryParams? \n\n')
	let href = window.location.href
	if (href == undefined || href == null) return false
	const query = window.getQueryParams()
	if (query['velvet'] === 'production') return false
	else if (query['velvet'] === 'preview') return true
	// local locations
	if (
		href.match(/^file/) ||
		href.match(/velvet\.ff0000\-cdn\.net/) ||
		href.match(/velvet\-staging\.ff0000\-cdn\.net/) ||
		href.match(/velvet\-dev\.ff0000\-cdn\.net/) ||
		href.match(/ff0000\.com/) ||
		href.match(/adprodtest/) ||
		href.match(/client\-projects\.com/) ||
		href.match(/160over90\.com/) ||
		href.match(/velvet\-dps\.tech/) ||
		href.match(/localhost:[0-9]/) ||
		href.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+/)
	) {
		return true
	}

	// other locations
	return false
}

/* ------------------------------------------------------------------------------------------------------------- */
// PRIVATE METHODS
const loadSegment = async () => {
	const jsonUrl = _baseUrlNow + _settings.segment
	const json = await dataLoader.loadJson(jsonUrl)
	await handleSegmentLoadComplete(json)
}

const loadAdData = async () => {
	const jsonUrl = _baseUrlNow + _settings.addata
	const json = await dataLoader.loadJson(jsonUrl)
	await handleAdDataLoadComplete(json)
}

/* ------------------------------------------------------------------------------------------------------------- */
// EVENT HANDLERS
const handleSegmentLoadComplete = async (segmentJson) => {
	console.log(`SEGMENT ${_settings.segment}:`)
	console.log(segmentJson)
	// check if there is a timezone to apply as default to all display times:
	DateManager.setDefaultTimezone(segmentJson.tz)
	const timeblocks = segmentJson.timeblocks
	const now = DateManager.getNow()
	// sort through timeblocks to find the current
	let i
	for (i = 0; i < timeblocks.length; i++) {
		const startDate = timeblocks[i].time
		if (now < startDate) {
			break
		}
	}
	// no current timeblock
	const latestIndex = i - 1
	if (latestIndex < 0) {
		EC.dispatch(events.STATIC)
	}
	// determine current ad-data
	else {
		console.log(`TIMEBLOCK:`)
		console.log(timeblocks[latestIndex])
		const rotation = timeblocks[latestIndex].ad_rotation
		_settings.addata = randomWeightedKey(rotation)
		if (_settings.addata === 'USE_STATIC') {
			EC.dispatch(events.STATIC)
		} else {
			await loadAdData()
		}
	}
}

const handleAdDataLoadComplete = async (adDataJson) => {
	console.log(`AD-DATA ${_settings.addata}:`)
	adDataRaw = adDataJson
	console.log(adDataRaw)
	EC.dispatch(events.INIT)
}
