# hash-miner-js

A quick library to mine for a hash (SHA-256) with a given difficulty

---

## Installation:

```
npm install --save hash-miner
```

---

## General Usage:

```javascript
const { mine } = require('hash-miner');
const data = mine({ foo: 'bar' }, 16);
{
		hash: '00008bda8cbf4538a...', // the hex representation of the hash.
		binary_string: '000000000000000010001...', // the raw binary data as a string
		nonce: 678732, // the nonce used to get the correct difficulty
		data: { foo: 'bar' }, // the data hashed
		time_ms: 20263, // how long the mining took in miliseconds
		difficulty: 16, // the required difficulty (number of 0s)
		data_type: 'object' // the type of the data that was mined
}
```

---

## How difficulty works:

A hash is valid when it's binary representation contains a certain number of 0s at the begining. So the hex `04a3` represented in binary is `0000010010100011`. The difficulty calculated in this hex is 5, and if the target difficulty isn't 5, another hash will be generated with a new nonce until the correct difficulty is reached.
