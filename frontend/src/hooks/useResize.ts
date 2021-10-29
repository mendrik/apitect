import { MutableRefObject, useLayoutEffect, useState } from 'react'

import { Maybe } from '../shared/types/generic'

export const useResize = (node: MutableRefObject<HTMLElement | null>): Maybe<DOMRect> => {
  const [rect, setRect] = useState<Maybe<DOMRect>>()
  useLayoutEffect(() => {
    if (node.current != null) {
      const ob = new ResizeObserver(() => {
        setRect(node.current?.getBoundingClientRect?.())
      })
      ob.observe(node.current)
      setRect(node.current?.getBoundingClientRect?.())
      return ob.unobserve(node.current)
    }
  }, [node])
  return rect
}
