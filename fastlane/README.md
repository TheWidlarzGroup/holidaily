BEFORE ALL!

Copy your google-service-key.json to the ./android/app/ folder and rename it to the "holidaily-fastlane.json"
And create .env.default file in the fastlane/ folder.

# fastlane documentation

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew install fastlane`

# Available Actions
## iOS
### ios connect_to_app_store
```
fastlane ios connect_to_app_store
```
connect to App store api
### ios build
```
fastlane ios build
```
Build the iOS application.
### ios beta
```
fastlane ios beta
```
Ship to Testflight.

----

## Android
### android beta
```
fastlane android beta
```
Android build and release to beta

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
