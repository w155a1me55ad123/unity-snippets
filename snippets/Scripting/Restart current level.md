## Restart Current Level

Using SceneManagement , easily reload the current active scene

```c#
//on top of the file , add this line :
using UnityEngine.SceneManagement;
//call this whenever you want to restart  :
SceneManager.LoadScene(SceneManager.GetActiveScene().name)
```
