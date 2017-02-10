import os
from bs4 import BeautifulSoup
import json
import itertools
import datetime

mentioned_users = {}

def getMentionedUser(users, status_id, created_at):
    for u in users:
        user_id = u['id']
        mention = dict(at=created_at, id=status_id)

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
                screen_name=u['screen_name'],
                mentions=[mention]
            )


def getTweetData(s):
    created_at = s['created_at']
    id = s['id']

    mentions = []
    for v in s['entities']['user_mentions']:
        mentions.append(dict(id=v['id'], screen_name=v['screen_name']))

    if mentions is []:
        if 'in_reply_to_user_id' in s.keys():
            mentions = [dict(id=s['in_reply_to_user_id'],
                             screen_name=s['in_reply_to_screen_name']
                             )]
    mentions_to = mentions if mentions is not [] else []

    tweet = dict(created_at=created_at,
                 id=id,
                 source=str(BeautifulSoup(s['source'], 'html.parser')),
                 text=s['text'],
                 mentions_to=mentions_to,
                 media = len(s['entities']['media']) if 'media' in s['entities'].keys() else 0,
                 urls = len(s['entities']['urls'])
                 )
    return tweet

def loadFile(path):
    print (path)
    with open(path, 'r', encoding='utf-8') as file:
        tweets_month = []
        lines = file.read().splitlines(True)[1:]
        one_line = '\t'.join([line.strip() for line in lines])
        statuses = json.loads(one_line)
        for s in statuses:
            tweet = getTweetData(s)
            getMentionedUser(tweet['mentions_to'], tweet['id'], tweet['created_at'])
            tweets_month.append(tweet)
        return tweets_month


def main():

    DIRECTORY = 'tweets'

    # make array of all tweets
    tweets = []

    # read all js files first
    for filename in os.listdir(DIRECTORY):
        if filename.endswith('js'):
            tweets_month = loadFile(os.path.join(DIRECTORY, filename))
            tweets.insert(0, tweets_month)

    # save dataset as JSON format
    status=dict(generated_at=str(datetime.datetime.now()), last_status_id=tweets[0][0]['id'])

    final_data = dict(tweets=list(itertools.chain(*tweets)),
                      mentioned_users=mentioned_users,
                      status=status
                      )
    print (final_data)

    for k in final_data:
        fd = open('output/' + k + '.json', 'w', encoding='utf8')
        json_data = json.dumps(final_data[k], separators=(',', ':'), indent=2, ensure_ascii=False)
        fd.write(json_data)
        fd.close()

if __name__ == '__main__':
    main()