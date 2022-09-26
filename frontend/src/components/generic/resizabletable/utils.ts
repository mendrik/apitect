import { pipe, propOr, take, zipWith } from 'ramda'
import { mapIndexed } from 'ramda-adjunct'
import { ArgFn, Fn, Width } from '~shared/types/generic'

export const setColumnWidths = (
  el: HTMLDivElement,
  colCount: number,
  widthFn: ArgFn<Width, string>
) =>
  pipe(
    take(colCount - 1), // leave last column as buffer
    zipWith(propOr(100, 'clientWidth')) as Fn<[HTMLDivElement, number][]>,
    mapIndexed(([el, w], idx) => {
      el.style.setProperty(`--col-width-${idx}`, widthFn(w))
    })
  )(Array.from(el.children))
