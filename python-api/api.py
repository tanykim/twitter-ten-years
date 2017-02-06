from bs4 import BeautifulSoup
import tweepy
import json
import os
import datetime

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

# data objects
tweets = []
mentioned_users = {}

# profile; always update
my_info = api.me()
my_info = my_info.__dict__
last_status_id = my_info['status'].__dict__['id']
signed_up_at = str(my_info['created_at'])
profile = dict(
    signed_up_at=signed_up_at,
    followers=my_info['followers_count'],
    following=my_info['friends_count'],
    last_status_id=last_status_id
    )
print (profile)
#call timeline API to get tweet info

# get mentioned user per status
def getMentionedUser(users, created_at, status_id):
    results = []
    for u in users:
        user_id = u['id']
        results.append(user_id)
        mention = dict(at=created_at, id=status_id)

        # add the general mentioned user list
        if user_id in mentioned_users.keys():
            loc = len(mentioned_users[user_id]['mentions'])
            for idx, obj in enumerate(mentioned_users[user_id]['mentions']):
                if (status_id > obj['id']):
                    loc = idx
                    break
            mentioned_users[user_id]['mentions'].insert(loc, mention)

        else:
            mentioned_users[user_id] = dict(
                mentions=[mention],
                screen_name=u['screen_name'],
                name=u['name'],
                user_id=u['id']
                )
    return results

def getTimeine(since_id, max_id, current_call_count, is_newer):
    statuses = api.user_timeline(count=200, trim_user=1, since_id=since_id, max_id=max_id)
    print (since_id, max_id, current_call_count, len(statuses))
    if statuses:
        for idx, obj in enumerate(statuses):
            s = obj.__dict__
            created_at = str(s['created_at'])
            text = s['text']
            mentions = s['entities']['user_mentions']
            media = 'none'
            is_retweet = False
            is_quote = False
            if 'media' in s['entities'].keys():
                media = list(map(lambda x: str(x['type']), s['entities']['media']))
            if 'retweeted_status' in s.keys():
                is_retweet = True
            if 'quoted_status' in s.keys():
                is_quote = True
            max_id = s['id']
            tweet = dict(created_at=created_at,
                         id=max_id,
                         text=text,
                         mention_to=getMentionedUser(mentions, created_at, max_id) if mentions else [],
                         retweet_count=s['retweet_count'],
                         favorite_count=s['favorite_count'],
                         lang=s['lang'],
                         source=str(BeautifulSoup(s['source'], 'html.parser')),
                         media=media,
                         is_retweet=is_retweet,
                         is_quote=is_quote
                         )
            if (is_newer):
                tweets.insert(current_call_count * idx, tweet)
            else:
                tweets.append(tweet)

        #keep calling API to the new ids
        #Currently get the data from year 2016
        base_time_obj = datetime.datetime.strptime('2015-12-31 23:59:59', '%Y-%m-%d %H:%M:%S')
        tweet_time_obj = datetime.datetime.strptime(created_at, '%Y-%m-%d %H:%M:%S')
        is_first_taken = tweet_time_obj < base_time_obj
        is_all_new_taken = (is_newer and max_id <= since_id)
        print (is_first_taken, is_all_new_taken)

        if not is_first_taken or is_all_new_taken:
            current_call_count += 1
            getTimeine(since_id, max_id - 1, current_call_count, is_newer)


# open previously generated data
hasFile = os.path.isfile('dataset.json')
if (hasFile):
    with open('dataset.json', encoding='utf-8') as data_file:
        previous_data = json.loads(data_file.read())

    if (previous_data['tweets']):
        since_id = previous_data['tweets'][0]['id']
        # write data objects from the loaded file
        tweets = previous_data['tweets']
        mentioned_users = previous_data['mentioned_users']
        # new tweets exists
        print ('---current count of tweets', len(previous_data['tweets']))
        if last_status_id > since_id:
            print ('---------getting new tweets onto')
            getTimeine(since_id, None, 1, True)
else:
    getTimeine(None, None, 1, False)

#save dataset as JSON format
final_data = dict(profile=profile,
                  tweets=tweets,
                  mentioned_users=mentioned_users
                  )

fd = open('dataset.json', 'w', encoding='utf8')
json_data = json.dumps(final_data, separators=(',',':'), indent=2, ensure_ascii=False)
fd.write(json_data)
fd.close()