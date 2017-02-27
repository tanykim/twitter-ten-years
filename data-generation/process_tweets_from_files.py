import os
import json
import glob
import re
import itertools
import processor
import file_writer

def load_file(path):
    with open(path, 'r', encoding='utf-8') as file:
        print (path)
        tweets_bunch = []
        statuses = json.loads(file.read())
        for s in statuses:
            tweet = processor.get_tweet_data(s, False)
            tweets_bunch.append(tweet)

        return tweets_bunch

# read files in numerical order
numbers = re.compile(r'(\d+)')
def numericalSort(value):
    parts = numbers.split(value)
    parts[1::2] = map(int, parts[1::2])
    return parts

def main():

    DIRECTORY = 'output/from_api'

    # make array of all tweets
    tweets = []

    for filename in sorted(glob.glob(DIRECTORY + '/*.json'), key=numericalSort):
        tweets_bunch = load_file(os.path.join(filename))
        tweets.append(tweets_bunch)
        # tweets.insert(0, tweets_bunch)

    final_tweets = list(itertools.chain(*tweets))
    print ('total', len(final_tweets), 'tweets')

    file_writer.save_process(final_tweets)