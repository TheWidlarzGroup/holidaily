const config = {
  screens: {
    ConfirmedAccount: '/confirm/:token',
    RecoveryCode: '/password_reset/:code',
  },
}

export const linking = {
  prefixes: ['https://holidaily.danielgrychtol.com', 'holidaily://open'],
  config,
}
