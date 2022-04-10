## Nitter Wrapper

This is just a simple quickly-made React Native Android-only app that allows people to deep link Twitter links to [Nitter](https://nitter.net/about). 

You can't use this to visit Nitter directly - it'd be easier to use a normal browser if you're making a conscious choice to use Nitter. This is a set-it-and-forget-t app that you never open explicitly. While you browse (Reddit, Googling, etc), twitter links you click will automatically be deep linked to this app and converted to Nitter links. Once you press the physical back button on your Android session, you'll be sent straight back to your previous app; your flow is not interrupted.

If the need be, you can also share Twitter links to this app to view them in Nitter. 

It's simple and rough around the edges, but it works :)

## Getting the APK

Clone, `npm install`, then `npm run makeDebugApk` to get an apk (uses default debug keystore).

The apk will be at `android/app/build/outputs/apk/release/app-release.apk`.

There are also apks to download in the GitHub releases section. 


## On iOS? 

This is Android only; if you want to make it for iOS too, you'll have to go through the libraries I used and follow their iOS installation instructions, and also do pod installations.
