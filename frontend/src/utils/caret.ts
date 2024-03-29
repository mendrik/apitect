export const getCaretPosition = (x: number, y: number): number => {
  if ('caretRangeFromPoint' in document) {
    const range = window.document.caretRangeFromPoint(x, y)
    return range?.startOffset ?? 0
  } else if ('caretPositionFromPoint' in document) {
    const range = window.document.caretPositionFromPoint(x, y)
    return range?.offset ?? 0
  } else {
    return 0
  }
}
