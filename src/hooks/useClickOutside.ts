import React, { useEffect } from "react";

/**
 * Execute a function if the element clicked is not inside of the element referenced
 *
 * @param handler
 * @param elementRef
 * @param ignoreElementRef
 * @returns the elementRef
 */
export function useClickOutside(
  handler: () => void,
  elementRef: React.MutableRefObject<any>,
  ignoreElementRef?: React.MutableRefObject<any>
): React.MutableRefObject<any> {
  useEffect(() => {
    document.addEventListener('click', e => {
      const clickedElement = e.target as HTMLElement;

      if (ignoreElementRef) {
        if (!elementRef.current?.contains(clickedElement) && clickedElement !== ignoreElementRef.current) {
          handler()
        }

        return elementRef.current
      }

      if (!elementRef.current?.contains(clickedElement)) {
        handler()
      }
    })

    return () => document.removeEventListener('click', () => {})
  }, [])

  return elementRef.current
}