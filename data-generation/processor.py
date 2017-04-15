from bs4 import BeautifulSoup
from datetime import datetime
from operator import itemgetter
import itertools
from collections import Counter
import math

def get_mentioned_users(new_time_list, tweets):
    mentioned_users = {}
    for idx, t in enumerate(tweets):
        if 'mention' in t.keys():
            status_id = t['id']
            created_at = new_time_list[idx]
            user_id = t['mention']['id']
            # text = t['text']
            mention = dict(at=created_at, id=status_id)

            # add the general mentioned user list
            if user_id in mentioned_users.keys():
                loc = len(mentioned_users[user_id]['mentions'])
                for idx, obj in enumerate(mentioned_users[user_id]['mentions']):
                    if int(status_id) > int(obj['id']):
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
        #do not add text m[len(m) - 1]['text']
        if val['screen_name'] != 'tanyofish':
            minimized[key] = [list(map(lambda x:x['at'], m)), val['screen_name']]
    return minimized

def get_friends_network(tweets, friends):
    pairs = []
    allNodes = []
    for idx, t in enumerate(tweets):
        if 'friends' in t.keys():
            for subset in itertools.combinations(t['friends'], 2):
                pair = sorted(list(subset))
                #check both are in friends list
                if pair[0] in friends.keys() and pair[1] in friends.keys() and pair[0] != pair[1]:
                    pairs.append('-'.join(pair))
                    allNodes.append(pair[0])
                    allNodes.append(pair[1])

    nodes = []
    for n in list(set(allNodes)):
        nodes.append(dict(id=n, name=friends[n][1]))

    links = []
    involvedFriends = {}
    for k, v in Counter(pairs).items():
        ids = k.split('-')
        #since source and target are mutated during d3 calculation, set strings (f1, f2) for class names
        result = dict(source=ids[0], target=ids[1], f1=ids[0], f2=ids[1], value=v)
        links.append(result)

        if ids[0] in involvedFriends.keys():
            involvedFriends[ids[0]].append([ids[1], v])
        else:
            involvedFriends[ids[0]] = [[ids[1], v]]

        if ids[1] in involvedFriends.keys():
            involvedFriends[ids[1]].append([ids[0], v])
        else:
            involvedFriends[ids[1]] = [[ids[0], v]]

    #update nodes with involved friend info
    for n in nodes:
        n.update({'linked': involvedFriends[n['id']]})

    return dict(nodes=nodes, links=links, involvedFriends=involvedFriends)

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
                id=s['id_str'],
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
        result['mention'] = dict(id=s['in_reply_to_user_id_str'],
                                 screen_name=s['in_reply_to_screen_name']
                                 )
    if 'user_mentions' in s['entities'].keys():
        if len(s['entities']['user_mentions']) > 1:
            result['friends'] = list(map( lambda x: x['id_str'], s['entities']['user_mentions']))
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
        if t['urls'] > 0 and t['is_retweet'] is False and t['is_quote'] is False and t['media'] == 'none':
            props.append('u')
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
        minimized.append([id, props])
    return minimized

def get_tweets_by_month(tweets):
    # months = []
    months = dict(all=[], m=[], r=[], q=[], p=[], v=[], u=[], k=[], e=[], b=[], s=[])
    for t in tweets:
        created_at = datetime.strptime(t[0], '%Y-%m-%d %H %w')
        month = datetime.strftime(created_at, '%Y-%m')
        months['all'].append(month)
        for prop in ['m', 'r', 'q', 'p', 'v', 'u', 'k', 'e', 'b', 's']:
            if prop in t[1]:
                months[prop].append(month)
    results = {}
    for prop in ['all', 'm', 'r', 'q', 'p', 'v', 'u', 'k', 'e', 'b', 's']:
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
            results['v'][k] if k in results['v'] else 0,
            results['u'][k] if k in results['u'] else 0
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

def get_flow_data(friends, network):
    mentions = []
    max_vals = []
    involvedFriends = network['involvedFriends']

    for id, d in friends.items():
        points = get_points_by_month(d[0])
        max_vals.append(max(map(lambda x: x[1], points)))

        #get the data of mentions that include other friends - total count, ratio, number of friends
        # sharedMentionCount = 0
        sharedFriendCount = 0
        if id in involvedFriends.keys():
            # sharedMentionCount = sum(map(lambda x: x[1], involvedFriends[id]))
            sharedFriendCount = len(involvedFriends[id])    
        mentions.append(dict(
            name=d[1],
            points=points,
            first=datetime.strftime(datetime.strptime(d[0][len(d[0]) - 1], '%Y-%m-%d %H %w'), '%b %e, %Y'),
            count=len(d[0]),
            duration=get_time_diff(d[0]),
            id=id,
            # commonFriends=dict(friendCount=sharedFriendCount, totalCount=sharedMentionCount),
            # common=math.ceil(sharedMentionCount / len(d[0]) * 1000) / 10
            common=sharedFriendCount
        ))

    count = list(map(lambda x: x['count'], mentions))
    duration = list(map(lambda x: x['duration'], mentions))
    common = list(map(lambda x: x['common'], mentions))

    friends_list = map(lambda x: dict(value=x['id'], label='@'+x['name'], count=x['count']), mentions)
    friends_sorted = sorted(friends_list, key=itemgetter('count'),reverse=True)

    # sort by count/duration first, then make list from only necessary elements
    r_count = list(map(lambda x: [x['id'], x['name'], x['count']], sorted(mentions, key=itemgetter('count'), reverse=True)))
    r_duration = list(map(lambda x: [x['id'], x['name'], x['duration']], sorted(mentions, key=itemgetter('duration'), reverse=True)))
    r_common = list(map(lambda x: [x['id'], x['name'], x['common']], sorted(mentions, key=itemgetter('common'), reverse=True)))

    return dict(
        mentions=mentions,
        max=max(max_vals),
        histogram=dict(count=count, duration=duration, common=common),
        friends=friends_sorted,
        ranking=dict(count=r_count, duration=r_duration, common=r_common),
        network=network
    )