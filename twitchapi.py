import requests
import json

client_ID = "redacted"
authorization = "Bearer redacted"
headers = {
    "client-ID" : client_ID,
    "Authorization" : authorization
}

def is_live(streamer):
    API_ENDPOINT = f"https://api.twitch.tv/helix/search/channels?query={streamer}"

    r = requests.get(url = API_ENDPOINT, headers = headers)

    return json.loads(r.text)["data"][0]["is_live"]
