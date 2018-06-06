/*-- Red.Inject.ad-dates.start --*/
/*-- Red.Inject.ad-dates.end --*/

var adDatesModules = ['TzDate', 'RecurringSchedule', 'DateSchedule', 'spanish', 'DateFormatter', 'DateManager', 'DateUtils', 'Timezone']
for (var i = 0, k = 8; i < k; i++) {
	var key = adDatesModules[i]
	console.log(i, key, this['ad-dates'][key])
	this[key] = this['ad-dates'][key]
}

/*-- Red.Inject.Velvet.start --*/
/*-- Red.Inject.Velvet.end --*/

// TODO: better syntax
// Velvet.__init__ = function(v, d) {
// 	console.log('__init__')
// 	console.log(v)
// 	console.log(d)
// }
