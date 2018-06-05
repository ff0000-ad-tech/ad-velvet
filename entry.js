// import * as Velvet from './index.js'

// import { DateFormatter, DateManager, DateSchedule, DateUtils, Timezone, TzDate } from 'ad-dates'
// import * as DateFormatter from './node_modules/@ff0000-ad-tech/ad-dates/lib/DateFormatter.js'
// import * as DateManager from './node_modules/@ff0000-ad-tech/ad-dates/lib/DateManager.js'
// import DateSchedule from './node_modules/@ff0000-ad-tech/ad-dates/lib/DateSchedule.js'
// import * as DateUtils from './node_modules/@ff0000-ad-tech/ad-dates/lib/DateUtils.js'
// import * as Timezone from './node_modules/@ff0000-ad-tech/ad-dates/lib/Timezone.js'
// import TzDate from './node_modules/@ff0000-ad-tech/ad-dates/lib/TzDate.js'
// import english from './node_modules/@ff0000-ad-tech/ad-dates/lib/languages/labelEnglish.js'
// import spanish from './node_modules/@ff0000-ad-tech/ad-dates/lib/languages/labelSpanish.js'

// window.Velvet = Velvet
// window.DateFormatter = DateFormatter
// window.DateManager = DateManager
// window.DateSchedule = DateSchedule
// window.DateUtils = DateUtils
// window.Timezone = Timezone
// window.TzDate = TzDate
// window.english = english

import DataLoader from 'ad-load/lib/single/DataLoader.js'

new DataLoader('./', {
	name: 'velvetAdDataLoader',
	fileType: 'json',
	onComplete: () => {
		console.log('onComplete')
	},
	onFail: () => {
		console.log('onFail')
	}
}).load()
