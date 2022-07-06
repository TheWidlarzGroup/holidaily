const config = {
  screens: {
    ConfirmedAccount: '/confirm/:token',
    RecoveryCode: '/password_reset/:code',
    RequestVacation: '/request_vacation',
    SignupWithCode: '/signup/:code',
    DRAWER_NAVIGATOR: '/dashboard', // TODO: Test it when will be needed
    // DrawerNavigator: {
    //   screens: {
    //     Home: {
    //       screens: {
    //         Stats: '/requests',
    //         DashboardNavigation: {
    //           screens: {
    //             Dashboard: '/dashboard',
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
  },
}

export const linking = {
  prefixes: ['https://holidaily.danielgrychtol.com', 'holidaily://'],
  config,
}
