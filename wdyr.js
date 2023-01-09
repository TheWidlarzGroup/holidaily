import React from 'react'
import whyDidYouRender from '@welldone-software/why-did-you-render'

if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: false, // enable when testing
    trackHooks: false, // enable when testing !IMPORTANT: ENABLED CAUSING CRASH IN LOGOUT!
  })
}
