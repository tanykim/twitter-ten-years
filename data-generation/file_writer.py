import json

def write_json(file_name, data):
    fd = open('output/' + file_name + '.json', 'w', encoding='utf8')
    json_data = json.dumps(data, ensure_ascii=False)

    # json_data = json.dumps(data, separators=(',', ':'), indent=2, ensure_ascii=False)
    fd.write(json_data)
    fd.close()