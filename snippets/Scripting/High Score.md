## High Score

Save and retrieve  High Score

```c#
private void ScoreManager(int score)
   {

       if (PlayerPrefs.HasKey("highscore"))
       {
           if (PlayerPrefs.GetInt("highscore") <= score)
           {
               PlayerPrefs.SetInt("highscore", score);
           }
           return
       }
       PlayerPrefs.SetInt("highscore", score);
   }
   //to retrieve high score , simply execute this line :
   PlayerPrefs.GetInt("highscore");
```

#### Explanation
Using PlayerPrefs ,  ScoreManager compares current score(int format) to highscore value found in PlayerPrefs
