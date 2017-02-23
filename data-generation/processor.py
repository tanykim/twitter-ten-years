from bs4 import BeautifulSoup

def get_mentioned_users(new_time_list, tweets):
    mentioned_users = {}
    for idx, t in enumerate(tweets):
        if 'mention' in t.keys():
            status_id = t['id']
            created_at = new_time_list[idx]
            user_id = t['mention']['id']
            mention = dict(at=created_at, id=status_id, text=t['text'])

            # add the general mentioned user list
            if user_id in mentioned_users.keys():
                loc = len(mentioned_users[user_id]['mentions'])
                for idx, obj in enumerate(mentioned_users[user_id]['mentions']):
                    if status_id > obj['id']:
                        loc = idx
                        break
                mentioned_users[user_id]['mentions'].insert(loc, mention)
            else:
                mentioned_users[user_id] = dict(
                    screen_name=t['mention']['screen_name'],
                    mentions=[mention]
                )
    minimized = {}
    for key, val in mentioned_users.items():
        m = val['mentions']
        minimized[key] = [list(map(lambda x:x['at'], m)), val['screen_name'], m[len(m) - 1]['text']]
    return minimized

def get_tweet_data_from_api(s):
    # created_at = time_converter.update_timezone(str(s['created_at']), location_info)
    source = str(BeautifulSoup(s['source'], 'html.parser'))
    media = 'none'
    is_retweet = False
    is_quote = False
    if 'media' in s['entities'].keys():
        media = list(map( lambda x: str(x['type']), s['extended_entities']['media']))
    if 'retweeted_status' in s.keys():
        is_retweet = True
    if 'quoted_status' in s.keys():
        is_quote = True

    # mention = {}

    # for v in s['entities']['user_mentions']:
    #     mentions.append(dict(id=v['id'], screen_name=v['screen_name']))
    # if mentions is []:
    #     if 'in_reply_to_user_id' in s.keys():
    #         mentions = [dict(id=s['in_reply_to_user_id'],
    #                          screen_name=s['in_reply_to_screen_name']
    #                          )]
    # mentions_to = mentions if mentions is not [] else []


    result = dict(created_at=str(s['created_at']),
                id=s['id'],
                source=source,
                text=s['text'],
                media=media,
                is_retweet=is_retweet,
                is_quote=is_quote,
                urls=len(s['entities']['urls']),
                lang=s['lang'],
                favorite_count=s['favorite_count']
                )
    if s['in_reply_to_user_id'] is not None:
        result['mention'] = dict(id=s['in_reply_to_user_id'],
                                 screen_name=s['in_reply_to_screen_name']
                                 )
    return result

def get_tweet_data(s):
    return dict(created_at= s['created_at'], id=s['id'])

def minimized_tweets(new_time_list, tweets):
    minimized = []
    for idx, t in enumerate(tweets):
        minimized.append(dict(
            id=new_time_list[idx], # 0
            to=t['mention']['screen_name'] if 'mention' in t.keys() else '', # 1
            # map(lambda x: x['screen_name'], t['mentions_to']), # 1
            media=t['media'],# 2
            urls=t['urls'], # 3
            rt=t['is_retweet'], # 4
            q=t['is_quote'],  # 5
            lang=t['lang'],  # 6
            fav=t['favorite_count'],  # 7
            app=t['source'] # 8
        ))
    return minimized