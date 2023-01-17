fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## iOS

### ios connect_to_app_store

```sh
[bundle exec] fastlane ios connect_to_app_store
```

connect to App store api

### ios build

```sh
[bundle exec] fastlane ios build
```

Build the iOS application.

### ios beta

```sh
[bundle exec] fastlane ios beta
```

Ship to Testflight.

----


## Android

### android beta

```sh
[bundle exec] fastlane android beta
```

Android build and release to beta

### android validate

```sh
[bundle exec] fastlane android validate
```



----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
