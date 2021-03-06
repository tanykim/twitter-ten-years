import time_converter
import processor
import file_writer

def save_profile(my_info):
    profile = dict(
        signed_up_at=str(my_info['created_at']),
        followers=my_info['followers_count'],
        following=my_info['friends_count'],
        last_status_id=my_info['status'].__dict__['id'],
        screen_name=my_info['screen_name']
        )
    file_writer.write_json('profile', profile, True)

def main(tweets):
    new_time_list = time_converter.main(tweets)
    tweets_minimized = processor.minimized_tweets(new_time_list, tweets)
    tweets_by_month = processor.get_tweets_by_month(tweets_minimized)
    friends = processor.get_mentioned_users(new_time_list, tweets)
    friends_network = processor.get_friends_network(tweets, friends)
    flow_data = processor.get_flow_data(friends, friends_network)
    # print (flow_data)

    final_data = dict(tweets=tweets_minimized, friends=friends, tweets_by_month=tweets_by_month, flow_data=flow_data)
    print('--Saving FINAL JSON files')
    for k in final_data:
        file_writer.write_json(k, final_data[k], True)
