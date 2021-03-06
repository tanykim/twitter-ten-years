import processor

def get_timeline(api, max_id):
    return api.user_timeline(count=200, trim_user=1, max_id=max_id)

def call_API(api, since_id, max_id, tweets):
    statuses = get_timeline(api, max_id)
    print ('max id', max_id, since_id)
    for obj in statuses:
        s = obj.__dict__
        max_id = s['id_str']
        if int(max_id) > int(since_id):
            tweet = processor.get_tweet_data(s, True)
            tweets.append(tweet)

    if max_id is not None and int(max_id) < int(since_id):
        print ('---------done')
        return tweets
    else:
        return call_API(api, since_id, max_id, tweets)

def main(api, since_id):
    return call_API(api, since_id, None, [])