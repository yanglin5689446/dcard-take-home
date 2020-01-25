
import { useRef, useEffect } from 'react'

const usePrevious = (state) => {
  const ref = useRef(null)

  useEffect(() => {
    ref.current = state
  }, [state])

  return ref.current
}

export default usePrevious
