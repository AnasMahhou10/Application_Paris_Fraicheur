// client/src/hooks/useDebounce.js
import { useCallback } from 'react';
import debounce from 'lodash.debounce';

export function useDebounce(callback, delay) {
  return useCallback(debounce(callback, delay), [callback, delay]);
}