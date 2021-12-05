export const getStack = (e: Error) => '\n' + e.stack?.split('\n').slice(1).join('\n')
