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

### ios certificates

```sh
[bundle exec] fastlane ios certificates
```

Fetch certificates and provisioning profiles

### ios build

```sh
[bundle exec] fastlane ios build
```

Build the iOS application.

### ios build_and_release_to_testflight

```sh
[bundle exec] fastlane ios build_and_release_to_testflight
```

Ship to Testflight.

### ios build_and_release_to_app_store

```sh
[bundle exec] fastlane ios build_and_release_to_app_store
```

Ship to AppStore.

----


## Android

### android bump_build_version

```sh
[bundle exec] fastlane android bump_build_version
```

Bump build version

### android beta

```sh
[bundle exec] fastlane android beta
```

Android build and release to beta

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
