import itertools
import file_writer

def call_API(api, ids):
    statuses = api.statuses_lookup(id_=ids, trim_user=1)
    tweets_by_call = []
    for obj in statuses:
        s = obj.__dict__['_json']
        tweets_by_call.append(s)
    tweets_by_call.sort(key=lambda x: x['id'], reverse=True)
    return tweets_by_call

def update_tweeets_info(api, data, call_limit, tweet_limit):

    print ('--updating tweet with full info from API', len(data))
    tweets = []

    for i in list(range(call_limit)):
        subset = data[i * tweet_limit: (i + 1) * tweet_limit]
        ids = [x['id'] for x in subset]
        if len(ids) > 0:
            tweets_by_call = call_API(api, ids)
            if len(tweets_by_call) is 0:
                break
            print ('API lookup', i, subset[0]['created_at'], len(tweets_by_call))
            tweets.append(tweets_by_call)

    return list(itertools.chain(*tweets))

def main(api, source, start_id):

    call_limit = 50
    tweet_limit = 100
    max_tweets = call_limit * tweet_limit

    all_tweets = []
    start_data_id = start_id * max_tweets
    end_data_id = start_data_id + max_tweets
    print ('BUNCH CALL RANGE', start_data_id, end_data_id, len(source[start_data_id: end_data_id]))

    tweets = update_tweeets_info(api, source[start_data_id: end_data_id], call_limit, tweet_limit)
    all_tweets.append(tweets)

    all_tweets_list = list(itertools.chain(*all_tweets))
    print ('--updated ', start_id, len(all_tweets_list), 'tweets', all_tweets_list[0]['id'], all_tweets_list[len(all_tweets_list) - 1]['id'])

    file_writer.write_json('from_api/' + start_id, all_tweets_list)