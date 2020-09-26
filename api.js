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
        let index = live.indexOf(streamer)
        if (streamer_data["is_live"]) {
            if (index === -1) {
                live.push([streamer, 0])
                const embed = {
                    title: `${streamer} is now live on Twitch!`,
                    description: streamer_data["title"],
                    url: `https://twitch.tv/${streamer}`,
                    image: {
                        url: streamer_data["thumbnail_url"],
                    },
                }
                console.log(live)
                if (arrNum === 0) {
                    channel.send({embed:embed})
                } else {
                    channel.send({embed:embed})
                }
            }
        } else if (index !== -1) {
            if (live[index][1] > 4) {
                live.pop(index)
            } else {
                live[index][1]+=1
            }
        }
        
    });
}
