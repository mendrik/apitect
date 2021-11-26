import { object, Schema, string } from 'zod'

export interface Tag {
  name: string
  parent?: string
}

export const ZTag: Schema<Tag> = object({
  name: string(),
  parent: string().optional()
})
