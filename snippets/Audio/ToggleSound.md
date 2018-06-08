## Toggle Sound

Toggle Sound and save sound state.

```c#

public AudioSource sound;
void Start() {
  if (PlayerPrefs.HasKey("sound")) {
   checkSound()
  } else {
   sound.mute = false;
  }
}

void checkSound() {
 if (PlayerPrefs.GetInt("sound") == 0) {
  sound.mute = true;
 } else {
  sound.mute = false;
 }
}
public void ToggleSound() {
 if (PlayerPrefs.GetInt("sound") == 0) {
  PlayerPrefs.SetInt("sound", 1);
  sound.mute = false;
 } else {
  PlayerPrefs.SetInt("sound", 0);
  sound.mute = true;
 }
}

```



#### Explanation
First, we declare an AudioSource variable and set it to public to be visible in the unity editor.
On Start we check if the user has already muted the sound or not .
Calling ToggleSound will simply toggle the sound and save state.
