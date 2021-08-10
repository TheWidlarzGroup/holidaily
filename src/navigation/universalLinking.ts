const config = {
  screens: {
    ConfirmedAccount: '/confirm/:token',
    RecoveryCode: '/password_reset/:code',
    RequestVacation: '/request_vacation',
    SignupWithCode: '/signup/:code',
    DrawerNavigator: {
      screens: {
        Home: {
          screens: {
            Stats: '/requests',
            DashboardNavigation: {
              screens: {
                Dashboard: '/dashboard',
                // DashboardTeam: '/team:id',
              },
            },
          },
        },
      },
    },
  },
}

export const linking = {
  prefixes: ['https://holidaily.danielgrychtol.com', 'holidaily://'],
  config,
}
