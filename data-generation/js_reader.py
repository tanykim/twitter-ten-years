import os
import json
import itertools
import processor

def load_file(path):
    with open(path, 'r', encoding='utf-8') as file:
        print (path)
        tweets_month = []
        lines = file.read().splitlines(True)[1:]
        one_line = '\t'.join([line.strip() for line in lines])
        statuses = json.loads(one_line)
        for s in statuses:
            tweet = processor.get_tweet_data(s)
            tweets_month.append(tweet)

        return tweets_month

def main():

    DIRECTORY = 'tweets'

    # make array of all tweets
    tweets = []

    # read all js files first
    for filename in os.listdir(DIRECTORY):
        if filename.endswith('js'):
            tweets_month = load_file(os.path.join(DIRECTORY, filename))
            tweets.insert(0, tweets_month)

    print (len(list(itertools.chain(*tweets))))

    return list(itertools.chain(*tweets))
