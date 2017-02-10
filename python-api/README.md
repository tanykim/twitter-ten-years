# Data Analytics

## Analysis Process

Download Twitter archive, then move all js files (YYYY-MM.js) under `tweetws` folder.

## Twitter API

API is used to retreive Profile and new tweets (generated after the archive is downloaded).
This analysis is based on a Python Twitter API libary [Tweepy](https://github.com/tweepy/tweepy).

## Get Credentials
Aquire Twitter API credentials from the [developer site](https://dev.twitter.com).
Then update ```settings.local``` file. Then copy the setting file into json format.

```
cp settings.local settings.json
```

## Run code
Run ```__init__.py```
