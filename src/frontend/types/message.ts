type Tag = 'HELLO' | 'BYE'

interface MessageMap {
  HELLO: {
    message: string
  }
  BYE: {
    test: boolean
  }
}

export type Message<U extends Tag = any> = { type: U } & MessageMap[U]
