from datetime import datetime
import pytz
import json

def load_list():
    with open('locations.json', encoding='utf-8') as file:
        return json.loads(file.read())

def update_timezone(d, location_info, current_loc_id):
    utc = pytz.timezone('UTC')
    utc_date = datetime.strptime(d + ' +0000', '%Y-%m-%d %H:%M:%S %z').astimezone(utc)

    for idx, loc in enumerate(location_info[current_loc_id:]):
        start_date = datetime.strptime(loc['start_date'], '%Y-%m-%d').astimezone(utc)

        # if start_date is older than utc_date
        if utc_date > start_date:
            current_loc_id = idx + current_loc_id
            break
    tz = pytz.timezone(location_info[current_loc_id]['timezone'])
    tzed = utc_date.astimezone(tz)
    tz_date = datetime.strftime(tzed, '%Y-%m-%d %H:%M:%S %z')

    # tz_date = datetime.strftime(tzed, '%Y-%m-%d %H:%M:%S %z')
    # print (utc_date, tz_date, current_loc_id)
    return dict(date=tz_date, id=current_loc_id)

def main(tweets):
    location_info = load_list()
    current_loc_id = 0
    new_time_list = []
    for t in tweets:
        result = update_timezone(t['created_at'], location_info, current_loc_id)
        new_time_list.append(result['date'])
        current_loc_id = result['id']
    return new_time_list