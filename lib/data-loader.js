export const loadJson = async (path) => {
	return await new Promise((resolve, reject) => {
		const req = new XMLHttpRequest()
		req.onreadystatechange = (target) => {
			if (req.readyState === 4) {
				if (req.status == 200) {
					resolve(req.response)
				} else {
					reject({ target })
				}
			}
		}
		req.open('GET', path, true)
		req.responseType = 'json'
		req.send()
	})
}
