import tweepy
import json
import os
import js_reader
import api_caller
import file_writer
# import status_lookup
import time_converter
import processor
from datetime import datetime

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

# profile; always update
my_info = api.me()
my_info = my_info.__dict__
last_status_id = my_info['status'].__dict__['id']
signed_up_at = str(my_info['created_at'])

profile = dict(
    signed_up_at=signed_up_at,
    followers=my_info['followers_count'],
    following=my_info['friends_count'],
    last_status_id=last_status_id,
    screen_name=my_info['screen_name']
    )
print ('---successully recieved profile data', profile)
file_writer.write_json('profile', profile)

def finalize(tweets):
    new_time_list = time_converter.main(tweets)
    tweets_minimized = processor.minimized_tweets(new_time_list, tweets)
    friends = processor.get_mentioned_users(new_time_list, tweets)
    final_data = dict(tweets=tweets_minimized, friends=friends)

    print ('--Saving FINAL JSON files')
    for k in final_data:
        file_writer.write_json(k, final_data[k])

def save_process(tweets):
    # mentioned_users = processor.get_mentioned_users(tweets)
    status=dict(generated_at=str(datetime.now()), last_status_id=tweets[0]['id'], tweet_count=len(tweets))

    # save dataset as JSON format
    midterm_data = dict(tweets_updated=tweets,
                      status=status)

    print ('--Saving updated JSON files')
    for k in midterm_data:
        file_writer.write_json(k, midterm_data[k])

def merge_tweets(data):
    print ('--adding new data to the existing file')
    with open('output/tweets_updated.json', encoding='utf-8') as data_file:
        previous_data = json.loads(data_file.read())

        for i, v in enumerate(data):
            previous_data.insert(i, v)
        save_process(previous_data)

def update_previous_data():
    # open previously generated data
    with open('output/tweets_updated.json', encoding='utf-8') as data_file:
        previous_data = json.loads(data_file.read())
        # if new tweets exist
        if previous_data[0]['id'] < last_status_id:
            # Call API
            print ('--New Tweets exist, API call needed')
            new_tweets = api_caller.main(api, previous_data[0]['id'])
            if len(new_tweets) > 0:
                merge_tweets(new_tweets)

        else:
            print ('--All saved tweets are updated, now finalize')
            finalize(previous_data)


#check if dastaset exists
print ('--checking dataset already exists')
has_file = os.path.isfile('output/status.json')

if has_file:
    print ('--final dataset exists, now updating previous data')
    update_previous_data()
else:
    print ('--final dataset does NOT exist')

    # open previously generated data
    tweets = []
    # start_id = 0
    if os.path.isfile('output/tweets_from_file.json'):
        print ('--initial tweets from file exist')
        with open('output/tweets_from_file.json', encoding='utf-8') as data_file:
            tweets = json.loads(data_file.read())
    else:
        print ('--create initial tweets dataset from files')
        tweets = js_reader.main()
        file_writer.write_json('tweets_from_file', tweets)

    # Get twitter status info from the initial tweet ID object
    # comment out the next lines after each data point is complete
    # status_lookup.main(api, tweets)
    with open('output/tweets_updated.json', encoding='utf-8') as data_file:
        previous_data = json.loads(data_file.read())
        save_process(previous_data)