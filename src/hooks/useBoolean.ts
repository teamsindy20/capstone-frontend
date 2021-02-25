import { useCallback, useState } from 'react'

function useBoolean(): readonly [boolean | undefined, () => void, () => void, () => void]
function useBoolean(initialValue: boolean): readonly [boolean, () => void, () => void, () => void]

function useBoolean(initialValue?: boolean) {
  const [state, setState] = useState(initialValue)

  const toggleState = useCallback(() => {
    setState((prev) => !prev)
  }, [])

  const setTrue = useCallback(() => {
    setState(true)
  }, [])

  const setFalse = useCallback(() => {
    setState(false)
  }, [])

  return [state, toggleState, setTrue, setFalse] as const
}

export default useBoolean
