import fs from 'node:fs'
import { Readable } from 'node:stream'

async function downloadCsv() {
  const res = await fetch('http://localhost:3333/short-links/csv')

  if (!res.ok || !res.body) {
    console.error('Failed to fetch CSV', res.status, res.statusText)
    return
  }

  // Convert Web ReadableStream to Node Readable
  const nodeStream = Readable.fromWeb(res.body)

  const fileStream = fs.createWriteStream('./short-links.csv')

  await new Promise((resolve, reject) => {
    nodeStream.pipe(fileStream)
    nodeStream.on('error', reject)
    fileStream.on('finish', resolve)
    fileStream.on('error', reject)
  })

  console.log('CSV saved as short-links.csv')
}

downloadCsv()
