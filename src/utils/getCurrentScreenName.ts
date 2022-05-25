export const getCurrentScreenName = (previousRoute: any, currentRoute: any): string | undefined => {
  // TODO: Fix types
  const currentRouteName = currentRoute.current.getCurrentRoute()
  if (previousRoute !== currentRouteName && currentRouteName) {
    return currentRouteName.name as string
  }
  previousRoute.current = currentRouteName
  return undefined
}
