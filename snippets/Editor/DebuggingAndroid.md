## Debugging on Android

So you've build your game on your android device and looking for a way to debug it through your terminal ?
If you're using Unity with android, you must have already installed adb through Android SDK.
Given that , the process is as easy as pasting this one-liner

#### Paste this command in your terminal

```c#
 adb logcat -s Unity ActivityManager PackageManager dalvikvm DEBUG
```


#### Explanation
Make sure your run this command while running the game on the Android, still connected via USB to the computer
(note that The information displayed is filtered)
