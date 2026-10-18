import { mkdir, writeFile } from 'node:fs/promises'
import { ImageResponse } from 'next/og'
import { BrandAppIcon } from '../src/components/BrandIcon'

async function generateIcons() {
  await mkdir('public/brand', { recursive: true })
  for (const size of [192, 512, 1024]) {
    const response = new ImageResponse(<BrandAppIcon size={size} />, { width: size, height: size })
    await writeFile(`public/brand/niti-app-icon-${size}.png`, Buffer.from(await response.arrayBuffer()))
    console.log(`Generated ${size} × ${size} book icon`)
  }
  // ICO embeds the same vector-derived PNG artwork at common browser sizes.
  const sizes = [16, 32, 48]
  const images = await Promise.all(sizes.map(async size => {
    const response = new ImageResponse(<BrandAppIcon size={size} />, { width: size, height: size })
    return Buffer.from(await response.arrayBuffer())
  }))
  const directory = Buffer.alloc(6 + sizes.length * 16)
  directory.writeUInt16LE(1, 2)
  directory.writeUInt16LE(sizes.length, 4)
  let offset = directory.length
  sizes.forEach((size, index) => {
    const entry = 6 + index * 16
    directory[entry] = size
    directory[entry + 1] = size
    directory.writeUInt16LE(1, entry + 4)
    directory.writeUInt16LE(32, entry + 6)
    directory.writeUInt32LE(images[index].length, entry + 8)
    directory.writeUInt32LE(offset, entry + 12)
    offset += images[index].length
  })
  await writeFile('src/app/favicon.ico', Buffer.concat([directory, ...images]))
  console.log('Generated multi-size favicon.ico')
}

generateIcons().catch(error => { console.error(error); process.exitCode = 1 })
import * as React from 'react'
