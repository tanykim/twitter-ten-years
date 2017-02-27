import json
import datetime

def write_json(file_name, data, isFinal):
    if isFinal is True:
        folder = '../webapp/src/data'
    else:
        folder = 'output'
    fd = open(folder + '/' + file_name + '.json', 'w', encoding='utf8')
    json_data = json.dumps(data, ensure_ascii=False)

    # json_data = json.dumps(data, separators=(',', ':'), indent=2, ensure_ascii=False)
    fd.write(json_data)
    fd.close()

def save_process(source):
    status=dict(generated_at=str(datetime.datetime.now()),
                last_status_id=source[0]['id'],
                tweet_count=len(source))

    # save dataset as JSON format
    midterm_data = dict(tweets_updated=source,
                      status=status)

    print ('--Saving updated JSON files')
    for k in midterm_data:
        write_json(k, midterm_data[k], False)