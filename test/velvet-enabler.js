window['ad-dates'] = (function(e) {
	function t(r) {
		if (n[r]) return n[r].exports
		var a = (n[r] = { i: r, l: !1, exports: {} })
		return e[r].call(a.exports, a, a.exports, t), (a.l = !0), a.exports
	}
	var n = {}
	return (
		(t.m = e),
		(t.c = n),
		(t.d = function(e, n, r) {
			t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: r })
		}),
		(t.n = function(e) {
			var n =
				e && e.__esModule
					? function() {
							return e.default
					  }
					: function() {
							return e
					  }
			return t.d(n, 'a', n), n
		}),
		(t.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}),
		(t.p = ''),
		t((t.s = 0))
	)
})([
	function(e, t, n) {
		'use strict'
		function r(e, t) {
			var n = ''
			for (e < 0 && (n = '-'), e = e.toString().replace(/\-/, '', e); e.length < t; ) e = '0' + e
			return n + e
		}
		function a(e) {
			y = e || y
		}
		function o(e) {
			for (var t in e) z[t] = e[t]
		}
		function i(e) {
			return z[e || y]
		}
		function u(e, t) {
			var e = e.toString(),
				n = e.slice(e.length - 1),
				r = i(),
				a = r.TH
			switch (n) {
				case '1':
					'11' != e && (a = r.ST)
					break
				case '2':
					'12' != e && (a = r.ND)
					break
				case '3':
					'13' != e && (a = r.RD)
			}
			return (t ? e : '') + a
		}
		function c(e, t, n) {
			n = n || {}
			var a = n.inTimezone || e.outputTimezone,
				o = n.language,
				c = e.getIn(a),
				l = i(o),
				s = c.getMonth(),
				f = c.getHours(),
				d = c.getMinutes()
			return t.replace(/\$\{(.*?)\}/g, function(e, t) {
				var n = t,
					o = 0,
					i = void 0,
					g = !1,
					m = !0,
					T = !0
				switch (
					(t.replace(/(.+)(\^)/, function(e, n) {
						;(t = n), (g = !0)
					}),
					2 == t.length &&
						t.replace(/(?![Yo])([a-zA-Z]).*?\1/, function(e, n) {
							;(t = n.substr(0, 1)), (i = 2)
						}),
					t)
				) {
					case 'YY':
						o = -2
					case 'YYYY':
						n = ('' + c.getFullYear()).slice(o)
						break
					case 'M':
						n = s + 1
						break
					case 'MMM':
						n = l.MONTHS_ABRV[s]
						break
					case 'MMMM':
						n = l.MONTHS_FULL[s]
						break
					case 'D':
						n = c.getDate()
						break
					case 'o':
						T = !1
					case 'Do':
						n = u(c.getDate(), T)
						break
					case 'DDD':
						n = l.WEEKDAYS_ABRV[c.getDay()]
						break
					case 'DDDD':
						n = l.WEEKDAYS_FULL[c.getDay()]
						break
					case 't':
						m = !1
					case 'T':
						;(n = f), m || (0 == (n %= 12) && (n = 12)), d > 0 && (i = !0), i && (n += ':' + r(d, 2))
						break
					case 'H':
						n = f
						break
					case 'h':
						;(n = f % 12), 0 == n && (n = 12)
						break
					case 'm':
						n = d
						break
					case 's':
						n = c.getSeconds()
						break
					case 'a':
						n = f >= 12 ? 'pm' : 'am'
						break
					case 'z':
						n = a.abbr[0]
				}
				return i && (n = r(n, i)), g && 'string' == typeof n && (n = n.toUpperCase()), n
			})
		}
		function l(e) {
			var t = {},
				n = window.location.href.split('?')
			if (n.length > 1) {
				var r = n[1].split('&')
				for (var a in r) {
					var o = r[a].split('=')
					2 == o.length && (t[o[0]] = decodeURIComponent(o[1]))
				}
			}
			return e ? t[e] : Object.keys(t).length > 0 ? t : void 0
		}
		function s() {
			return _
		}
		function f(e) {
			N = d(e)
			var t = N.value,
				n = new Date().getTimezoneOffset(),
				r = Math.floor(n / 60),
				a = n % 60,
				o = Math.floor(t),
				i = (t % 1) * 60,
				u = -(o + r),
				c = -(i + a)
			t > 0 && (u = 24 + u),
				console.log('hr:', r, 'min:', a, '| adjHr:', u, 'adjMin:', c),
				(_[0] = u),
				(_[1] = c),
				console.log('Timezone.setLocal() ->', N, e, t, _)
		}
		function d(e, t) {
			var n = e
			if ('local' == e || void 0 == e) n = N ? ('string' == typeof N ? N : N.label) : T(t)
			else {
				if ('UTC' == e || 'UTC' == e.label || 'utc' == e) return { label: 'UTC', abbr: ['utc'], value: 0 }
				'trueLocal' == e && (n = T(t))
			}
			if ('string' == typeof n) {
				if (n.length < 5) {
					var r = m(n)
					r && (n = r)
				}
			} else n = e.label
			var a = {},
				o = I[n]
			if (o) {
				var i = o.split('|')
				;(a.label = n), (a.abbr = i[0].split(','))
				var u = i[1].split(',')
				if (u.length > 1) {
					var c = t || new Date(),
						l = c.getFullYear()
					l < 2018 && (l = 2018)
					var s = n.split('/'),
						f = v(s[0], l)
					f || (f = v(s[1], l))
					var d = f.split(','),
						p = new Date(l + '-' + d[0] + 'T03:00:00' + g(u[1])),
						D = new Date(l + '-' + d[1] + 'T03:00:00' + g(u[0])),
						b = (S(c, { hour: u[0] }), c.getTime() > p.getTime() && c.getTime() < D.getTime()),
						h = b ? 0 : 1
					a.value = u[h]
				} else a.value = u[0]
			} else (a.label = n), (a.abbr = [n.toLowerCase()]), (a.value = -new Date().getTimezoneOffset() / 60)
			return a
		}
		function g(e) {
			var t = isNaN(e) ? e.value : e,
				n = t > 0 ? Math.floor(t) : Math.ceil(t),
				a = (t % 1) * 60
			return (a = t > 0 ? Math.floor(a) : Math.ceil(a)), (t < 0 ? '-' : '+') + r(Math.abs(n), 2) + ':' + r(Math.abs(a), 2)
		}
		function m(e) {
			var t = void 0,
				n = e.toLowerCase()
			for (var r in I) {
				if (
					I[r]
						.split('|')[0]
						.split(',')
						.indexOf(n) >= 0
				) {
					t = r
					break
				}
			}
			return t
		}
		function T(e) {
			var t = e || new Date(),
				n = t.toTimeString(),
				r = n.split('(')[1]
			return (r = r.substr(0, r.length - 1)), r.replace(/[a-z\.\s]/g, '')
		}
		function v(e, t) {
			if ('string' == typeof L[e]) {
				var n = L[e].split('|').map(function(e) {
					return e.split(',').map(function(e) {
						return r(e, 2)
					})
				})
				L[e] = {}
				var a = n[0],
					o = n[2]
				n[1].map(function(t, n) {
					L[e][k + n] = a[0] + '-' + t + ',' + a[1] + '-' + o[n]
				})
			}
			if (L[e]) return L[e][t]
		}
		function p() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
			if ((console.log('DateManager.init()', e), !x)) {
				x = !0
				var t = l('date'),
					n = 'SYSTEM-DATE'
				t
					? ((Y = t), (n = 'EXTERNAL-DATE'))
					: !e.dateOverride ||
					  ('staging' != adParams.environmentId && 'debug' != adParams.environmentId) ||
					  ((Y = e.dateOverride), (n = 'INTERNAL-DATE'))
				var r = void 0
				if (Y) {
					;(r = new O({ datetime: Y }).outputTimezone), console.log('DateManager tz:', r)
					var o = l('tz')
					o && (r = o)
				}
				f(r)
				var i = l('ltz')
				i && (adParams.defaultTimezone = i),
					console.log('-- CURRENT DATE ' + Array(104).join('-')),
					console.log(''),
					console.log('\t DATE-MODE:'),
					console.log('\t\t', n),
					console.log(''),
					console.log('\t Time for this unit is now assumed to be: '),
					console.log('\t\t', D().toFullDateTime()),
					console.log(''),
					i && (console.log('\t External default timezone is: '), console.log('\t\t', i), console.log('')),
					console.log(Array(120).join('-')),
					e.language && a(e.language)
			}
		}
		function D() {
			var e = Y
			return void 0 == e && (e = new Date().toISOString().split('.')[0] + '+00:00'), new O({ datetime: e, outputTimezone: d('local') })
		}
		function b(e, t) {
			var n = t.getTime() / 1e3 - e.getTime() / 1e3
			n < 0 && (n = 0)
			for (
				var r = { day: n / 86400, hour: (n / 3600) % 24, minute: (n / 60) % 60, second: n % 60, output: '' },
					a = ['day', 'hour', 'minute', 'second'],
					o = 0;
				o < 4;
				o++
			)
				(r.output += TextUtils.pad(Math.floor(r[a[o]]), 2)), o < 3 && (r.output += ':')
			return r
		}
		function S(e, t) {
			var n = void 0
			n = e._isTzDate ? e.clone() : new Date(e)
			for (var r in t) {
				var a = H[r.toUpperCase()],
					o = t[r] * a
				n.setTime(n.getTime() + o)
			}
			return n
		}
		function h(e, t) {
			return void 0 == t && (t = D()), t.getTime() >= e.getTime()
		}
		function O(e) {
			e = e || {}
			var t = 'local',
				n = e.datetime
			if (Array.isArray(n)) {
				;(n = e.datetime[0]), (t = e.datetime[1])
				if (!n.match(/(\+|\-)([0-9]{2})\:([0-9]{2})/g)) {
					n += g(d(t))
				}
			}
			'string' == typeof n && (n = n.replace(/(\T|\s)/g, 'T')),
				e.outputTimezone ? (t = e.outputTimezone) : adParams.defaultTimezone && (t = adParams.defaultTimezone)
			var a = new Date(n)
			return (
				Object.defineProperties(a, {
					outputTimezone: {
						get: function() {
							return t
						},
						set: function(e) {
							t = d(e)
						}
					}
				}),
				(a.clone = function(e) {
					return (e = e || a.outputTimezone), new O({ datetime: a, outputTimezone: e })
				}),
				(a.getHoursIn = function(e, t) {
					var n = a.getIn(e),
						r = n.getHours()
					return 1 != t && r > 12 && (r %= 12), r
				}),
				(a.format = function(e, t) {
					return c(a, e, t)
				}),
				(a.getIn = function(e) {
					var t = a.toISOString().split('.')[0],
						n = g(d('trueLocal', a)),
						r = d(e || a.outputTimezone, a)
					return S(new Date(t + n), { hour: r.value })
				}),
				(a.print = function(e) {
					var t = a.toFullDateTime(e)
					return console.log(t), t
				}),
				(a.toFullDateTime = function(e) {
					return (
						(e = e || a.outputTimezone),
						a
							.getIn(e)
							.toString()
							.split('GMT')[0] + e.label
					)
				}),
				(a.toSimpleDate = function(e) {
					var t = a.getIn(e)
					return t.getMonth() + 1 + '/' + t.getDate()
				}),
				(a.toDate = function(e) {
					var t = a.getIn(e)
					return a.toSimpleDate(e) + '/' + t.getFullYear()
				}),
				(a.toDateTime = function(e) {
					return a.toDate(e) + ' ' + a.toTime(e)
				}),
				(a.toSimpleDateTime = function() {
					return a.toSimpleDate() + ' ' + a.toTime()
				}),
				(a.toTime = function(e) {
					return a.toSimpleTime(e) + ' ' + a.toMeridiem(e)
				}),
				(a.toSimpleTime = function(e, t) {
					var n = a.getIn(e),
						o = a.getHoursIn(e, t)
					return 0 != o || t || (o = 12), t && (o = r(o, 2)), o + ':' + r(n.getMinutes(), 2)
				}),
				(a.toMeridiem = function(e, t) {
					var n = e || a.outputTimezone
					return (a.getIn(n).getHours() >= 12 ? 'pm' : 'am') + (1 == t ? '/' + n.abbr[0] : '')
				}),
				(a.toShortestTime = function(e, t) {
					return a.toSimpleTime(e, t).replace(/:00$/g, '')
				}),
				(a.toDateTimeISO = function(e) {
					var t = a.toDate(e),
						n = t.split('/')
					return n[2] + '-' + r(n[0], 2) + '-' + r(n[1], 2) + 'T' + a.toSimpleTime(e, !0) + ':00'
				}),
				(a.toISO = function() {
					return a.toDateTimeISO(a.outputTimezone) + g(a.outputTimezone)
				}),
				(a._isTzDate = !0),
				(a.outputTimezone = t),
				a
			)
		}
		function A(e, t, n) {
			return Math.max(t, Math.min(n, e))
		}
		function E(e) {
			e = e || {}
			var t = this,
				n = [],
				a = {},
				o = void 0,
				u = !1,
				c = e.callback || function() {},
				l = e.tonightStartsAt || '17:30',
				f = 0 != e.hasOneDayOf,
				g = e.eventDuration || 120
			Object.defineProperties(t, {
				target: {
					get: function() {
						return o
					}
				},
				current: {
					get: function() {
						return n[t.currentIndex]
					}
				},
				currentDate: {
					get: function() {
						return t.current.date
					}
				},
				currentLabel: {
					get: function() {
						return t.current.label
					}
				},
				currentIndex: {
					get: function() {
						for (var e = -1, t = 0, r = n.length; t < r && h(n[t].date); t++) e = t
						return e
					}
				},
				next: {
					get: function() {
						return n[t.nextIndex]
					}
				},
				nextDate: {
					get: function() {
						return t.next.date
					}
				},
				nextLabel: {
					get: function() {
						return t.next.label
					}
				},
				nextIndex: {
					get: function() {
						return A(t.currentIndex + 1, 0, n.length - 1)
					}
				},
				isLive: {
					get: function() {
						return 'NOW' == t.current.standardKey
					}
				},
				isComplete: {
					get: function() {
						return 'PAST' == t.current.standardKey
					}
				}
			}),
				(t.addDate = function(e, c, g) {
					var m = arguments[3],
						T = e,
						v = !1,
						p = !0
					if (!e._isTzDate) {
						var D = o
						switch (m) {
							case 'PAST':
								p = !1
								break
							case 'TONIGHT':
								for (var b = o.toDateTimeISO().split('T')[0] + 'T', h = l.split(':'), A = 0; A < 3; A++) b += r(h[A] || 0, 2) + ':'
								;(b = b.slice(0, -1)),
									(D = new O({ datetime: [b, o.outputTimezone] })),
									(v = D.getTime() > o.getTime()),
									(u = !v),
									(p = f && u)
								break
							case 'TODAY':
								v = f && u
						}
						p && ((D = o.clone(d('local'))), D.setHours.apply(D, s())), (T = S(D, e))
					}
					var E = c
					if (m) {
						var M = a[m]
						void 0 != M ? (c = M) : 'string' == typeof c && (c = i()[m])
					}
					if ('function' == typeof c) {
						var y = m && o ? o : T,
							z = m ? ('WEEK' == m ? E.call(t, y) : i()[m]) : null
						c = c.call(t, y, z)
					}
					return (
						v ||
							(n.push({ date: T, label: c, standardKey: m, callback: g || function() {} }),
							n.sort(function(e, t) {
								var n = e.date.getTime(),
									r = t.date.getTime()
								return n < r ? -1 : n > r ? 1 : 0
							})),
						T
					)
				}),
				(t.print = function() {
					var e = n.length
					console.log('DateSchedule.print(), length:', e)
					for (var t = 0; t < e; t++) console.log(' -', t, n[t].date.toFullDateTime(), 'label:', n[t].label)
				}),
				(t.getDates = function(e) {
					e = !!e
					for (var t = [], r = 0, a = n.length; r < a; r++) t.push(e ? n[r] : n[r].date)
					return t
				})
			var m = e.standardOverrides
			if (m) for (var T in m) a[T] = m[T]
			e.target && ((o = t.addDate(e.target, '', c, 'NOW')), t.addDate({ minute: g }, '', c, 'PAST')),
				t.addDate(
					new O({ datetime: '2000-01-01T00:00:00+00:00', outputTimezone: 'UTC' }),
					function(e) {
						return e.toSimpleDateTime()
					},
					c,
					'DATE'
				),
				o &&
					1 == e.isStandard &&
					(t.addDate({}, '', c, 'TONIGHT'),
					t.addDate({}, '', c, 'TODAY'),
					t.addDate({ hour: -24 }, '', c, 'TOMORROW'),
					t.addDate(
						{ hour: -144 },
						function(e) {
							return i().WEEKDAYS_FULL[e.getIn(o.outputTimezone).getDay()]
						},
						c,
						'WEEK'
					))
		}
		Object.defineProperty(t, '__esModule', { value: !0 }),
			n.d(t, 'DateFormatter', function() {
				return w
			}),
			n.d(t, 'DateManager', function() {
				return j
			}),
			n.d(t, 'DateUtils', function() {
				return P
			}),
			n.d(t, 'Timezone', function() {
				return U
			}),
			n.d(t, 'TzDate', function() {
				return O
			}),
			n.d(t, 'RecurringSchedule', function() {
				return W
			}),
			n.d(t, 'DateSchedule', function() {
				return E
			}),
			n.d(t, 'spanish', function() {
				return C
			})
		var M = {
				english: {
					MONTHS_FULL: [
						'January',
						'February',
						'March',
						'April',
						'May',
						'June',
						'July',
						'August',
						'September',
						'October',
						'November',
						'December'
					],
					MONTHS_ABRV: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
					MONTHS_EXCP: ['', '', '', '', '', '', '', '', 'sept', '', '', ''],
					WEEKDAYS_FULL: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
					WEEKDAYS_ABRV: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'],
					WEEKDAYS_EXCP1: ['', '', 'tues', 'wednes', 'thur', '', ''],
					WEEKDAYS_EXCP2: ['', '', '', '', 'thurs', '', ''],
					ST: 'st',
					ND: 'nd',
					RD: 'rd',
					TH: 'th',
					OF: 'of',
					TOMORROW: 'Tomorrow',
					TODAY: 'Today',
					TONIGHT: 'Tonight',
					NOW: 'Live Now',
					PAST: 'Past'
				}
			},
			y = 'english',
			z = {}
		o(M)
		var w = Object.freeze({ setLanguage: a, addLanguage: o, getLabels: i, getNumericSuffixFor: u, format: c }),
			I = {
				'US/Eastern': 'et,edt,est|-4,-5',
				'US/Central': 'ct,cdt,cst|-5,-6',
				'US/Mountain': 'mt,mdt,mst|-6,-7',
				'US/Pacific': 'pt,pdt,pst|-7,-8',
				'US/Alaska': 'akt,akdt,akst|-8,-9',
				'US/Arizona': 'az|-7',
				'US/Hawaii': 'hast|-10',
				'Australia/Brisbane': 'aest|10',
				'Australia/Sydney': 'aedt,aest|10,11',
				'America/Mexico_City': 'mx|-5,-6',
				'America/Bogota': 'cot|-5',
				'America/Argentina/Buenos_Aires': 'art|-3'
			},
			k = 2018,
			L = {
				US: '3,11|11,10,8,14,13,12,10,9|4,3,1,7,6,5,3,2',
				Australia: '4,10|1,7,5,4,3,2,7,6|7,6,4,3,2,1,6,5',
				Mexico_City: '4,10|1,7,5,4,3,2,7,6|28,27,25,31,30,29,27,26'
			},
			N = void 0,
			_ = [0, 0, 0],
			U = Object.freeze({ getTzDiff: s, setLocal: f, get: d, toISO: g }),
			Y = void 0,
			x = !1,
			j = Object.freeze({ init: p, getNow: D }),
			H = { SECOND: 1e3, MINUTE: 6e4, HOUR: 36e5, DAY: 864e5, WEEK: 6048e5 },
			P = Object.freeze({ getTimeDifference: b, adjust: S, isPast: h }),
			W = function(e) {
				var t,
					n = this
				Object.defineProperties(n, {
					currentSchedule: {
						get: function() {
							var e = t.current.date,
								n = new E({ target: e, isStandard: !0, eventDuration: e.eventDuration, callback: e.callback })
							if (n.isComplete) {
								var r = t.next.date
								n = new E({ target: r, isStandard: !0, eventDuration: r.eventDuration, callback: r.callback })
							}
							return n
						}
					},
					current: {
						get: function() {
							return n.currentSchedule.current
						}
					},
					currentDate: {
						get: function() {
							return n.current.date
						}
					},
					currentLabel: {
						get: function() {
							return n.current.label
						}
					}
				}),
					(n.print = function() {
						t.print()
					}),
					(function() {
						var n = D(),
							r = i().WEEKDAYS_FULL
						t = new E()
						for (var a = e.tuneins, o = 0; o < a.length; o++)
							for (var u = a[o], c = u.days, l = n.getDay(), s = 0; s < c.length; s++) {
								var f = c[s],
									d = r.indexOf(f),
									g = d - l,
									m = new O({ datetime: [n.toDateTimeISO().split('T')[0] + 'T' + u.startTime + ':00', u.timezone] })
								if (((m = S(m, { day: g })), h(m, n))) {
									var T = S(m, { minute: u.eventDuration })
									h(T, n) && (m = S(m, { day: 7 }))
								}
								;(m.eventDuration = u.eventDuration), (m.callback = u.callback), console.log('\t', m.print()), t.addDate(m)
							}
					})()
			},
			C = {
				spanish: {
					MONTHS_FULL: [
						'enero',
						'febrero',
						'marzo',
						'abril',
						'mayo',
						'junio',
						'julio',
						'agosto',
						'septiembre',
						'octubre',
						'noviembre',
						'diciembre'
					],
					MONTHS_ABRV: ['enero', 'feb', 'marzo', 'abr', 'mayo', 'jun', 'jul', 'agosto', 'sept', 'oct', 'nov', 'dic'],
					MONTHS_EXCP: ['', '', '', '', '', '', '', '', 'sep', '', '', ''],
					WEEKDAYS_FULL: ['domingo', 'lunes', 'martes', 'mi&#201;rcoles', 'jueves', 'viernes', 's&#193;bado'],
					WEEKDAYS_ABRV: ['dom', 'lun', 'mar', 'mi&#201;r', 'jue', 'vier', 's&#193;b'],
					WEEKDAYS_EXCP1: ['', '', 'tues', 'wednes', 'thur', '', ''],
					WEEKDAYS_EXCP2: ['', '', '', '', 'thurs', '', ''],
					ST: 'ro',
					ND: 'ndo',
					RD: 'rd',
					TH: 'th',
					OF: 'de',
					TOMORROW: 'ma&#209;ana',
					TODAY: 'hoy',
					TONIGHT: 'esta noche',
					NOW: 'en vivo',
					PAST: 'past'
				}
			}
	}
])

var adDatesModules = ['TzDate', 'RecurringSchedule', 'DateSchedule', 'spanish', 'DateFormatter', 'DateManager', 'DateUtils', 'Timezone']
for (var i = 0, k = 8; i < k; i++) {
	var key = adDatesModules[i]
	console.log(i, key, this['ad-dates'][key])
	this[key] = this['ad-dates'][key]
}

window.Velvet = (function(e) {
	function t(o) {
		if (n[o]) return n[o].exports
		var r = (n[o] = { i: o, l: !1, exports: {} })
		return e[o].call(r.exports, r, r.exports, t), (r.l = !0), r.exports
	}
	var n = {}
	return (
		(t.m = e),
		(t.c = n),
		(t.d = function(e, n, o) {
			t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: o })
		}),
		(t.n = function(e) {
			var n =
				e && e.__esModule
					? function() {
							return e.default
					  }
					: function() {
							return e
					  }
			return t.d(n, 'a', n), n
		}),
		(t.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}),
		(t.p = ''),
		t((t.s = 3))
	)
})({
	3: function(e, t, n) {
		'use strict'
		function o(e, t) {
			if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
			return !t || ('object' != typeof t && 'function' != typeof t) ? e : t
		}
		function r(e, t) {
			if ('function' != typeof t && null !== t) throw new TypeError('Super expression must either be null or a function, not ' + typeof t)
			;(e.prototype = Object.create(t && t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })),
				t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : (e.__proto__ = t))
		}
		function a(e, t) {
			if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
		}
		function i() {
			try {
				return new XMLHttpRequest()
			} catch (e) {}
			try {
				return new ActiveXObject('Msxml2.XMLHTTP')
			} catch (e) {}
			return console.warn('XMLHttpRequest not supported'), null
		}
		function l(e) {
			var t = e.lastIndexOf('.'),
				n = e.lastIndexOf('/') + 1
			return n > t && (t = void 0), e.substring(n, t)
		}
		function c(e) {
			e = e || ''
			var t = e.indexOf('?')
			t > -1 && (e = e.substr(0, t))
			var n = e.match(/[^\\]*\.(\w+)$/),
				o = e.match(/image\/(jpeg|jpg|png)/)
			return n ? n[1] : o ? o[1] : 'unknown'
		}
		function s(e) {
			if ('string' == typeof e) return e
			var t = ''
			for (var n in e) console.log('      prop =', n), (t += n + '=' + e[n] + '&')
			return t.substr(0, t.length - 1)
		}
		function u(e) {
			var t = e.search(/^\/\//) > -1
			if (e.search(/^http/) > -1 || t) {
				var n = window.location.href.search(/^https/) > -1 || adParams.forceHttps,
					o = n ? 'https://' : 'http://'
				if ((t && (e = e.replace(/^\/\//, o)), e.search(/.*edgecastcdn/) > -1)) {
					e =
						o +
						(n ? 'ne1.' + e.match(/w(a|p)c/i)[0] + '.' : e.match(/w(a|p)c\.[a-z0-9]*\./i)[0]) +
						'edgecastcdn' +
						e.replace(/.*edgecastcdn/, '')
				} else if (e.search(/.*paramount\.com/) > -1) {
					var r = n ? 'paramountdlds-a.akamaihd.net' : 'downloads.paramount.com'
					e = o + r + e.replace(/.*paramount\.com/, '')
				} else
					e =
						e.search(/espn\.go\.com/) > -1 || e.search(/secure\.espncdn\.com/) > -1
							? 'https://secure.espncdn.com' + e.replace(/^.*\.com/, '')
							: e.replace(/^https?\:\/\//i, o)
			}
			return e
		}
		function p(e) {
			var t = [],
				n = [0]
			for (var o in e) t.push(o), n.push(e[o] + (n[n.length - 1] || 0))
			for (var r = 100 * Math.random().toFixed(2), a = 0; a < n.length - 1; a++) {
				if (d(r, n[a], n[a + 1])) return t[a]
			}
		}
		function d(e, t, n) {
			var o = Math.min(t, n)
			return e <= Math.max(t, n) && e >= o
		}
		function f(e) {
			var t = {},
				n = window.location.href.split('?')
			if (n.length > 1) {
				var o = n[1].split('&')
				for (var r in o) {
					var a = o[r].split('=')
					2 == a.length && (t[a[0]] = decodeURIComponent(a[1]))
				}
			}
			return e ? t[e] : Object.keys(t).length > 0 ? t : void 0
		}
		function h(e, t) {
			W[e] || (W[e] = [])
			for (var n = W[e], o = 0, r = n.length; o < r; o++) if (n[o] === t) return
			n.push(t)
		}
		function v(e, t) {
			var n = W[e]
			if (n)
				for (var o = 0, r = n.length; o < r; o++)
					if (n[o] === t) {
						n.splice(o, 1)
						break
					}
		}
		function m(e) {
			W[e] &&
				W[e].map(function(e) {
					e()
				})
		}
		function g(e) {
			console.log('Velvet.init()')
			var t = document.referrer.match(/qa\.velvet\.tech/)
			t && console.log('\tis on qa.velvet.tech'),
				y() ? (console.log('\tPreview requested'), (Y = t ? B : G)) : (console.log('\tLive requested'), (Y = isQa ? X : H)),
				(Z = e),
				(Y += Z.client + '/' + Z.locale + '/'),
				console.log('\tbase url:', Y)
			var n = f('addata')
			return (
				n && (console.log('\t\tAd Data set via query:', n), (Z.addata = n)),
				new Promise(function(e, t) {
					;(ee = e), console.log('\tVelvet.init() Promise'), Z.addata ? b() : w()
				})
			)
		}
		function y() {
			var e = window.location.href
			return (
				void 0 != e &&
				null != e &&
				('production' !== f('velvet') &&
					!!(
						e.match(/^file/) ||
						e.match(/manta\.joyent\.com/) ||
						e.match(/ff0000\.com/) ||
						e.match(/adprodtest/) ||
						e.match(/client\-projects\.com/) ||
						e.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+/)
					))
			)
		}
		function w() {
			new U(Y + Z.segment, { name: 'segmentLoader', fileType: 'json', onComplete: T, onFail: j }).load()
		}
		function b() {
			new U(Y + Z.addata, { name: 'velvetAdDataLoader', fileType: 'json', onComplete: q, onFail: j }).load()
		}
		function T(e) {
			var t = JSON.parse(e.dataRaw)
			console.log('Velvet segment Json:\n', t),
				(adParams.defaultTimezone = t.tz),
				adParams.defaultTimezone && console.log('\tdefaultTimezone:', adParams.defaultTimezone)
			var n = t.timeblocks,
				o = DateManager.getNow()
			console.log('\tnow:', o)
			var r = void 0
			for (r = 0; r < n.length; r++) {
				var a = n[r].time
				if ((console.log('\t\t>', new Date(a)), o < a)) break
			}
			var i = r - 1
			if (i < 0) return void j()
			console.log('\tselected timeblock:', n[i])
			var l = n[i].ad_rotation
			if (((Z.addata = p(l)), console.log('\tselected ad slug:', Z.addata), 'USE_STATIC' === Z.addata)) return void m(K)
			b()
		}
		function q(e) {
			console.log('Velvet.handleAdDataLoadComplete()'), (te = JSON.parse(e.dataRaw)), console.log('Velvet Raw addata:\n', te), ee(), m(J)
		}
		function j() {
			m($)
		}
		function C(e) {
			console.log('Velvet.capture.addSchedule()')
			for (var t = e.getDates(!0), n = 0; n < t.length; n++) {
				var o = t[n],
					r = o.date,
					a = { date: r.toISO(), tz: r.outputTimezone.abbr[0], ltz: adParams.defaultTimezone, label: o.standardKey }
				ne.push(a)
			}
		}
		function O(e) {
			if ((console.log('Velvet.capture.addCustomData()'), 'object' !== (void 0 === e ? 'undefined' : R(e))))
				throw new Error('Cannot use a primative as data, must be an Object passed to .addCustomData()')
			ne.push(e)
		}
		function P() {
			0 === ne.length && ne.push({ foo: 'bar' }), console.log('Velvet.capture.dispatchData()\n\t', ne), x('setParameters', ne)
		}
		function S() {
			console.log('Velvet.capture.adComplete()'), x('adComplete')
		}
		function _() {
			console.log('Velvet.capture.adStart()'), x('adStart')
		}
		function x(e) {
			var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
			'function' == typeof window.callExternal && window.callExternal({ event: e, data: t })
		}
		function M() {
			var e = 'string' == typeof arguments[0],
				t = arguments[e ? 0 : 1],
				n = e ? te : arguments[0]
			;(re = !!arguments[e ? 1 : 2]), (ae = [])
			var o = t.replace(/\.value(\.|)/g, '.').replace(/\.$/, '')
			;(ce = o.split('.')), (le = void 0), (ie = ce.pop())
			for (var r = '', a = 0; a < ce.length; a++) a > 0 && (r += '.'), (r += ce[a]), isNaN(ce[a]) && (r += '.value')
			return (
				(se = ce.length > 0),
				se && ((ce = r.split('.')), (le = ce.shift()), ce.push(ie)),
				L(n),
				1 == ae.length
					? (ae = ae[0]) && 'object' == (void 0 === ae ? 'undefined' : R(ae)) && 0 == Object.keys(ae).length && (ae = void 0)
					: 0 == ae.length && (ae = void 0),
				ae
			)
		}
		function L(e) {
			switch (Object.prototype.toString.call(e)) {
				case '[object Object]':
					k(e)
					break
				case '[object Array]':
					z(e)
			}
		}
		function k(e) {
			for (var t in e) A(e, t)
		}
		function z(e) {
			if (se || isNaN(ie)) for (var t = 0; t < e.length; t++) k(e[t])
			else ae.push(e[ie])
		}
		function A(e, t) {
			if (t != ie || se) {
				if (t == le) {
					var n = F(ce, e[t])
					return void (n && ae.push(D(n)))
				}
			} else ae.push(D(e[t]))
			re && L(e[t])
		}
		function D(e) {
			return e.hasOwnProperty('value') ? e.value : e
		}
		function F(e, t) {
			for (var n, o = t || {}, r = 0; o && (n = e[r]); r++) o = n in o ? o[n] : void 0
			return o
		}
		Object.defineProperty(t, '__esModule', { value: !0 }),
			n.d(t, 'init', function() {
				return ue
			}),
			n.d(t, 'isPreviewLocation', function() {
				return pe
			}),
			n.d(t, 'addEventListener', function() {
				return de
			}),
			n.d(t, 'removeEventListener', function() {
				return fe
			}),
			n.d(t, 'add', function() {
				return he
			}),
			n.d(t, 'remove', function() {
				return ve
			}),
			n.d(t, 'events', function() {
				return me
			}),
			n.d(t, 'capture', function() {
				return ge
			}),
			n.d(t, 'get', function() {
				return ye
			})
		var R =
				'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
					? function(e) {
							return typeof e
					  }
					: function(e) {
							return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e
					  },
			V = (function() {
				function e(t) {
					a(this, e), (this.superclass = t)
				}
				return (
					(e.prototype.with = function() {
						for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n]
						return t.reduce(function(e, t) {
							return t(e)
						}, this.superclass)
					}),
					e
				)
			})(),
			I = function(e) {
				return (function(e) {
					function t() {
						for (var n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i]
						a(this, t)
						var l = o(this, e.call.apply(e, [this].concat(r))),
							c = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {},
							s = l
						return (
							(s.onComplete = c.onComplete || function() {}),
							(s.onFail = c.onFail || function() {}),
							(s.onProgress = c.onProgress || function() {}),
							(s.name = c.name || ''),
							(s.scope = c.scope || s),
							s.dataRaw,
							(s.cacheBuster = c.cacheBuster || !1),
							(s._failCalled = !1),
							l
						)
					}
					return (
						r(t, e),
						(t.prototype._handleFail = function() {
							var e = this
							e._failCalled || ((e._failCalled = !0), e.onFail.call(e.scope, e), console.log('Loader "' + e.name + '" Fail:', e.url))
						}),
						t
					)
				})(e)
			},
			E = function(e) {
				return (function(e) {
					function t() {
						for (var n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i]
						a(this, t)
						var s = o(this, e.call.apply(e, [this].concat(r))),
							p = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {},
							d = s
						return (
							(d.url = u(arguments[0] || '')),
							p.platformGetUrl && ((d.platformGetUrl = p.platformGetUrl), (d.url = p.platformGetUrl(d.url))),
							(d.fileName = void 0 === p.id ? l(d.url) : p.id),
							(d.fileType = p.fileType || c(d.url)),
							s
						)
					}
					return r(t, e), t
				})(e)
			},
			N = function e() {
				a(this, e)
			},
			U = (function(e) {
				function t() {
					for (var n = arguments.length, r = Array(n), i = 0; i < n; i++) r[i] = arguments[i]
					a(this, t)
					var l = o(this, e.call.apply(e, [this].concat(r))),
						c = arguments && arguments.length > 1 ? arguments[1] : arguments[0] || {},
						s = l
					return (s.method = (c.method || 'get').toLowerCase()), (s.query = c.query || null), (s.responseType = c.responseType || null), l
				}
				return (
					r(t, e),
					(t.prototype.load = function() {
						var e = this,
							t = null,
							n = 'post' === e.method
						;(e.req = i()), void 0 != e.responseType && (e.req.responseType = e.responseType)
						var o = e.url
						switch (
							(e.query && ((t = s(e.query)), n || ((o += '?' + t), (t = null))),
							e.cacheBuster && ((o += e.query && !n ? '&' : '?'), (o += 'cb=' + new Date().getTime())),
							(e.req.onreadystatechange = e._handleStateChange.bind(e)),
							e.req.open(e.method, o, !0),
							e.fileType)
						) {
							case 'xml':
								e.req.overrideMimeType && e.req.overrideMimeType('text/xml')
								break
							case 'json':
								e.req.overrideMimeType && e.req.overrideMimeType('application/json')
								break
							case 'fba':
							case 'bin':
							case 'binary':
								e.responseType = e.req.responseType = 'arraybuffer'
						}
						'post' === e.method && e.req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'), e.req.send(t)
					}),
					(t.prototype._handleStateChange = function(e) {
						var t = this
						switch (t.req.readyState) {
							case 3:
								200 == this.req.status && ((t.dataRaw = t.responseType ? t.req.response : t.req.responseText), t._handleProgress(t))
								break
							case 4:
								200 == t.req.status
									? ((t.dataRaw = t.responseType ? t.req.response : t.req.responseText), t._handleComplete(t))
									: t._handleFail({ target: e })
						}
					}),
					(t.prototype._handleProgress = function() {
						var e = this
						e.onProgress.call(e.scope, e)
					}),
					(t.prototype._handleComplete = function() {
						var e = this
						e.onComplete.call(e.scope, e)
					}),
					t
				)
			})(
				(function(e) {
					return new V(e)
				})(N).with(I, E)
			),
			H = 'https://json.ff0000-cdn.net/',
			G = 'https://preview.ff0000-cdn.net/preview/',
			X = 'https://qa.ff0000-cdn.net/',
			B = 'https://qa.velvet.tech/preview/',
			J = 'velvetInit',
			$ = 'velvetFail',
			K = 'velvetStatic',
			Q = Object.freeze({ INIT: J, FAIL: $, STATIC: K }),
			W = {},
			Y = void 0,
			Z = void 0,
			ee = void 0,
			te = {},
			ne = [],
			oe = Object.freeze({ addSchedule: C, addCustomData: O, dispatchData: P, adComplete: S, adStart: _ }),
			re = void 0,
			ae = [],
			ie = void 0,
			le = void 0,
			ce = void 0,
			se = void 0,
			ue = g,
			pe = y,
			de = h,
			fe = v,
			he = h,
			ve = v,
			me = Q,
			ge = oe,
			ye = M
	}
})

// var Velvet = this['ad-velvet']
// TODO: better syntax
Velvet.__init__ = function(v, d) {
	console.log('__init__')
	console.log(v)
	console.log(d)
}
