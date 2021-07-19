
import {RefObject, useState, useEffect} from 'react'

type ScaleOpts = {
  direction: 'up' | 'down'
  interval: number
}

const MIN_SCALE = 0.5
const MAX_SCALE = 3

/**
 * Listen for `wheel` events on the given element ref and update the reported
 * scale state, accordingly.
 */
export const useScale = (ref: RefObject<HTMLElement | null>) => {
  const [scale, setScale] = useState(1)

  const updateScale = ({direction, interval}: ScaleOpts) => {
    setScale(currentScale => {
      let scale: number

      // Adjust up to or down to the maximum or minimum scale levels by `interval`.
      if (direction === 'up' && currentScale + interval < MAX_SCALE) {
        scale = currentScale + interval
      } else if (direction === 'up') {
        scale = MAX_SCALE
      } else if (direction === 'down' && currentScale - interval > MIN_SCALE) {
        scale = currentScale - interval
      } else if (direction === 'down') {
        scale = MIN_SCALE
      } else {
        scale = currentScale
      }

      return scale
    })
  }

  // Set up an event listener such that on `wheel`, we call `updateScale`.
  useEventListener(ref, 'wheel', e => {
    e.preventDefault()

    updateScale({
      direction: e.deltaY > 0 ? 'up' : 'down',
      interval: 0.1
    })
  })

  return scale
}


export function useEventListener<
  K extends keyof GlobalEventHandlersEventMap
>(
  ref: RefObject<HTMLElement | null>,
  event: K,
  listener: (event: GlobalEventHandlersEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    const listenerWrapper = ((e: GlobalEventHandlersEventMap[K]) =>
      listener(e)) as EventListener

    node.addEventListener(event, listenerWrapper, options)

    return () => node.removeEventListener(event, listenerWrapper)
  }, [ref, event, listener, options])
}