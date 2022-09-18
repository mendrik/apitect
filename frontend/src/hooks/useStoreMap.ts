import { Store } from 'effector'
import { useStore } from 'effector-react'

// this is a hack until effector fixes react 18
export const useStoreMap = <State, Result>(
  store: Store<State>,
  fn: (state: State) => Result
): Result => fn(useStore(store))
