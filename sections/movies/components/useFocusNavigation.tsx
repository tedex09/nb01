// components/MovieCarousel/useFocusNavigation.ts
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'

export function useFocusNavigation(key: string, onFocus?: () => void) {
  const { ref, focusKey, focusSelf, hasFocusedChild } = useFocusable({
    focusKey: key,
    trackChildren: true,
    onFocus,
  })

  return { ref, focusKey, focusSelf, hasFocusedChild }
}
