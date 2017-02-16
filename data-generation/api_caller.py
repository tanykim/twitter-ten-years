import processor

def get_timeline(api, max_id):
    return api.user_timeline(count=200, trim_user=1, max_id=max_id)

def call_API(api, since_id, max_id, tweets):
    statuses = get_timeline(api, max_id)
    print (len(statuses))
    for obj in statuses:
        s = obj.__dict__
        max_id = s['id']
        if max_id > since_id:
            tweet = processor.get_tweet_data_from_api(s)
            tweets.append(tweet)

    if max_id is not None and max_id < since_id:
        print ('---------done')
        return tweets
    else:
        return call_API(api, since_id, max_id, tweets)

def main(api, since_id):
    return call_API(api, since_id, None, [])