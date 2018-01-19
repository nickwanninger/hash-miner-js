const { SHA256 } = require('crypto-js')

function hex2bin(hex) {
	return hex
		.split('')
		.map(char => {
			return parseInt(char, 16)
				.toString(2)
				.padStart(4, '0')
		})
		.join('')
}

function hash(data) {
	let message = ''

	if (typeof data == 'string') {
		message = data
	} else {
		message = JSON.stringify(data)
	}

	return SHA256(message).toString()
}

function mine(data, difficulty) {
	const startTime = new Date().getTime()
	var message = typeof data == 'string' ? data : JSON.stringify(data)
	var nonce = 0
	var h = ''
	do {
		h = hash(message + nonce)
		nonce++
	} while (!isValidHashDifficulty(h, difficulty))
	const time_ms = new Date().getTime() - startTime
	return {
		hash: h,
		binary_string: hex2bin(h),
		nonce: nonce,
		data,
		time_ms,
		difficulty,
		data_type: typeof data
	}
}

function isValidHashDifficulty(hash, difficulty) {
	var binary_hash = hex2bin(hash)
	for (var i = 0; i < binary_hash.length; i++) {
		if (binary_hash[i] !== '0') {
			break
		}
	}
	return i === difficulty
}

module.exports.mine = mine
module.exports.hash = hash
module.exports.isValidHashDifficulty = isValidHashDifficulty
