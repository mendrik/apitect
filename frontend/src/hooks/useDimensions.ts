import { MutableRefObject, useLayoutEffect, useState } from 'react'

import { Maybe } from '../shared/types/generic'

export const useDimensions = <T extends HTMLElement>(
  node: MutableRefObject<T | null>
): Maybe<DOMRect> => {
  const [rect, setRect] = useState<Maybe<DOMRect>>()
  useLayoutEffect(() => {
    if (node.current != null) {
      setRect(node.current?.getBoundingClientRect?.())
    }
  }, [node])
  return rect
}
