// From https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// > Feel free to copy paste it in your project or put it on npm.

import { useEffect, useRef } from 'react'

type VoidFn = () => void

export function useInterval(callback: VoidFn, delay: number) {
  const savedCallback = useRef<VoidFn>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
