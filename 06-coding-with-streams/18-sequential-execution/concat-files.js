import { createWriteStream, createReadStream } from 'fs'
import { Readable, Transform, pipeline as pl } from 'stream'
import { promisify } from 'util';
let pipeline = promisify(pl);

export function concatFiles (dest, files) {
  return new Promise((resolve, reject) => {
    const destStream = createWriteStream(dest)
    Readable.from(files) // ①
      .pipe(new Transform({ // ②
        objectMode: true,
        transform (filename, enc, done) {
          const src = createReadStream(filename)
          src.pipe(destStream, { end: false })
          src.on('error', done)
          src.on('end', done) // ③
        }
      }))
      .on('error', reject)
      .on('finish', () => { // ④
        destStream.end()
        resolve()
      })
  })
}

/**
 * Alternate method using pipeline
 */
export async function concatFiles2 (dest, files) {
  const destStream = createWriteStream(dest);
  const errors = [];

    files.forEach(async file => {
        try {
          let er = await pipeline(
            createReadStream(file),
            destStream
          )
          if (er) errors.push(er);
        }
        catch (er) {
          errors.push(er);
        }
    })

    if (errors.length) throw Error(errors)
}
