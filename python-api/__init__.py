import tweepy
import json
import os
import js_reader
import api_caller

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

print (profile)

# open previously generated data
hasFile = os.path.isfile('output/status.json')

if hasFile:
    with open('output/status.json', encoding='utf-8') as data_file:
        previous_data = json.loads(data_file.read())
        if previous_data['last_status_id'] < last_status_id:
            # Call API
            print ('---Api call needed')
            new_tweets = api_caller.main(api, previous_data['last_status_id'])
            print (len(new_tweets))
else:
    js_reader.main()

