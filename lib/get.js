import * as DataManager from './DataManager.js'

let _debug = false
let recursive
let result = []
let targetKey
let anchor
let splits
let _pathed

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
	var source = _useRawObject ? DataManager._adDataRaw : arguments[0]

	// will it search through all layers? default false
	recursive = !!arguments[_useRawObject ? 1 : 2]

	// if (_debug) console.log(Array(100).join('-') + '\nget(', key, ')\nwithin:', source, '\nrecursive:', recursive)
	result = []

	// strip the original key of all '.values'
	var strippedKey = key.replace(/\.value(\.|)/g, '.').replace(/\.$/, '')
	// if (_debug) console.log('\tstrippedKey:', strippedKey)

	// split the path up, eg: 'grand.parent.child' > [ grand, parent, child ]
	splits = strippedKey.split('.')
	anchor = undefined
	// remove the last value with is the target node
	targetKey = splits.pop()

	// add back in all the '.value' where applicable
	var pathInExpanded = ''
	for (let i = 0; i < splits.length; i++) {
		if (i > 0) pathInExpanded += '.'
		pathInExpanded += splits[i]
		if (isNaN(splits[i])) {
			pathInExpanded += '.value'
		}
	}
	// if (_debug) console.log('\tkey:', key, '\n\tsplits:', splits, '\n\tpathInExpanded:', pathInExpanded)

	// is the a specific path to follow or just a key?
	_pathed = splits.length > 0
	if (_pathed) {
		splits = pathInExpanded.split('.')
		// extract out the anchor to know where the path starts at, not necessarily at the top
		anchor = splits.shift()
		splits.push(targetKey)
		if (_debug) console.log('\tanchor:', anchor, '\n\tsplits again:', splits)
	}

	// start walking through the top object or array supplied
	walk(source)

	if (result.length == 1) {
		result = result[0]
		// add explicit check for type object because IE
		if (result && typeof result == 'object' && Object.keys(result).length == 0) {
			result = undefined
		}
	} else if (result.length == 0) {
		result = undefined
	}

	// if (_debug) console.log(result)

	return result
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
	if (!_pathed && !isNaN(targetKey)) {
		// if looking for an index value of a passed in array
		result.push(arr[targetKey])
	} else {
		for (var i = 0; i < arr.length; i++) {
			walkObject(arr[i])
		}
	}
}

function readProperty(obj, param) {
	// if (_debug) console.log('\t\t\t readProperty()', obj, param, '|', anchor, '|', targetKey)
	if (param == targetKey && !_pathed) {
		// if a match is found
		// AND
		// only if no path is set, store it, otherwise it will
		// store false equivelants when recurively going through objects

		result.push(properKey(obj[param]))
	} else if (param == anchor) {
		// if the anchor, eg 'grand', is found, skip to reading the whole path eg 'grand.parent.child'
		var narrowDown = readPropertyPath(splits, obj[param])
		// if (_debug) console.log('param:', param, '\n\tnarrowDown:', narrowDown, '\n\tobj[param]:', obj[param], param)
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

function properKey(obj) {
	return obj.hasOwnProperty('value') ? obj.value : obj
}

// repurposed from ObjectUtils, reads a path 'grand.parent.child' and returns that node on 'child'
function readPropertyPath(splits, obj) {
	var result = obj || {}
	var s
	for (let i = 0; result && (s = splits[i]); i++) {
		result = s in result ? result[s] : undefined
	}
	return result
}
