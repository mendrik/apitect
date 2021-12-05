export type TypeEqual<T, U> = T extends U ? (U extends T ? true : false) : false
