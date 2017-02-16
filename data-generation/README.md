# Data Generation

## Analysis Process

## 1. Download Twitter Archive
Request to download Twitter archive on your twitter Account page, then move all js files (YYYY-MM.js)
under `tweetws` folder.

This is the basic material that you need, because Twitter API allows to obtain the latest 3200 tweets.

## 2. Be ready for Twitter APIs

API is used to retreive Profile and new tweets (generated after the archive is downloaded).

This analysis is based on a Python Twitter API libary [Tweepy](https://github.com/tweepy/tweepy).

### Get Credentials

Aquire Twitter API credentials from the [developer site](https://dev.twitter.com).

Then update ```settings.local``` file. Then copy the setting file into json format.

```
cp settings.local settings.json
```

## 3. Run Code

Run ```__init__.py``` multiple times.

### 1) First Run - Extract basic info from the downloaded Twitter archive

Running the script for the first time generates an object with basic tweets info and saves it as ```tweets_from_file.json```.
This is a necessary step because the tweets from the downloaded archives do not contain all the details of each tweet that is available from the REST API. We extract the IDs of each tweet, and use it for the text

### 2) Second Run - Get detailed info of downloaded tweets

Harnessing Twitter APIs, now we're getting all the detail information (status of retweet, favorite, quote, and language, time upto h/m/s, and etc). If you have too many tweets, you may exceed the API call limit. See the comments in ```status_lookup.py``` - you may need to manually change the code in order to retrieve data within the limit. At the end you'll have a quite sizable ```tweets_updated.json``` file depending on the number of tweets.

### 3) Third Run - Call newer tweets

After you download the archive, you may have tweeted. The third run allows you to download newer tweets by calling the API.

### 4) Fourth Run - Save files in the desired format

Once you have all updated tweets data, it's time to have all the final files ready for the web app. This includes converting the field "created_at" to the correct timezone. The timezone info shoudl be specified in ```locations.json``` file. Then we generate the final ```tweets.json``` and ```friends.json``` files.
