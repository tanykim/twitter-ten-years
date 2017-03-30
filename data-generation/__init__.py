import tweepy
import json
import datetime

import list_tweet_ids
import status_lookup
import process_tweets_from_files
import api_caller
import file_writer
import finalize

# steps: this must be done step by step
# 0 - list tweet ids from downloaded files - save as tweets_from_file.json
# 1 - get tweet info via APIs. Save raw data.
# 2 - merge and process all tweets make tweets_updated file from step 1.
# 3 - get new tweets via API, process and append them to the result of 2.
# 4 - already get new tweets, just finalize

current = 2

# Twitter credentials
with open('settings.json', encoding='utf-8') as setting_file:
    setting = json.loads(setting_file.read())
    consumer_key = setting['consumer_key']
    consumer_secret = setting['consumer_secret']
    access_token = setting['access_token']
    access_token_secret = setting['access_token_secret']
    owner_id = setting['owner_id']

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

if current == 0:
    list_tweet_ids.main()

elif current == 1:
    with open('output/tweets_id_from_file.json', encoding='utf-8') as data_file:
        tweets = json.loads(data_file.read())
        # start_id should be manually increased after each run due to API limit:
        # incease upto total tweet counts / 5000 (number of tweets received by a bunch of calls)
        # one less in start_id 2, 5
        start_id = 2
        status_lookup.main(api, tweets, start_id)

elif current == 2:
    process_tweets_from_files.main()

elif current == 3:
    my_info = api.me()
    my_info = my_info.__dict__
    last_status_id = my_info['status'].__dict__['id']

    after_10_years = my_info['created_at'] + datetime.timedelta(days=365 * 10 + 3)
    print (after_10_years)

    with open('output/tweets_updated.json', encoding='utf-8') as data_file:
        previous_data = json.loads(data_file.read())
        print ('lasted saved tweet', previous_data[0])
        # if new tweets exist, get upto 10 years from sign-up
        if int(previous_data[0]['id']) < int(last_status_id) and datetime.datetime.now() < after_10_years:
            new_tweets = api_caller.main(api, previous_data[0]['id'])
            if len(new_tweets) > 0:
                for i, v in enumerate(new_tweets):
                    previous_data.insert(i, v)
                file_writer.save_process(previous_data)
        else:
            print ('--All saved tweets are updated, now finalizing.. please wait')
            finalize.save_profile(my_info)
            finalize.main(previous_data)

elif current == 4:
    print ('---finalizing data')
    with open('output/tweets_updated.json', encoding='utf-8') as data_file:
        previous_data = json.loads(data_file.read())
        finalize.main(previous_data)

