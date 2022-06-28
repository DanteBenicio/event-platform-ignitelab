import { Dispatch, SetStateAction, useCallback, useState } from "react"

export function useLocalStorage<S>(key: string, initialValue?: string): [S, Dispatch<SetStateAction<S>>] {
  const [storage, setStorageValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  })

  const setStorage = useCallback((value: any) => {
    try {
      setStorageValue(value);

      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error)
    }
  }, [key]);

  return [storage, setStorage]
}