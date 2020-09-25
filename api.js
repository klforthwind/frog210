const got = require('got')

const client_id = 'redacted'
const authorization = 'Bearer redacted'
const path = 'https://api.twitch.tv/helix/users?login='

let getStreamInfo = (username) => {

    got(
        path+username,
        {
            headers: {
                'Content-Type': 'application/json',
                'Client-ID': client_id,
                'Authorization': authorization,
            },
            gzip: true
        }
    )
    .then(resp => {
        return JSON.parse(resp.body);
    });
}

exports.is_live = (username) => {
    let data = getStreamInfo(username)
    console.log(data)
    if (data) {
        // let json = JSON.parse(data)
        // console.log(json)
        // return json["data"][0]["is_live"]
    } else {
        return false;
    }
}