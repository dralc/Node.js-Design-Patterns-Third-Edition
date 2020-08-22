import { ReplaceStream } from './replace-stream.js'
import { ReplaceStream2 } from './replace-stream2.js'

const replaceStream = new ReplaceStream('World', 'Node.js')
replaceStream.on('data', chunk => console.log(chunk.toString()))

replaceStream.write('Hello W')
replaceStream.write('orld!')
replaceStream.write('Hello 2nd Wo')
replaceStream.write('rld!')
replaceStream.write('Hello another World!')
replaceStream.end()

console.log('----------')

const replaceStream2 = new ReplaceStream2('World', 'Node.js');
replaceStream2.on('data', chunk => console.log(chunk.toString()))
replaceStream2.write('Hello W')
replaceStream2.write('orld!')
replaceStream2.write('Hello 2nd Wo')
replaceStream2.write('rld!')
replaceStream2.write('Hello another World!')
replaceStream2.end()
