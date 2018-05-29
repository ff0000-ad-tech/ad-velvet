import * as DM from './data-manager.js'

let _debug = false
let _recursive
let _result = []
let _targetKey
let _anchor
let _splits
let _isPathed

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
export default function get() {
	// check if the first arg is a key = 'node' / 'path.node' OR is it a sub object to look within
	const _useRawObject = typeof arguments[0] === 'string'

	var key = arguments[_useRawObject ? 0 : 1]
	var source = _useRawObject ? DM.adDataRaw : arguments[0]

	// will it search through all layers? default false
	_recursive = !!arguments[_useRawObject ? 1 : 2]

	// if (_debug) console.log(Array(100).join('-') + '\nget(', key, ')\nwithin:', source, '\_recursive:', _recursive)
	_result = []

	// strip the original key of all '.values'
	var strippedKey = key.replace(/\.value(\.|)/g, '.').replace(/\.$/, '')
	// if (_debug) console.log('\tstrippedKey:', strippedKey)

	// split the path up, eg: 'grand.parent.child' > [ grand, parent, child ]
	_splits = strippedKey.split('.')
	_anchor = undefined
	// remove the last value with is the target node
	_targetKey = _splits.pop()

	// add back in all the '.value' where applicable
	var pathInExpanded = ''
	for (let i = 0; i < _splits.length; i++) {
		if (i > 0) pathInExpanded += '.'
		pathInExpanded += _splits[i]
		if (isNaN(_splits[i])) {
			pathInExpanded += '.value'
		}
	}
	// if (_debug) console.log('\tkey:', key, '\n\t_splits:', _splits, '\n\tpathInExpanded:', pathInExpanded)

	// is the a specific path to follow or just a key?
	_isPathed = _splits.length > 0
	if (_isPathed) {
		_splits = pathInExpanded.split('.')
		// extract out the _anchor to know where the path starts at, not necessarily at the top
		_anchor = _splits.shift()
		_splits.push(_targetKey)
		if (_debug) console.log('\t_anchor:', _anchor, '\n\t_splits again:', _splits)
	}

	// start walking through the top object or array supplied
	walk(source)

	if (_result.length == 1) {
		_result = _result[0]
		// add explicit check for type object because IE
		if (_result && typeof _result == 'object' && Object.keys(_result).length == 0) {
			_result = undefined
		}
	} else if (_result.length == 0) {
		_result = undefined
	}

	// if (_debug) console.log(_result)

	return _result
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
	// if (_debug) console.log('walkObject() >', obj)

	// at this level, just check key? if not found AND recurrsive, then use loop
	for (var param in obj) {
		readProperty(obj, param)
	}
}

function walkArray(arr) {
	if (!_isPathed && !isNaN(_targetKey)) {
		// if looking for an index value of a passed in array
		_result.push(arr[_targetKey])
	} else {
		for (var i = 0; i < arr.length; i++) {
			walkObject(arr[i])
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

		_result.push(properKey(obj[param]))
	} else if (param == _anchor) {
		// if the _anchor, eg 'grand', is found, skip to reading the whole path eg 'grand.parent.child'
		var narrowDown = readPropertyPath(_splits, obj[param])
		// if (_debug) console.log('param:', param, '\n\tnarrowDown:', narrowDown, '\n\tobj[param]:', obj[param], param)
		if (narrowDown) {
			_result.push(properKey(narrowDown))
		}
		return
	}
	// only if looping thought recursivley, handle objects or arrays
	if (_recursive) {
		walk(obj[param])
	}
}

function properKey(obj) {
	return obj.hasOwnProperty('value') ? obj.value : obj
}

// repurposed from ObjectUtils, reads a path 'grand.parent.child' and returns that node on 'child'
function readPropertyPath(_splits, obj) {
	var _result = obj || {}
	var s
	for (let i = 0; _result && (s = _splits[i]); i++) {
		_result = s in _result ? _result[s] : undefined
	}
	return _result
}