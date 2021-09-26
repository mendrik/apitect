import React, { createContext, Dispatch, FC, SetStateAction, useState } from 'react'

type ProgressContext = {
  working: boolean
  setWorking: Dispatch<SetStateAction<boolean>>
}

export const progressContext = createContext<ProgressContext>({
  working: false,
  setWorking: () => void 0
})

export const WithProgress: FC = ({ children }) => {
  const [working, setWorking] = useState(false)
  return (
    <progressContext.Provider value={{ working, setWorking }}>{children}</progressContext.Provider>
  )
}
