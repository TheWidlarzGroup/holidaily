import { NavigationState, PartialState, useNavigationState } from '@react-navigation/native'

export function useGetActiveRouteName(): string {
  const navState = useNavigationState((state) => state)

  const getRouteName = (state: NavigationState | PartialState<NavigationState>): string => {
    if (state.index === undefined || state.index === null) return ''
    const route = state?.routes[state.index]
    if (!route?.state) return route?.name || ''
    return getRouteName(route.state)
  }
  return getRouteName(navState)
}
