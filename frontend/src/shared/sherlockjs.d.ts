declare module 'sherlockjs' {
  export function parse(input: string): {
    eventTitle?: string
    startDate: Date | null
    endDate: Date | null
    isAllDay: boolean
    validated: boolean
  }
}
