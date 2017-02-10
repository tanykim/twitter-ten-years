# from bs4 import BeautifulSoup
# import datetime
import js_reader

def getTimeline(api, max_id):
    return api.user_timeline(count=20, trim_user=1, max_id=max_id)

tweets = []
def callAPI(api, since_id, max_id):
    statuses = getTimeline(api, max_id)
    print (len(statuses), max_id)
    for obj in statuses:
        s = obj.__dict__
        max_id = s['id']
        if max_id > since_id:
            tweet = js_reader.getTweetData(s)
            tweets.append(tweet)

    if max_id is not None and max_id < since_id:
        print ('---------done')
        return
    else:
        callAPI(api, since_id, max_id)

def main(api, since_id):
    callAPI(api, since_id, None)
    return tweets

if __name__ == '__main__':
  main()