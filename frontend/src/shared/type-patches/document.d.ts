interface Document {
  caretPositionFromPoint: (x: number, y: number) => { offset: number }
}
