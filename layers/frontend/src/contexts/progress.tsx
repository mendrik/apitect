import React, { createContext, FC, useState } from 'react'

type ProgressContext = {
  isWorking: (progress: string) => boolean
  setWorking: (progress: string, state: boolean) => void
}

export const progressContext = createContext<ProgressContext>({
  isWorking: () => false,
  setWorking: () => void 0
})

export const WithProgress: FC = ({ children }) => {
  const [workMap, setWorkMap] = useState<Record<string, boolean>>({})
  return (
    <progressContext.Provider
      value={{
        isWorking: (progress: string): boolean => workMap[progress],
        setWorking: (progress: string, value: boolean) =>
          setWorkMap(state => ({ ...state, [progress]: value }))
      }}
    >
      {children}
    </progressContext.Provider>
  )
}
