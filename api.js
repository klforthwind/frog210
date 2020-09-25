const Discord = require('discord.js') 
const got = require('got')

const client_id = 'redacted'
const authorization = 'Bearer redacted'
const path = 'https://api.twitch.tv/helix/search/channels?query='

const options = {
    headers: {
        'Content-Type': 'application/json',
        'Client-ID': client_id,
        'Authorization': authorization,
    },
    gzip: true
}

let live = []

exports.notif_if_live = (streamer, channel, arrNum) => {
    got(path + streamer, options).then(resp => {
        let data = JSON.parse(resp.body)
        let streamer_data = data['data'][0]
        if (streamer_data["is_live"]) {
            if (live.indexOf(streamer) === -1) {
                live.push(streamer)
                const embed = {
                    title: `${streamer} is now live on Twitch!`,
                    description: streamer_data["title"],
                    url: `https://twitch.tv/${streamer}`,
                    image: {
                        url: streamer_data["thumbnail_url"],
                    },
                }
                if (arrNum === 0) {
                    channel.send({embed:embed})
                } else {
                    channel.send({embed:embed})
                }
            }
        } else if (live.indexOf(streamer) != -1) {
            live.pop(live.indexOf(streamer))
        }
        
    });
}
