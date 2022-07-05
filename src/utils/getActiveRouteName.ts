import { NavigationState, PartialState } from '@react-navigation/native'

export function getActiveRouteName(state: NavigationState | PartialState<NavigationState>): string {
  if (state.index === undefined || state.index === null) return ''
  const route = state?.routes[state.index]
  if (!route?.state) return route?.name || ''
  return getActiveRouteName(route.state)
}
