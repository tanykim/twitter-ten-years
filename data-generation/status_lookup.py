import processor
import itertools
import math
import file_writer
import json

def call_API(api, ids):
    statuses = api.statuses_lookup(id_=ids, trim_user=1)
    tweets_by_call = []
    for obj in statuses:
        s = obj.__dict__['_json']
        # tweet = processor.get_tweet_data_from_api(s)
        # tweets_by_call.append(tweet)
        tweets_by_call.append(s)
    tweets_by_call.sort(key=lambda x: x['id'], reverse=True)
    return tweets_by_call

def update_tweeets_info(api, data, call_limit, tweet_limit):

    print ('--updating tweet with full info from API', len(data))
    tweets = []

    for i in list(range(call_limit)):
        print ('API call range', i * tweet_limit, (i + 1) * tweet_limit)
        subset = data[i * tweet_limit: (i + 1) * tweet_limit]

        ids = [x['id'] for x in subset]

        if len(ids) > 0:
            print( 'API lookup', i, subset[0]['created_at'] )
            tweets_by_call = call_API(api, ids)
            if len(tweets_by_call) is 0:
                break
            tweets.append(tweets_by_call)

    return list(itertools.chain(*tweets))

def main(api, source):

    call_limit = 50
    tweet_limit = 100
    max_tweets = call_limit * tweet_limit

    # IDEALLY, needed call count is decided below. However there's API call limit,
    # Thus, set this 1 and increase start id manually one by one until you reach the last tweet
    # needed_call_count = math.ceil(len(source) / max_tweets)

    needed_call_count = 1
    start_id = 19
    #one less in start_id 2, 5

    all_tweets = []
    for i in list(range(needed_call_count)):
        start_data_id = (i + start_id) * max_tweets
        end_data_id = start_data_id + max_tweets
        print ('BUNCH CALL RANGE', start_data_id, end_data_id, len( source[start_data_id: end_data_id]))
        tweets = update_tweeets_info(api, source[start_data_id: end_data_id], call_limit, tweet_limit)
        all_tweets.append(tweets)

    all_tweets_list = list(itertools.chain(*all_tweets))

    print ('--updated ', len(all_tweets_list), 'tweets')

    file_writer.write_json('from_api/' + str(call_limit * tweet_limit * (start_id + 1)), all_tweets_list)

    # if start_id > 0:
    #     with open('output/tweets_updated.json', encoding='utf-8') as data_file:
    #         previous_data = json.loads(data_file.read())
    #         for t in all_tweets_list:
    #             previous_data.append(t)
    #         file_writer.write_json('tweets_updated', previous_data)
    #         print ('--wrote', len(previous_data), 'tweets done with', start_id)
    # else:
    #     file_writer.write_json('tweets_updated', all_tweets_list)
