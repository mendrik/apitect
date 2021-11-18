import { AnyZodObject, ZodDefault, ZodTypeAny } from 'zod'
import { TypeOf } from 'zod/lib/types'

const objectHandler = (zodRef: AnyZodObject): Record<string, ZodTypeAny> =>
  Object.keys(zodRef.shape).reduce((carry, key) => {
    const res = generateDefaults<ZodTypeAny>(zodRef.shape[key])
    return {
      ...carry,
      ...(res ? { [key]: res } : {})
    }
  }, {} as Record<string, ZodTypeAny>)

export const generateDefaults = <T extends ZodTypeAny>(zodRef: T): TypeOf<typeof zodRef> => {
  const typeName = zodRef._def.typeName
  if (/ZodObject|ZodRecord/.test(typeName)) {
    return objectHandler(zodRef as any)
  } else if (/ZodDefault/.test(typeName)) {
    return (zodRef as any as ZodDefault<T>)._def.defaultValue()
  }
  return undefined
}
