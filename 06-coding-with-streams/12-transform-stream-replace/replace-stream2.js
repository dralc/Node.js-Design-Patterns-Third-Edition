import { Transform } from 'stream'

export class ReplaceStream2 extends Transform {
  constructor (searchStr, replaceStr, options) {
    super({ ...options })
    this.searchStr = searchStr
    this.replaceStr = replaceStr
	this.buf = '';
  }

  _transform (chunk, encoding, callback) {
	const bufLen = this.searchStr.length - 1; // We just need to keep at most len-1 chars, otherwise it would've been replaced already
	let chunkPush = this.buf + chunk.toString();

	if ( RegExp(this.searchStr).test(chunkPush) ) {
		chunkPush = chunkPush.replace(this.searchStr, this.replaceStr);
		this.buf = '';
	} else {
		// Couldn't find a match, so keep a slice of the end of the buffer for the next iteration
		this.buf = chunkPush.slice(-bufLen);
		chunkPush = chunkPush.slice(0, -bufLen);
	}

	this.push(chunkPush);
    callback()
  }
}
