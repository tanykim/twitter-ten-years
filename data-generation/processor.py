from bs4 import BeautifulSoup
from datetime import datetime
from collections import Counter
from operator import itemgetter

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

def get_tweet_data(s, isDirectAPI):

    #API status lookup and timeline returns different time format
    if isDirectAPI is True:
        created_at = str(s['created_at'])
    else:
        reformmated = datetime.strptime(s['created_at'], '%a %b %d %H:%M:%S %z %Y')
        created_at = datetime.strftime(reformmated, '%Y-%m-%d %H:%M:%S')

    if isDirectAPI is True:
        source = str(BeautifulSoup(s['source'], 'html.parser'))
    else:
        source = BeautifulSoup(s['source'], 'html.parser').a.text
    media = 'none'
    is_retweet = False
    is_quote = False
    is_reply = False
    if 'media' in s['entities'].keys():
        media = list(map( lambda x: str(x['type']), s['extended_entities']['media']))
    if 'retweeted_status' in s.keys():
        is_retweet = True
    if 'quoted_status' in s.keys():
        is_quote = True
    if 'in_reply_to_user_id' in s.keys() or s['text'][0] == '@':
        is_reply = True
    result = dict(created_at=created_at,
                id=s['id'],
                source=source,
                text=s['text'],
                media=media,
                is_retweet=is_retweet,
                is_quote=is_quote,
                is_reply=is_reply,
                urls=len(s['entities']['urls']),
                lang=s['lang'],
                favorite_count=s['favorite_count']
                )
    if s['in_reply_to_user_id'] is not None:
        result['mention'] = dict(id=s['in_reply_to_user_id'],
                                 screen_name=s['in_reply_to_screen_name']
                                 )
    return result

def minimized_tweets(new_time_list, tweets):
    minimized = []
    big_screen = ['Twitter Web Client', 'Twitter For Mac']
    small_screen = ['Mobile Web', 'Mobile Web (M2)', 'Twitter for Android', 'Twitter for Windows Phone', 'Twitter for iPhone', 'Windows Phone', 'iOS', 'rowi for Windows Phone']
    for idx, t in enumerate(tweets):
        id = new_time_list[idx] # 0
        props = []
        if 'mention' in t.keys():
            props.append('m')
        if t['is_retweet']:
            props.append('r')
        if t['is_quote']:
            props.append('q')
        if t['media'] is not 'none' and 'photo' in t['media']:
            props.append('p')
        if t['media'] is not 'none' and 'video' in t['media']:
            props.append('v')
        if t['favorite_count'] > 0:
            props.append('f')
        if t['lang'] == 'ko':
            props.append('k')
        if t['lang'] == 'en':
            props.append('e')
        if t['source'] in big_screen:
            props.append('b')
        if t['source'] in small_screen:
            props.append('s')
        # if t['urls'] > 0:
        #     props.append('u')
        # minimized.append(dict(
        #     id=new_time_list[idx], # 0
        #     to=t['mention']['screen_name'] if 'mention' in t.keys() else '', # 1
        #     # map(lambda x: x['screen_name'], t['mentions_to']), # 1
        #     media=t['media'],# 2
        #     urls=t['urls'], # 3
        #     rt=t['is_retweet'], # 4
        #     q=t['is_quote'],  # 5
        #     lang=t['lang'],  # 6
        #     fav=t['favorite_count'],  # 7
        #     app=t['source'] # 8
        # ))
        minimized.append([id, props])
    return minimized

def get_tweets_by_month(tweets):
    # months = []
    months = dict(all=[], m=[], r=[], q=[], p=[], v=[], k=[], e=[], b=[], s=[])
    for t in tweets:
        created_at = datetime.strptime(t[0], '%Y-%m-%d %H %w')
        month = datetime.strftime(created_at, '%Y-%m')
        months['all'].append(month)
        for prop in ['m', 'r', 'q', 'p', 'v', 'k', 'e', 'b', 's']:
            if prop in t[1]:
                months[prop].append(month)
    results = {}
    for prop in ['all', 'm', 'r', 'q', 'p', 'v', 'k', 'e', 'b', 's']:
        results[prop] = dict(list(Counter(months[prop]).items()))

    interaction = []
    media = []
    language = []
    source = []
    #make an array of numbers in order of types in each category
    for k, v in results['all'].items():
        interaction.append([k, [
            results['m'][k] if k in results['m'] else 0,
            results['q'][k] if k in results['q'] else 0,
            results['r'][k] if k in results['r'] else 0
        ]])
        media.append([k, [
            results['p'][k] if k in results['p'] else 0,
            results['v'][k] if k in results['v'] else 0
        ]])
        language.append([k, [
            results['k'][k] if k in results['k'] else 0,
            results['e'][k] if k in results['e'] else 0
        ]])
        source.append([k, [
            results['b'][k] if k in results['b'] else 0,
            results['s'][k] if k in results['s'] else 0
        ]])

    return dict(all=list(results['all'].items()), interaction=interaction, media=media, language=language, source=source)

def get_points_by_month(tweets):
    months = []
    for t in tweets:
        created_at = datetime.strptime(t, '%Y-%m-%d %H %w')
        month = datetime.strftime(created_at, '%Y-%m')
        months.append(month)
    return list(Counter(months).items())

def get_time_diff(tweets):
    latest = datetime.strptime(tweets[0], '%Y-%m-%d %H %w')
    oldest = datetime.strptime(tweets[len(tweets) - 1], '%Y-%m-%d %H %w')
    return (latest-oldest).days

def get_flow_data(friends):
    mentions = []
    max_vals = []
    for id, d in friends.items():
        points = get_points_by_month(d[0])
        max_vals.append(max(map(lambda x: x[1], points)))
        mentions.append(dict(
            name=d[1],
            points=points,
            first=d[0][len(d[0]) - 1],
            count=len(d[0]),
            duration=get_time_diff(d[0]),
            id=int(id)
        ))

    count = list(map(lambda x: x['count'], mentions))
    duration = list(map(lambda x: x['duration'], mentions))

    friends_list = map(lambda x: dict(value=x['id'], label='@'+x['name'], count=x['count']), mentions)
    friends_sorted = sorted(friends_list, key=itemgetter('count'),reverse=True)

    # sort by count/duration first, then make list from only necessary elements
    r_count = list(map(lambda x: [x['id'], x['name'], x['count']], sorted(mentions, key=itemgetter('count'), reverse=True)))
    r_duration = list(map(lambda x: [x['id'], x['name'], x['duration']], sorted(mentions, key=itemgetter('duration'), reverse=True)))

    return dict(
        mentions=mentions,
        max=max(max_vals),
        histogram=dict(count=count, duration=duration),
        friends=friends_sorted,
        ranking=dict(count=r_count, duration=r_duration)
    )