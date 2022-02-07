import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'

const algorithm = 'aes-256-cbc'
const iv = randomBytes(16)

export const encrypt = (text: string, key: Buffer): string => {
  const cipher = createCipheriv(algorithm, Buffer.from(key), iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return encrypted.toString('hex')
}

export const decrypt = (text: string, key: Buffer): string => {
  const decipher = createDecipheriv(algorithm, Buffer.from(key), iv)
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8')
}
