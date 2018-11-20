/** ----------------------------------------------------------------------------------------------------------------------------------------------------------
	Class: 	Capture

	Description:
		This class controls the communication with the backend to enable static snap shots of the ad's endframe,
		including the ability to take a shot of every date for a unit with a DateSchedule determining its messaging.
		<br>
		<codeblock>
			// importing into an ES6 class
			import * as Velvet from 'ad-velvet'
		</codeblock>
		<br><br>
	
	Adding a Schedule:
		(start code)
			// within AdData.js

			// create a schedule
			var schedule = new DateSchedule({
				target: new TzDate({
					datetime: Velvet.get('tune_in.datetime'),
					outputTimezone: Velvet.get('tune_in.timezone')
				}),
				isStandard: true
			});

			// add the schedule to Capture
			Velvet.capture.addSchedule(schedule)
			// make a call that will be heard by Velvet
			Velvet.capture.dispatchData()
		(end code)

	Adding custom data to be passed into the ad:
		(start code)
			// within AdData.js

			Velvet.capture.addCustomData({ type:'yellow' })
			Velvet.capture.dispatchData()
		(end code)

	Calling the snap shot at the end of the ad:
		(start code)
			// When loading is complete and the ad begins
			Velvet.capture.adStart()
			
			// within Control
			this.animationComplete = function() {
				console.log('Control.animationComplete()')
				Velvet.capture.adComplete()
			}

			// then from the end of the animation, call 
			Control.animationComplete()

		(end code)
		
	Notes:
		Some notes forthcoming.

	---------------------------------------------------------------------------------------------------------------------------------------------------------- */
let _collection = []
let _startTime

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
export function addSchedule(schedule) {
	console.log('Velvet.capture.addSchedule()')
	const dates = schedule.getDates(true)

	for (let i = 0; i < dates.length; i++) {
		const item = dates[i]
		const date = item.date

		const obj = {
			date: date.toISO(),
			tz: date.outputTimezone.abbr[0],
			ltz: adParams.defaultTimezone,
			label: item.standardKey
		}
		// console.log('\t', date.toFullDateTime(), '\t', item.standardKey, '\t', obj)

		_collection.push(obj)
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
export function addCustomData(obj) {
	console.log('Velvet.capture.addCustomData()')
	if (typeof obj !== 'object') {
		throw new Error('Cannot use a primative as data, must be an Object passed to .addCustomData()')
	}
	_collection.push(obj)
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
export function dispatchData() {
	if (_collection.length === 0) {
		_collection.push({ foo: 'bar' })
	}
	console.log('Velvet.capture.dispatchData()\n\t', _collection)
	dispatch('setParameters', _collection)
}

/**
	@memberOf Capture
	@method dispatchSchedule
	@desc
		Calls back to the server to take a screen snap shot. This must be called after all animation is complete. 
*/
export function adComplete() {
	const endTime = Date.now()
	const duration = endTime - _startTime
	console.log(`Velvet.capture.adComplete() | endTime: ${endTime} | duration: ${duration}`)
	dispatch('adComplete', { duration: duration })
}

/**
	@memberOf Capture
	@method dispatchStart
	@desc
		Calls back to the server to start video capture. This must be called at the start of the ad. 
*/
export function adStart() {
	_startTime = Date.now()
	console.log(`Velvet.capture.adStart() | _startTime: ${_startTime}`)
	dispatch('adStart')
}

function dispatch(event, data) {
	data = data || {}
	if (typeof window.callExternal === 'function') {
		window.callExternal({
			event: event,
			data: data
		})
	}
}
